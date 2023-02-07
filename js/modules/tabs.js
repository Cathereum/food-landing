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

export default tabs;
