class BurgerMenu {
  constructor() {
    this.burgerButton = document.querySelector('.header__burger'); 
    this.burgerMenu = document.querySelector('.burger');
    this.closeButton = document.querySelector('.burger__header__menu'); 
    this.burgerIcon = this.burgerButton.querySelector('.header__burger__icon');
    this.burgerText = this.burgerButton.querySelector('.header__burger__text')

    this.burgerButton.addEventListener('mouseenter', () => this.handleHover(true));
    this.burgerButton.addEventListener('mouseleave', () => this.handleHover(false));

    if (this.burgerButton && this.burgerMenu && this.closeButton) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    // Ouvrir le menu
    this.burgerButton.addEventListener('click', () => {
      this.burgerMenu.classList.add('active'); 
      document.body.style.overflow = 'hidden';  // Désactive le scroll
    });

    // Fermer le menu
    this.closeButton.addEventListener('click', () => {
      this.burgerMenu.classList.remove('active');
      document.body.style.overflow = '';  // Réactive le scroll
    });
  }

  handleHover(isHovering) {
    if (isHovering) {
      this.burgerIcon.style.backgroundImage = "url('/src/svg/icon_burger_black.svg')";
      this.burgerText.style.color = "#000"; 
    } else {
      this.burgerIcon.style.backgroundImage = "url('/src/svg/icon_burger_white.svg')";
      this.burgerText.style.color = ""; 
    }
  }
}

export { BurgerMenu };
