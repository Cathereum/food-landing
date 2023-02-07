/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = () => {
  const result = document.querySelector(".calculating__result span");
  let sex = "female",
    height,
    weight,
    age,
    ratio = 1.375;

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____"; // Можете придумать что угодно
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
        } else {
          sex = e.target.getAttribute("id");
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const cards = () => {
  class MenuCard {
    constructor(src, alt, title, desc, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 70;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
          <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
        </div>`;
      this.parent.append(element);
    }
  }

  const getData = async (url) => {
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(`Could not fetch ${url} status: ${data.status}`);
    }

    return await data.json();
  };

  getData("http://localhost:3000/menu").then((data) => {
    data.forEach((obj) => {
      new MenuCard(
        obj.img,
        obj.altimg,
        obj.title,
        obj.descr,
        obj.price,
        ".menu .container"
      ).render();
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabs = () => {
  const tabsList = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  };

  const showTabs = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");

    tabs[i].classList.add("tabheader__item_active");
  };

  tabsList.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (item == event.target) {
          hideTabContent();
          showTabs(i);
        }
      });
    }
  });

  hideTabContent();
  showTabs();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timer = () => {
  const deadLine = "2024-02-04";

  const getTimeRemaining = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date());

    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const setClock = (selector, endTime) => {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");

    const updateClock = () => {
      const time = getTimeRemaining(endTime);

      days.innerHTML = time.days;
      hours.innerHTML = time.hours;
      minutes.innerHTML = time.minutes;
      seconds.innerHTML = time.seconds;

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    };

    updateClock();
    const timeInterval = setInterval(updateClock, 1000);
  };
  setClock(".timer", deadLine);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");







window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map