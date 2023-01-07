$(function () {
  //  Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentHour = dayjs().hour();

  // compare currentTime with the time for a block and set class based on past, present, or future
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

  // save button click handler to save the data to localstorage
  $(".saveBtn").on("click", function () {
    var timeBlockEl = $(this).parent("div").eq(0);
    var textAreaEl = $(timeBlockEl).children().eq(1);
    var timeBlockId = $(timeBlockEl).attr("id");
    var textAreaValue = $(textAreaEl).val();
    localStorage.setItem(timeBlockId, textAreaValue);
  });

  // Added code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    $("#" + key) // #hour-10, #hour-12 etc
      .children()
      .eq("1")
      .val(value);
  }

  // Added code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMM D"));
});
