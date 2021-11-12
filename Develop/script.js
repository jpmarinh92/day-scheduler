var tasks = {};




var createTask = function(taskTime, taskName) {
  // create elements that make up a task item
  var taskDiv = $("<div>").addClass("time text-white border border-dark mb-1");
  var taskP = $("<p>")
    .addClass("")
    .text(taskName);

  // append span and p element to parent li
  taskDiv.append(taskP);
  // append to ul list on the page
  $("#" + taskTime).append(taskDiv);
};


var saveTasks = function() {
  localStorage.setItem("tasksT", JSON.stringify(tasks));
};


var loadTasks = function() {
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

  var taskTime = $(taskEl)
    .parent()
    .attr("id")
  
  var time= moment(taskTime+":00:00", "HH:mm:ss");

  $(taskEl).removeClass("list-group-item-warning list-group-item-danger bg-primary");


  if (moment().isAfter(time)) {
    $(taskEl).addClass("bg-secondary");
  } else if (Math.abs(moment().diff(time, "hours")) + 1 == 0) {
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
}, 600000);