$(document).ready();
var config = {
    apiKey: "AIzaSyASsWU51wLPcjla9EWBCpFX8iBaXKYq2ZE",
    authDomain: "ez-trainscheduler.firebaseapp.com",
    databaseURL: "https://ez-trainscheduler.firebaseio.com",
    projectId: "ez-trainscheduler",
    storageBucket: "ez-trainscheduler.appspot.com",
    messagingSenderId: "428379623569"
  };
firebase.initializeApp(config);
var database = firebase.database()
var name = ""
var destination = ""
var start = ""
var frequency = ""
var next = ""
var minutes = ""
var currentTime = moment();





$("#submit").on("click",function(){
    event.preventDefault();
    name = $("#tName").val().trim();
    destination = $("#tDest").val().trim();
    start = moment($("#tStart").val().trim(),"hh:mm").format("X");
    frequency = $("#tFreq").val().trim();
        database.ref().push({
            name: name,
            destination: destination,
            start: start,
            frequency: frequency,
           dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    
    $("#tName").val("");
    $("#tDest").val("");
    $("#tStart").val("");
    $("#tFreq").val("");
});
database.ref().on("child_added",function(childSnapshot){
   console.log(childSnapshot.val());
   name = childSnapshot.val().name;
   destination = childSnapshot.val().destination;
   start = childSnapshot.val().start;
   frequency = childSnapshot.val().frequency;
   var timeDiff = moment().diff(moment(start,"X"),"minutes");
   var tRemain = timeDiff % frequency;
   var minTill = frequency - tRemain;
   next = currentTime.add(minTill, "minutes");
   var addRow = $("<tr>").append(
       $("<td>").text(name),
       $("<td>").text(destination),
       $("<td>").text(frequency),
       $("<td>").text(next),
       $("<td>").text(minTill),
   );
   $(".tTable > tbody").append(addRow);
           
})

