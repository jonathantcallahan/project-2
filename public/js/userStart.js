$(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user/data").then(data => {
    $("#member-name").text("???");
    if (data.name) {
      $("#member-name").text(data.name);
    }
  });
});
