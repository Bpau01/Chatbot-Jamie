$(document).ready(function () {
  $("#sendButton").click(function () {
    var userMessage = $("#userInput").val().trim();
    if (userMessage !== "") {
      sendMessage(userMessage, "User");
      $("#userInput").val("");
    }
  });

  $("#userInput").keypress(function (e) {
    if (e.which == 13) {
      $("#sendButton").click();
      e.preventDefault(); //to prevent entering a new line when enter is pressed
    }
  });
  var currentDateTime = getCurrentTime();
  document.getElementById("initial-timestamp").innerText = currentDateTime;
});

//Print out the message bubble with the sender's name and timestamp
function sendMessage(message, sender) {
  if (sender == "User") {
    sender = "You";
  }
  var messagecontainer =
    '<div class="message-container ' +
    sender.toLowerCase() +
    '"><p class="message-name ' +
    sender.toLowerCase() +
    '">' +
    sender +
    '</p> <p class="message-bubble ' +
    sender.toLowerCase() +
    '">' +
    message +
    '</p><small class="timestamp ' +
    sender.toLowerCase() +
    '">' +
    getCurrentTime() +
    "</small></div>";
  $("#messages").append(messagecontainer);
  if (sender === "You") {
    var response = getResponse(message);
    setTimeout(function () {
      sendMessage(response, "Jamie");
    }, 1000);
  }
  scrollToBottom(); //Scroll the Chatbox to the bottom once new chat is created
}

//Timestamp in the format "dd/mm/yyyy hh:mm:ss"
function getCurrentTime() {
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth() + 1;
  var year = now.getFullYear();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return (
    day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
  );
}

//Chatbot Jamie response to different input
function getResponse(message) {
  var inputMessage = message.toLowerCase();
  console.log(inputMessage);
  if (inputMessage.includes("jamie")) {
    return "Can I help you?";
  } else if (inputMessage.includes("?") && inputMessage.includes("!")) {
    return "Please give me some time to resolve the issue.";
  } else if (inputMessage.includes("?")) {
    return "Yes.";
  } else if (inputMessage.includes("!")) {
    return "Please remain calm.";
  } else {
    return "Sorry, I don’t understand";
  }
}

// Function to auto scroll messages container to bottom
function scrollToBottom() {
  var messagesContainer = document.getElementById("messages");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
