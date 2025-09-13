tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};

const listItems = document.querySelectorAll(".instruction-item");
const mainHeading = document.querySelector("#main-heading");
const mainImage = document.querySelector("#main-image");
const techTags = document.querySelectorAll(".tech-tag");
const playerButton = document.querySelector("#player-button");
const dynamicContent = document.querySelector("#dynamic-content");

let imageToggle = true;
let userName = null;

// Toggle function
function toggleDone(e) {
  const item = e.currentTarget;
  const isCompleted = item.classList.contains("completed");

  if (!isCompleted) {
    item.classList.add("completed", "line-through", "opacity-70");
    item.style.backgroundColor = "rgb(75, 85, 99)";
    item.style.color = "white";
    // Checkmark
    const checkmark = document.createElement("span");
    checkmark.innerHTML =
      ' <i class="fas fa-check text-green-400 font-bold animate-slide-up ml-2"></i>';
    item.appendChild(checkmark);
  } else {
    item.classList.remove("completed", "line-through", "opacity-70");
    item.style.backgroundColor = "rgb(55, 65, 81)";
    item.style.color = "white";
    const checkmark = item.querySelector("span:last-child i.fa-check");
    if (checkmark) {
      checkmark.parentElement.remove();
    }
  }
}

// Click listeners
listItems.forEach((item) => {
  item.addEventListener("click", toggleDone);
});

// Image toggle
mainImage.addEventListener("click", () => {
  mainImage.style.transform = "scale(0.9)";
  setTimeout(() => {
    if (imageToggle) {
      mainImage.src = "./assets/images/VAMS.png";
    } else {
      mainImage.src = "./assets/images/Banner Image.png";
    }
    imageToggle = !imageToggle;
    mainImage.style.transform = "scale(1)";
  }, 150);
});

// User name functionality
function setUserName() {
  const name = prompt("Please enter your name:");
  if (!name || name.trim() === "") {
    setUserName();
  } else {
    userName = name.trim();
    mainHeading.textContent = `Dako ko ug o-n, ${userName}!`;
    mainHeading.classList.add("animate-pulse-slow");
    setTimeout(() => {
      mainHeading.classList.remove("animate-pulse-slow");
    }, 2000);
  }
}

// Click listener
mainHeading.addEventListener("click", setUserName);

// Initialize user name on load
if (!userName) {
  setTimeout(setUserName, 1000); // Delay for better UX
}

// Button functionality
playerButton.addEventListener("click", () => {
  const name = prompt("Enter a new player name:");
  if (name && name.trim() !== "") {
    playerButton.textContent = `Player 1: ${name.trim()}`;
    playerButton.classList.add("animate-pulse");
    setTimeout(() => {
      playerButton.classList.remove("animate-pulse");
    }, 1000);
  }
});

// Reverse text animation
techTags.forEach((tag, index) => {
  tag.addEventListener("click", () => {
    const originalText = tag.dataset.original || tag.textContent;
    if (!tag.dataset.original) {
      tag.dataset.original = originalText;
    }

    const isReversed = tag.classList.contains("reversed");
    tag.style.transform = "rotateY(180deg)";

    setTimeout(() => {
      if (!isReversed) {
        tag.textContent = originalText.split("").reverse().join("");
        tag.classList.add("reversed");
      } else {
        tag.textContent = originalText;
        tag.classList.remove("reversed");
      }
      tag.style.transform = "rotateY(0deg)";
    }, 200);
  });
});

// Dynamic paragraph creation
function createParagraph() {
  const para = document.createElement("div");
  para.className =
    "rounded-2xl p-6 shadow-xl animate-slide-up border-2 border-gray-600 bg-gray-800";
  para.innerHTML = `
                <p class="text-white text-lg font-medium">
                    <i class="fa-solid fa-cake-candles mr-2"></i> You clicked a button! <span class="text-gray-200 font-bold">Awesome!</span>
                </p>
                <small class="text-gray-400">Created at ${new Date().toLocaleTimeString()}</small>
            `;
  dynamicContent.appendChild(para);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    para.style.opacity = "0";
    para.style.transform = "translateY(-20px)";
    setTimeout(() => para.remove(), 300);
  }, 10000);
}

// Click listener
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    createParagraph();
  }
});

// Some interactive effects on load
window.addEventListener("load", () => {
  // Stagger animation
  const elements = document.querySelectorAll(".animate-fade-in");
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
});

// CSS animations
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideUp {
                from { transform: translateY(10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-in-out;
            }
            .animate-slide-up {
                animation: slideUp 0.3s ease-out;
            }
        `;
document.head.appendChild(style);
