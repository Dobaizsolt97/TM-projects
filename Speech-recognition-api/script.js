const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();
console.log(randomNum);

//check mes against nr
function checkNumber(msg) {
  const num = +msg;
  //check is nr
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  //check if in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div> Number must be between 1 and 100</div>";
    return;
  }
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats you have guessed the number!<br><br><br><br>
      <h2>it was ${num}</h2>
      <button class='play-again' id='play-again'>Play again!</button>`;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>Go lower</div>";
  } else msgEl.innerHTML += "<div>Go higher</div>";
}

//check if in range

//write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You Said: </div>
    <span class='box'>${msg}</span>`;
}

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// generate nrandom number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.lang = "en-US";

//start recognition and game
recognition.start();
// speak result
recognition.addEventListener("result", onSpeak);

//end SR service
recognition.addEventListener("end", () => recognition.start());
// play btn
document.body.addEventListener("click", e => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
