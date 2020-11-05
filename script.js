  // steps for how the app should work
      // 1. when the user enters the website, different tables should appear each with a different time
      // 2. the rows should have different colors based on what time it is
      // 3. inside each of the rows the user can input information about their to dos
      // 4. then the user can click a button to save their information
      $(document).ready(function() {
        var date = moment();
          // this var will be used later to check the time
        var currentHour= date.get('hour');
        // empty array named schedule will be used to store the the todos
        var schedule=[];
        $("#currentDay").text(date.format('dddd, MMMM Do YYYY'));
        var workDay=["9AM","10AM","11AM","12AM","1PM","2PM","3PM","4PM","5PM"];
        function createSchedule () {
          for (i=0;i<workDay.length;i++) {
            // these next set of variables will be used to create the different html elements we will need for the scheduler
            var newDiv=$("<div>");
            var newP=$("<p>");
            var newText=$("<input>");
            var newButton=$("<button>");
            var dayHours=date.set('hour', i);
            // console.log(dayHours)
            var dayHoursFormat= dayHours.format('hA')
            var iEl=$("<i>")
            newDiv.attr("data-index", i)
            // the following lines of codes will add classes to the HTML elements
            newDiv.addClass("row timeblock;");
            newP.addClass("hour col-md-2");
            newText.addClass("col-md-8 inputs");
            newButton.addClass("saveBtn i col-md-2");
            iEl.addClass("fas fa-save");
            // the following lines of code will ad id to each of the HTML elements
            newP.attr("id", i);
            newText.attr("id", i);
            newButton.attr("id", i);
            // the next line of code will add a text to the new p element
            newP.text(workDay[i]);
            // the next line will append the new div to the div with a container class
            $(".container").append(newDiv)
            // the next line will append the all the new different html elements to the newly created div tag
            newDiv.append(newP,newText,newButton);
            newButton.append(iEl);

            // the next line of code will save the value of the input inside the local storage when a button is pressed
            $(newButton).on("click", function() {
              var parentOfButton=$(this).parent(); //this will look for the parent element of the button pressed
              var siblingOfButton=$(this).siblings("input") // this will tell the function to look for the button siblings named that are an input HTML element
              localStorage.setItem(parentOfButton.attr('data-index'), siblingOfButton.val()); // then add to local storage a key named data index which is equal to the value  of i from the loop and for each key give it a value of the input
              schedule= siblingOfButton.val();
            })

            // this line is used to transform the currentHour variable into an integer
            var currentHourParse=parseInt(currentHour, 10);

            // the next lines of code will retrieve the stored values of the input from the local storage
            function renderStoredInputs(){
              $(".inputs").each(function(){ //for each input execute this function
              var inputId = $(this).attr("id"); // for each class named inputs select an attribute named id
              $(this).val(localStorage.getItem(inputId)); // retrieve from local storage the an intem named inputId and give that value to all classes with input on it
            });
            };
            renderStoredInputs();
            
            // this next function will change the color of the input depending on the time
            $(".inputs").each(function() {
              var inputID=$(this).attr("id"); // calls for the class input id
              var inputIDParse=parseInt(inputID,10); // changes the id to integers
              var inputIDSum=inputIDParse + 9; // to the newly created integers we add +9
              if (inputIDSum==currentHourParse) {
                $(this).addClass('present');
              } else if (inputIDSum>currentHourParse) {
                $(this).addClass('future');
              } else {
                $(this).addClass('past');
              }
            })
          }
        }
        createSchedule();      
  });