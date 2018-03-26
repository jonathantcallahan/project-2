$(document).ready(() => {
    //alert(Date.now())

    //ajax call to get timestamp from database
    $.ajax({
        url: 'http://localhost:8080/my-pet/api',
        method: 'GET'
    }).then(data => {
        console.log(data)
        var elapsedTime = ((Date.now() - parseFloat(data[0].lastFed))/1000)/60
        console.log(`${elapsedTime} minutes have pased since last fed`)
        $('#hunger-level').text(`${elapsedTime} minutes have passed since last feeding`)
    }).catch((err)=>console.log(err))


    $("#character-button").click(function(){
        // alert('fed cat')
        // console.log('test')
        $.ajax({
            url: 'http://localhost:8080/my-pet',
            method: 'POST',
            data: 
            {
                id: '1',
                time: Date.now(),
            },
            success: (data) => {
                console.log(data);
                location.reload();
            }
        }).then(data => {
            console.log(data);
            window.location.reload(true);
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