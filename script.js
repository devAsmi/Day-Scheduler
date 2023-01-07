// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentHour = dayjs().hour();

  var timeBlocks = $(".time-block");
  for (var i = 0; i < timeBlocks.length; i++) {
    var timeEl = timeBlocks[i];

    var number = $(timeEl).attr("id").split("-").pop();

    if (number < currentHour) {
      $(timeEl).addClass("past");
    }
    if (number == currentHour) {
      $(timeEl).addClass("present");
    }
    if (number > currentHour) {
      $(timeEl).addClass("future");
    }
  }

  $(".saveBtn").on("click", function () {
    var timeBlockEl = $(this).parent("div").eq(0);
    var textAreaEl = $(timeBlockEl).children().eq(1);
    var timeBlockId = $(timeBlockEl).attr("id");
    var textAreaValue = $(textAreaEl).val();
    localStorage.setItem(timeBlockId, textAreaValue);
  });

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // hour-12 div, textarea value = "hello world"
  //var value = "hello";
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    $("#" + key) // #hour-10, #hour-12 etc
      .children()
      .eq("1")
      .val(value);
  }

  //
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMM D"));
});
//localStorage.getItem(timeBlockId);
