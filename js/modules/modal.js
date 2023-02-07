const modal = () => {
  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");
  const modalCloseBtn = modal.querySelector("[data-close]");

  const openModal = () => {
    // modal.classList.add("show");
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(autoOpenModal);
  };

  const closeModal = () => {
    //   modal.classList.remove("show");
    modal.classList.toggle("show");
    document.body.style.overflow = "";
  };

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
      console.log("ESC");
    }
  });
};

//   const autoOpenModal = setInterval(openModal, 10000);

export default modal;
