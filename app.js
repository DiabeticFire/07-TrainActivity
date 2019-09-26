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

  let today = moment();
  "string".split(":");

  let name = $("#name")
    .val()
    .trim();
  let destination = $("#destination")
    .val()
    .trim();
  let startTime = $("#startTime")
    .val()
    .trim();
  let hour = startTime.split(":")[0];
  let minute = startTime.split(":")[1];
  let frequency = $("#frequency")
    .val()
    .trim();

  addTrain(
    name,
    destination,
    moment(today)
      .hour(hour)
      .minute(minute)
      .format("MM/DD/YYYY HH:mm"),
    frequency
  );

  $("#name").val("");
  $("#destination").val("");
  $("#startTime").val("");
  $("#frequency").val("");

  updateTable();
});

function updateTable() {
  $("tbody").empty();

  database.ref("trains/").on("value", (snapshot) => {
    let trains = snapshot.val();
    for (let train in trains) {
      let tr = $("<tr>");
      tr.append($("<td>").text(train));
      tr.append($("<td>").text(trains[train].destination));
      tr.append($("<td>").text(trains[train].frequency));
      // next arrival
      // minutes away
      $("tbody").append(tr);
    }
  });
}

updateTable();
