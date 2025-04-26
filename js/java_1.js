// DOM loaded
window.addEventListener("DOMContentLoaded", () => {
  // Slider logic
  let currentIndex = 0;
  let isPlaying = true;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const pauseBtn = document.getElementById("pause");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  let interval = setInterval(nextSlide, 5000);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(parseInt(dot.dataset.index));
    });
  });

  pauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      clearInterval(interval);
      pauseBtn.innerHTML = "&#9658;"; // ▶
    } else {
      interval = setInterval(nextSlide, 5000);
      pauseBtn.innerHTML = "&#10074;&#10074;"; // ⏸
    }
    isPlaying = !isPlaying;
  });
});