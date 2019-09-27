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
      .format("MM/DD/YYYY hh:mm A"),
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

  database.ref("trains/").on("value", snapshot => {
    let trains = snapshot.val();
    for (let train in trains) {
      let tr = $("<tr>");
      tr.append($("<td>").text(train));
      tr.append($("<td>").text(trains[train].destination));
      tr.append($("<td>").text(trains[train].frequency));
      tr.append($("<td>").text(nextArival(trains[train])));
      tr.append($("<td>").text(minutesAway(nextArival(trains[train]))));
      $("tbody").append(tr);
    }
  });
}

function nextArival(train) {
  let startTime = moment(train.startTime, "MM/DD/YYYY hh:mm A");
  let duration = moment.duration(parseInt(train.frequency), "minutes");

  while (startTime.isBefore(moment())) {
    startTime.add(duration);
  }

  return startTime.format("MM/DD/YYYY hh:mm A");
}

function minutesAway(nextArival) {
  let arival = moment(nextArival, "MM/DD/YYYY hh:mm A");
  let arivalMinutes = arival.minute();
  let arivalHours = arival.hours();
  let nowMinutes = moment().minute();
  let nowHours = moment().hour();

  let minutesAway = (arivalHours - nowHours) * 60 + arivalMinutes - nowMinutes;

  return minutesAway;
}

updateTable();
