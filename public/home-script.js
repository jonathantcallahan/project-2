$(document).ready(() => {

    $('#submit-pet').click(function(){
        var name = $('#pet-name').val().trim();
        var petType = $('#pet-type').val()
        $.post('/my-pet/api', {
            name: name,
            petType: petType
        })
        console.log('button clicked')
        location.reload()
    })
})