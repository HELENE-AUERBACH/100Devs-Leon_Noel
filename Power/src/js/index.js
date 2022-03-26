const privateJokeContainer = document.querySelector("#private-joke");
const andi = document.querySelector("#andi");
const claire = document.querySelector("#claire");
const sharleen = document.querySelector("#sharleen");
const contestants = document.querySelectorAll(".contestant");
const murfette = document.querySelector("#schtroumpfette");
const paragraphs = document.querySelectorAll("p");
const question = document.querySelector("#question");
const brainySmurf = document.querySelector("#schtroumpf-à-lunettes");
const lesson = document.querySelector("#lesson");
const papaSmurf = document.querySelector("#grand-Schtroumpf");
const conclusion = document.querySelector("#conclusion");
const ladybug = document.querySelector("#coccinelle");
const synth = window.speechSynthesis;
let timeoutID;

function hideParagraphs() {
  Array.from(paragraphs).forEach((element) => element.classList.add("hidden"));
}

function hideSmurfs() {
  murfette.classList.add("hidden");
  brainySmurf.classList.add("hidden");
  papaSmurf.classList.add("hidden");
  ladybug.classList.add("hidden");
  hideParagraphs();
}

function reset() {
  privateJokeContainer.classList.remove("red");
  privateJokeContainer.classList.add("white");
  hideSmurfs();
  Array.from(contestants).forEach((element) =>
    element.classList.remove("hidden")
  );
  clearTimeout(timeoutID);
}

const btnReset = document.getElementById("reset");
if (btnReset !== null) {
  btnReset.addEventListener("click", reset);
}

document.querySelector("#andi-next").addEventListener("click", andiNext);
document.querySelector("#claire-next").addEventListener("click", claireNext);
document
  .querySelector("#sharleen-next")
  .addEventListener("click", sharleenNext);
sharleen.addEventListener("click", surprise);

function andiNext() {
  reset();
  claire.classList.add("hidden");
  sharleen.classList.add("hidden");
  andi.classList.toggle("hidden", false);
}

function claireNext() {
  reset();
  andi.classList.add("hidden");
  sharleen.classList.add("hidden");
  claire.classList.toggle("hidden", false);
}

function sharleenNext() {
  hideSmurfs();
  claire.classList.add("hidden");
  andi.classList.add("hidden");
  sharleen.classList.toggle("hidden", false);
  privateJokeContainer.classList.remove("white");
  /* Show the murfette and let she speaks */
  privateJokeContainer.classList.add("red");
  murfette.classList.remove("hidden");
  let yellThis = new SpeechSynthesisUtterance(question.innerHTML);
  yellThis.lang = "en-US";
  synth.speak(yellThis);
  /* After 5 seconds, hide the murfette and show brainySmurf and his lesson */
  timeoutID = setTimeout(() => {
    murfette.classList.add("hidden");
    brainySmurf.classList.remove("hidden");
    lesson.classList.remove("hidden");
  }, 5 * 1000); // 5s
  /* After 15 seconds, hide brainySmurf and his lesson and show papaSmurf and his conclusion */
  timeoutID = setTimeout(() => {
    brainySmurf.classList.add("hidden");
    lesson.classList.add("hidden");
    papaSmurf.classList.remove("hidden");
    conclusion.classList.remove("hidden");
  }, 15 * 1000); // 15s
}

function surprise() {
  sharleen.classList.toggle("hidden");
  ladybug.classList.toggle("hidden");
}

/* Returns x in power n */
function pow(x, n) {
  if (
    typeof x === "undefined" ||
    x === null ||
    (typeof x === "string" && x.trim() === "") ||
    isNaN(x)
  ) {
    alert(`'${x}' is not a number`);
    return NaN;
  } else if (typeof n === "undefined" || n === null || isNaN(n) || n < 1) {
    alert(`Power '${n}' is not supported`);
    return NaN;
  } else if (x === 0) {
    return 0;
  } else if (x === 1 || n === 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

/* Ask and check for user input and call pow function */
function fun() {
  const result = document.getElementById("result");
  result.classList.add("hidden");
  const strX = prompt("x");
  const x =
    strX === undefined ||
    strX === null ||
    strX.trim() === "" ||
    isNaN(Number(strX))
      ? strX
      : Number(strX);
  let strN = prompt("n", "1");
  while (
    typeof strN === "undefined" ||
    strN === null ||
    isNaN(parseInt(strN, 10)) ||
    parseInt(strN, 10) < 1
  ) {
    alert(`Power '${strN}' is not supported, use a positive integer`);
    strN = prompt("n", "1");
  }
  const n = parseInt(strN, 10);
  //alert(`pow(${x}, ${n}) = ${pow(x, n)}`);
  result.innerText = `pow(${x}, ${n}) = ${pow(x, n)}`;
  result.classList.remove("hidden");
}

const btnClickMe = document.getElementById("click-me");
if (btnClickMe !== null) {
  btnClickMe.addEventListener("click", fun);
}
