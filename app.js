const database = firebase.database();

function addTrain(name, destination, startTime, frequency) {
  database.ref("trains/" + name).set({
    destination: destination,
    startTime: startTime,
    frequency: frequency
  });
}

$("#submit").click(function(e) {
  e.preventDefault();

  let name = $("#name")
    .val()
    .trim();
  let destination = $("#destination")
    .val()
    .trim();
  let startTime = $("#startTime")
    .val()
    .trim();
  let frequency = $("#frequency")
    .val()
    .trim();

  addTrain(name, destination, startTime, frequency);

  $("#name").val("");
  $("#destination").val("");
  $("#startTime").val("");
  $("#frequency").val("");
});
