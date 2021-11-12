var tasks = {};
var currentDay = document.querySelector("#currentDay");


var createTask = function(taskTime, taskName) {
  // create elements that make up a task item
  var taskDiv = $("<div>").addClass("time bg-secondary text-white border border-dark mb-1 d-flex flex-row");
  var taskP = $("<p>")
    .text(taskName);
  var button = $("<button>")
    .addClass("btn btn-primary btn-lg border-left border-dark")
  var span = $("<span>")
    .addClass("oi oi-task")
  // append span and p element to parent li
  taskDiv.append(taskP);
  button.append(span)
  taskDiv.append(button)
  // append to ul list on the page
  

  $("#" + taskTime).append(taskDiv);

  auditTask(taskDiv);
};

var saveTasks = function() {
  localStorage.setItem("tasksT", JSON.stringify(tasks));
};

var loadTasks = function() {
  currentDay.textContent = moment().format('MMMM Do YYYY');
  tasks = JSON.parse(localStorage.getItem("tasksT"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = {
      "9":"&#8205;",
      "10":"",
      "11":"",
      "12":"",
      "13":"",
      "14":"",
      "15":"",
      "16":"",
      "17":"",
    };
    localStorage.setItem("tasksT", JSON.stringify(tasks));
  }

  for (var i= 9; i < 18; i++) {
    var time = i.toString();
    var taskName = tasks[time];
    createTask(time, taskName)
  }
};

var auditTask = function(taskEl) {

  console.log(taskEl)

  var taskTime = $(taskEl)
    .parent()
    .attr("id")
  var time= moment(taskTime+":59:59", "HH:mm:ss");

  $(taskEl).removeClass("list-group-item-warning list-group-item-danger bg-primary bg-success");


  if (moment().isAfter(time,"hours")) {
    $(taskEl).addClass("bg-secondary");
  } else if (Math.abs(moment().diff(time, "hours"))  == 0) {
    $(taskEl).addClass("bg-danger");
  } else {
    $(taskEl).addClass("bg-success");
  }
};

loadTasks();

$(".time").on("click", "p", function() {
  console.log("entro")
  var text = $(this).text().trim();
  
  var textInput = $("<textarea>").addClass("form-control").val(text);

  $(this).replaceWith(textInput);

  textInput.trigger("focus");

});

$(".time").on("blur", "textarea", function() {
  var text = $(this).val().trim();

  var taskP = $("<p>")
  .text(text);

  var time = $(this)
  .closest(".time-slot")
  .attr("id")

  tasks[time] = text
  saveTasks();
  // replace textarea with new content
  $(this).replaceWith(taskP);
});

setInterval(function() {
  $(".time-slot .time").each(function() {
    auditTask($(this));
  });
}, 1800000);