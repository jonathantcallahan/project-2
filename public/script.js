$(document).ready(() => {
    //alert(Date.now())


    var dogArr = ['./images/dog-normal.gif','./images/dog-sleep.gif','./images/dog-eat.gif'];
    var catArr = ['./images/cat-normal.gif','./image/cat-sleep.gif','/images/cat-eat.gif'];
    var birdArr = [];
    let chosenPet;


    var urlArr = window.location.href.split('/');
    var urlName = urlArr[urlArr.length - 1]

    function secondCounter(time){
        var newTime = parseInt(time);
        function displayNum(){
            newTime += .008
            $('#hunger-level').text(`${newTime.toFixed(1)} minutes have passed since ${urlName} was last fed`)
        };
        setInterval(displayNum, 500)
    }

    //ajax call to get timestamp from database
    $.ajax({
        url: `http://localhost:8080/my-pet/api/${urlName}`,
        method: 'GET'
    }).then(data => {
        
        console.log(data)

        switch(data[0].petType){
            case('dog'):
                chosenPet = dogArr;
                break;
            case('cat'):
                chosenPet = catArr;
                break;
            case('bird'):
                chosenPet = birdArr;
        }

        console.log(chosenPet)


        var elapsedTime = ((Date.now() - parseFloat(data[0].lastFed))/1000)/60
        console.log(`${elapsedTime} minutes have pased since ${urlName} was last fed`)
        $('#hunger-level').text(`${elapsedTime.toFixed(2)} minutes have passed since ${urlName} was last fed`)
        secondCounter(elapsedTime.toFixed(2))
    }).catch((err)=>console.log(err))


    $("#character-button").click(function(){
        // alert('fed cat')
        // console.log('test')
        $.ajax({
            url: 'http://localhost:8080/my-pet',
            method: 'POST',
            data: 
            {
                name: urlName,
                time: Date.now(),
            },
            success: (data) => {
                console.log(data);
                location.reload();
            }
        }).then(data => {
            console.log(data);
            location.reload(true);
        }).catch(err => console.log(err))

        // $.post('/my-pet', {
        //     lastFed: Date.now()       
        // })
        // .then(data => {
        //     console.log(data);
        //     location.reload();
        // })
        // .catch(err => console.log(err))
    })

})
