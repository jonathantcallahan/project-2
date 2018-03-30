$(document).ready(() => {
  $("select").formSelect();

  var User = {};

  $.get("/api/user/data").then(data => {
    console.log(data);
    User.id = data.id;
    User.name = data.name;
  });

  $("#submit-pet").click(function() {
    var name = $("#pet-name")
      .val()
      .trim();
    var petType = $("#pet-type").val();

    $.post("/my-pet/api", {
      name: name,
      petType: petType,
      UserId: User.id
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
        .attr("data-id", id)
        .attr("href", `/pet/${name}`)
        .text(name);
      d.append(a, b);
      $("#list").append(d);
    });

    $(".delete-button").click(function() {
      event.preventDefault();
      var petId = $(this).data("id");
      console.log(petId);
      $.ajax({url: `/home/api/${petId}`, method: "DELETE",
        success: () => {
          location.reload();
        }
      });
    });
  });
});
