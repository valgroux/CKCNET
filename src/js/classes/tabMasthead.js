// Tabs.js
class Tabs {
  constructor(tabContainer) {
    this.tabContainer = tabContainer;
    this.tabLinks = tabContainer.querySelectorAll(".masthead__content__tablinks__button");
    this.tabContents = document.querySelectorAll(".masthead__content__tabcontent");
    this.addEventListeners();
    this.activateDefaultTab();
  }


  openTab(evt, otherTab) {

    this.tabContents.forEach(content => {
      content.classList.remove("active");
    });


    this.tabLinks.forEach(link => {
      link.classList.remove("active");
    });


    document.getElementById(otherTab).classList.add("active");


    evt.currentTarget.classList.add("active");
  }


  addEventListeners() {
    this.tabLinks.forEach((link, index) => {
      link.addEventListener("click", (event) => {
        const tab = `Lorem${index + 1}`;
        this.openTab(event, tab);
      });
    });
  }


  activateDefaultTab() {
    this.tabLinks[0].click();
  }
}

export { Tabs };
