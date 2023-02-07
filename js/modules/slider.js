const slider = () => {
  const slides = document.querySelectorAll(".offer__slide");
  const prevBtn = document.querySelector(".offer__slider-prev");
  const nextBtn = document.querySelector(".offer__slider-next");
  const current = document.querySelector("#current");
  const total = document.querySelector("#total");

  let slideIndex = 1;
  total.innerHTML = `0${slides.length}`;

  const showSlides = (index) => {
    if (index < 1) {
      slideIndex = slides.length;
    } else if (index > slides.length) {
      slideIndex = 1;
    }

    slides.forEach((slide) => {
      slide.style.display = "none";
    });
    slides[slideIndex - 1].style.display = "block";

    current.innerHTML = `0${slideIndex}`;
  };

  prevBtn.addEventListener("click", () => {
    slideIndex -= 1;
    showSlides(slideIndex);
  });

  nextBtn.addEventListener("click", () => {
    slideIndex += 1;
    showSlides(slideIndex);
  });

  showSlides(slideIndex);
};
export default slider;
