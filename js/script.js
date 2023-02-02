window.addEventListener("DOMContentLoaded", () => {
  //Tabs
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

  //Timer

  const deadLine = "2023-02-04";

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
    const timeInterval = setInterval(updateClock, 1000);
  };

  hideTabContent();
  showTabs();
  setClock(".timer", deadLine);
});
