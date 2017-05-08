/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAPt3jqL6bGqF3DZZfrEYUnbU_m1dLwt2U",
  authDomain: "train-homework-8d859.firebaseio.com/",
  databaseURL: "https://train-homework-8d859.firebaseio.com/",
  storageBucket: "train-homework-8d859.appspot.com",
  messagingSenderId: 981534801477
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainNameInput").val().trim();
  var trainDestination = $("#destinationInput").val().trim();
  var trainFrequency = $("#frequencyInput").val().trim();
  var firstTrain = $("#firstInput").val().trim();

  // Creates local "temporary" object for holding employee data. This will be pushed into our firebase. 
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    firstTrain: firstTrain

  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newEmp.name);
//   console.log(newEmp.role);
//   console.log(newEmp.start);
//   console.log(newEmp.rate);

  // Alert
  alert("Train successfully added");

});

// Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#first-input").val("");


// 3. Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newName = childSnapshot.val().name;
  var newDestination = childSnapshot.val().destination;
  var newFrequency = childSnapshot.val().frequency;
  var newTrain = childSnapshot.val().firstTrain;

  // Train Info
  console.log(newName);
  console.log(newDestination);
  console.log(newFrequency);
  console.log(newTrain);

  
 
  
  //when is the first train coming?
  var startTimeConverted = moment(newTrain, "hh:mm").subtract(1, "years");
//Time now
 var currentTime = moment();

//Difference between when first train arrives and the current time
var timeDiff = moment().diff(moment(startTimeConverted), "minutes");

//Remainder of time and frequency
var remainingTime = timeDiff % newFrequency;

//Minutes until the train choo choo!
var minutesTillTrain = newFrequency - remainingTime;

// New variables created for table
var minutesAway = moment().add(minutesTillTrain, "minutes");
var nextArrival = moment(minutesAway).format("HH:mm");


  // Add each train's data into the table
  $("#trainTable").append(
      "<tr><td>" + newName + 
      "</td><td>" + newDestination + 
      "</td><td>" + newFrequency + 
      "</td><td>" + nextArrival + 
      "</td><td>" + minutesAway + 
      "</td></tr>");
});


