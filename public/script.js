const dogArr = [
  "./../images/dog-normal.gif",
  "./../images/dog-sleep.gif",
  "./../images/dog-fed.gif"
];
const catArr = [
  "./../images/cat-normal.gif",
  "./../images/cat-sleep.gif",
  "./../images/cat-fed.gif"
];
const birdArr = [
  "./../images/bird-normal.gif",
  "./../images/bird-sleep.gif",
  "./../images/bird-fed.gif"
];

$(document).ready(() => {
  //alert(Date.now();
  const charButton = $("#character-button");
  const sleepButton = $("#sleep-button");
  const cleanButton = $("#clean-button");
  const feedButton = $("#feed-button");
  const hungerLevel = $("#hunger-level");
  let petId;
  let petLastFed;

  function secondCounter(time, petName) {
    var newTime = parseInt(time);
    function displayNum() {
      newTime += 0.008;
      hungerLevel.text(
        `${newTime.toFixed(
          1
        )} minutes have passed since ${petName} was last fed`
      );
    }
    setInterval(displayNum, 500);
  }

  //ajax call to get timestamp from database
  $.ajax({ url: "/my-pet/api", method: "GET" })
    .then(pets => {
      console.log(pets);
      console.log(pets)
      let chosenPet;
      console.log(window.location.href.split('/'))
      var nameArr = window.location.href.split('/');
      var petName = nameArr[4]
      pets.forEach(({name, petType, id, lastFed}) => {
        if(name === petName){
          chosenPet = petType;
          petId = id;
          petLastFed = lastFed;
          console.log(chosenPet,petId,petLastFed)
        }
      })
      
      switch (chosenPet) {
        case "dog":
          chosenPet = dogArr;
          break;
        case "cat":
          chosenPet = catArr;
          break;
        case "bird":
          chosenPet = birdArr;
      }

      console.log(chosenPet);

      charButton.attr("src", chosenPet[0]);
      // Pet is asynchronously acquired
      // Put click functions within ajax call since pet is set asynchrously
      //
      feedButton.click(function() {
        charButton.attr("src", chosenPet[2]);

        $.ajax({
          url: "/my-pet/api",
          method: "PATCH",
          data: { id: petId },
          success: data => location.reload()
        }).then(data => location.reload());
      });
      //
      sleepButton.click(function() {
        if ($(this).text() === "Sleep") {
          event.preventDefault();
          charButton.attr("src", chosenPet[1]);
          $(this).text("Wake Up");
        } else {
          charButton.attr("src", chosenPet[0]);
          $(this).text("Sleep");
        }
      });
      //
      var elapsedTime = (Date.now() - parseFloat(petLastFed)) / 1000 / 60;
      console.log(
        `${elapsedTime} minutes have passed since ${petName} was last fed`
      );
      hungerLevel.html(
        `${elapsedTime.toFixed(2)} minutes have passed since ${
          petName
        } was last fed`
      );
      secondCounter(elapsedTime.toFixed(2), petName);
    })
    .catch(err => console.log(err));
});
