$(document).ready(() => {
  $("select").formSelect();

  $.get('/api/user/data', user => {
    console.log(user)
  })

  $("#submit-pet").click(function() {
    var name = $("#pet-name")
      .val()
      .trim();
    var petType = $("#pet-type").val();

    $.post("/my-pet/api", {
      name: name,
      petType: petType
    }).then(() => {
      console.log("button clicked");
      location.reload();
    });
  });

  $.get("/my-pet/api", pets => {

    pets.forEach(({ id, name }) => {
      const d = $("<div>");
      const b = $("<button>")
        .attr("class", "delete-button")
        .attr("data-id", id)
        .html("Delete");
      const a = $("<a>")
        .attr("href", "#")
        .text(name);
      d.append(a, b);
      $("#list").append(d);
    });

    $(".delete-button").click(function() {
      event.preventDefault();
      const id = $(this).data("id");
      console.log(id);
      $.ajax({url: "/my-pet/api", method: "DELETE",data: {id},
        success: () => {
          location.reload();
        }
      });
    });
  });
});
