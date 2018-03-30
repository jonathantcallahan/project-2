$(document).ready(() => {
 //alert(Date.now())

 var dogArr = [
   "./../images/dog-normal.gif",
   "./../images/dog-sleep.gif",
   "./../images/dog-fed.gif"
 ];
 var catArr = [
   "./../images/cat-normal.gif",
   "./../images/cat-sleep.gif",
   "./../images/cat-fed.gif"
 ];
 var birdArr = [
   "./../images/bird-normal.gif",
   "./../images/bird-sleep.gif",
   "./../images/bird-fed.gif"
 ];
 let chosenPet;

 var urlArr = window.location.href.split("/");
 var urlName = urlArr[urlArr.length - 1];

 function secondCounter(time, petName) {
   var newTime = parseInt(time);
   function displayNum() {
     newTime += 0.008;
     $("#hunger-level").text(
       `${newTime.toFixed(
         1
       )} minutes have passed since ${petName} was last fed`
     );
   }
   setInterval(displayNum, 500);
 }

 //ajax call to get timestamp from database
 $.ajax({url: "/my-pet/api",
   method: "GET"
 })
   .then(data => {
     console.log(data);

     switch (data[0].petType) {
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

     $("#character-button").attr("src", chosenPet[0]);

     var elapsedTime = (Date.now() - parseFloat(data[0].lastFed)) / 1000 / 60;
     console.log(
       `${elapsedTime} minutes have passed since ${data[0].name} was last fed`
     );
     $("#hunger-level").text(
       `${elapsedTime.toFixed(2)} minutes have passed since ${
         data[0].name
       } was last fed`
     );
     secondCounter(elapsedTime.toFixed(2), data[0].name);
   })
   .catch(err => console.log(err));

 $("#character-button").click(function() {
   alert("fed cat");
   // console.log('test')
   $("#character-button").attr("src", chosenPet[2]);

   $.ajax({
     url: "/my-pet",
     method: "POST",
     data: {
       name: urlName,
       time: Date.now()
     },
     success: data => {
       console.log(data);
       location.reload();
     }
   }).then(data => {
     console.log(data);
     location.reload();
   });
 });

 $("#sleep-button").click(function() {
   if ($(this).text() === "Sleep") {
     event.preventDefault();
     $("#character-button").attr("src", chosenPet[1]);
     $(this).text("Wake Up");
   } else {
     $("#character-button").attr("src", chosenPet[0]);
     $(this).text("Sleep");
   }
 });
});
