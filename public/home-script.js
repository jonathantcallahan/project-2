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
    $.get('/home/api', data => {
        console.log(data)
        for(var i = 0; i<data.length; i++){
            const d = $('<div>')
            const b = $('<button>').attr('id', 'delete-button').attr('data-id', data[i].id).html('Delete')
            const a = $('<a>').attr('data-id',data[i].id).attr('href',`/pet/${data[i].name}`).text(data[i].name)
            a.append(b)
            d.append(a)
            $('#list').append(d)
        }
      //  $('#delete-button')
    })


})