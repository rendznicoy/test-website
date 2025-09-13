const listItems = document.querySelectorAll("li");
const myHeading = document.querySelector("h1");
const myImage = document.querySelector("img");

function toggleDone(e) {
  if (!e.target.className) {
    e.target.className = "done";
  } else {
    e.target.className = "";
  }
}

listItems.forEach((item) => {
  item.addEventListener("click", toggleDone);
});

myHeading.textContent = "Hello world!";

myImage.addEventListener("click", () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "./assets/images/2.jpg") {
    myImage.setAttribute("src", "./assets/images/3.jpg");
  } else {
    myImage.setAttribute("src", "./assets/images/2.jpg");
  }
});

let myButton = document.querySelector("button");
let myHHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Dako ko ug o-n, ${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Dako ko ug o-n, ${storedName}`;
}

myButton.addEventListener("click", () => {
  setUserName();
});
