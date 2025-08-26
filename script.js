let completedSteps = 0;
let totalSteps = 8;
let timerInterval;
let timeRemaining = 15 * 60; // 15 minutes in seconds
let timerRunning = false;

// Slider functionality
let currentSlideIndex = 0;
const totalSlides = 5;
const sliderImages = document.querySelectorAll(".slider-image");
const sliderDots = document.querySelectorAll(".slider-dot");

function showSlide(index) {
  // Hide all slides
  sliderImages.forEach((slide, i) => {
    slide.style.opacity = "0";
    slide.style.transform =
      i < index ? "translateX(-100%)" : "translateX(100%)";
  });

  // Show current slide
  sliderImages[index].style.opacity = "1";
  sliderImages[index].style.transform = "translateX(0)";

  // Update dots
  sliderDots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove("bg-white/40");
      dot.classList.add("bg-white/70");
    } else {
      dot.classList.remove("bg-white/70");
      dot.classList.add("bg-white/40");
    }
  });

  // Update counter
  document.getElementById("currentSlide").textContent = index + 1;
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(currentSlideIndex);
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentSlideIndex);
}

// Event listeners for slider
document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

// Dot navigation
sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Toggle ingredients
let ingredientsVisible = false;
document
  .getElementById("toggleIngredientsBtn")
  .addEventListener("click", function () {
    const section = document.getElementById("ingredientsSection");
    const btn = this;

    if (!ingredientsVisible) {
      section.classList.remove("hidden");
      btn.innerHTML = "📋 Hide Ingredients";
      btn.classList.remove(
        "from-purple-500",
        "to-pink-500",
        "hover:from-purple-600",
        "hover:to-pink-600"
      );
      btn.classList.add(
        "from-red-500",
        "to-red-600",
        "hover:from-red-600",
        "hover:to-red-700"
      );
      section.scrollIntoView({ behavior: "smooth" });
      ingredientsVisible = true;
    } else {
      section.classList.add("hidden");
      btn.innerHTML = "📋 Show Ingredients";
      btn.classList.remove(
        "from-red-500",
        "to-red-600",
        "hover:from-red-600",
        "hover:to-red-700"
      );
      btn.classList.add(
        "from-purple-500",
        "to-pink-500",
        "hover:from-purple-600",
        "hover:to-pink-600"
      );
      ingredientsVisible = false;
    }
  });

// Start cooking
document
  .getElementById("startCookingBtn")
  .addEventListener("click", function () {
    const ingredientsSection = document.getElementById("ingredientsSection");
    const instructionsSection = document.getElementById("instructionsSection");
    const timerSection = document.getElementById("timerSection");

    ingredientsSection.classList.remove("hidden");
    instructionsSection.classList.remove("hidden");
    timerSection.classList.remove("hidden");

    startTimer();
    instructionsSection.scrollIntoView({ behavior: "smooth" });
  });

// Print recipe
document.getElementById("printBtn").addEventListener("click", function () {
  window.print();
});

// Step completion with individual buttons
document.querySelectorAll(".complete-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    const stepItem = this.closest(".step-item");
    const stepNumber = stepItem.querySelector(".step-number");

    if (!stepItem.classList.contains("step-completed")) {
      stepItem.classList.add("step-completed");
      stepNumber.classList.remove("bg-blue-500");
      stepNumber.classList.add("bg-green-500");
      stepNumber.innerHTML = "✓";
      this.innerHTML = "✅ Completed";
      this.classList.remove("bg-green-500", "hover:bg-green-600");
      this.classList.add("bg-gray-400", "cursor-not-allowed");
      this.disabled = true;
      completedSteps++;
      updateProgress();
    }
  });
});

// Timer functions
function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
    document.getElementById("pauseTimer").textContent = "Pause Timer";
  }
}

function pauseTimer() {
  if (timerRunning) {
    timerRunning = false;
    clearInterval(timerInterval);
    document.getElementById("pauseTimer").textContent = "Resume Timer";
  } else {
    startTimer();
  }
}

function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById("timerDisplay").textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    clearInterval(timerInterval);
    document.getElementById("timerDisplay").textContent = "00:00";
    document.getElementById("timerDisplay").style.color = "#ef4444";
    alert("🎉 Time's up! Your chocolate cake should be ready!");
  }
}

function updateProgress() {
  const percentage = (completedSteps / totalSteps) * 100;
  document.getElementById("progressBar").style.width = percentage + "%";
  document.getElementById(
    "progressText"
  ).textContent = `${completedSteps}/${totalSteps} steps completed`;

  if (completedSteps === totalSteps) {
    document
      .getElementById("progressBar")
      .classList.remove("from-green-400", "to-green-600");
    document
      .getElementById("progressBar")
      .classList.add("from-yellow-400", "to-yellow-600");
    setTimeout(() => {
      alert(
        "🎉 Congratulations! You've completed all steps. Enjoy your delicious chocolate cake!"
      );
    }, 500);
  }
}

// Pause timer button
document.getElementById("pauseTimer").addEventListener("click", pauseTimer);

// Ingredient hover effects
document.querySelectorAll(".ingredient-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(4px)";
  });
  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateX(0)";
  });
});
