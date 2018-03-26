$(document).ready(function() {

 
//Displaying the weather condition as background image when the page is loaded.
function weather(){

    var Geo ={};

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error);
    }else{
      alert("Geolocation is not supported");
    }

    function error(){
      alert("Geolocation is not supported by this browser.")
    }

    //If the user's browser is compatible to detect the location, then this function works.Otherwise, it will give the error above.

    function success(position){

      Geo.lat = position.coords.latitude;
      Geo.lon = position.coords.longitude;

      var appID = "&appid=96d9998aea65bf4a2c82d20b6f51afde";
      var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + Geo.lat + "&lon=" + Geo.lon + "&appid=96d9998aea65bf4a2c82d20b6f51afde";

      $.ajax({
          url:weatherUrl,
          method:"GET"
        }).done(function(response){
          
          console.log(response);
      
          var weatherIcon = response.weather[0].icon;
          var imagePath = "../public/css/images/"+ weatherIcon + ".jpg";

          console.log(imagePath);
        
          $('body').css('background-image','url('+ imagePath +')');
          
        });
    }
}

weather();

  // Materialize requires initialize the select element. ou will need a separate call for any dynamically generated select elements your page generates.
  //See documentation for that.
    $(document).ready(function(){
      $("select").formSelect();

        $("#submit-button").click(function(event){
          event.preventDefault();
          var characterName = $("#tamagotchi-name").val().trim();
          var selectCharater = $("#select-dropdown").val();



        });
    });

    
    

});
