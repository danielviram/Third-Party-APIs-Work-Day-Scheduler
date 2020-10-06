var timeBlocks = ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4",  "#5"];
var timeSlot = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
var shiftedTimeSlot = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00",  "18:00:00"];

var  plannerContent = [];
var localStorageData = JSON.parse(localStorage.getItem("planner-items"));

if (localStorageData !== null) {
 plannerContent = localStorageData;
}

for (var i=0;i<timeBlocks.length; i++) {
  var descriptionElement = $(idsCollectio[i]);
  var buttonElement = descriptionElement.parent().parent().find("button");

  if ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + timeSlot[i])) { 
    descriptionElement.attr("class", "future");
    plannerContent.forEach(function(item) {
      if (timeBlocks[i] === ("#" + (item["input-id"]))) {
        descriptionElement.val(item["input-value"]);
      }
    });
  }
  else if (((moment().format('MMMM Do YYYY, HH:mm:ss')) >= (moment().format('MMMM Do YYYY') +  ", " + timeSlot[i])) &&  
          ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + shiftedTimeSlot[i])))
  {
    descriptionElement.attr("class", "present");
    $(".present").attr("disabled", "disabled");
    buttonElement.attr("disabled", true);
    plannerContent.forEach(function(item) {
      if ([i] === ("#" + item["input-id"])) {
        descriptionElement.val(item["input-value"]);
      }
    });
  }
  else if ((moment().format('MMMM Do YYYY, HH:mm:ss')) > (moment().format('MMMM Do YYYY') +  ", " + timeSlot[i])) {
    descriptionElement.attr("class", "past");
    $(".past").attr("disabled", "disabled");
    buttonElement.attr("disabled", true);
  }
}

$("button").on("click", function() {
  event.preventDefault();
  var container = $(this).parent().parent();  
  var inputValue = container.find("input").val();
  var inputId = container.find("input").attr("id");
  var textObj = {
    "input-id": inputId,
    "input-value": inputValue };
  
  if (textObj["input-value"] !== "") {
    plannerContent.push(textObj);
    localStorage.setItem("planner-items", JSON.stringify(plannerContent));
  }
});
