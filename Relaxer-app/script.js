const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

// change text and add/remove class of grow/shrink based on the passed time
function breathAnimation() {
  text.innerText = "Breathe In!";
  container.className = "container grow";
  setTimeout(() => {
    text.innerText = "Hold!";
    setTimeout(() => {
      text.innerText = "Breathe Out!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}
breathAnimation();

//run the function every 7.5s since that is the total time
setInterval(breathAnimation, totalTime);
