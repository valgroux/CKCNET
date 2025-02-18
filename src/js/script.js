import '../scss/style.scss';

import { Tabs } from './classes/tabMasthead.js';
import { RangeSlider } from './classes/rangeSlider.js'; 
import { Counter } from './classes/counterNumbers.js';
import { SliderCards } from './classes/sliderCards.js';
import { BurgerMenu } from './classes/burgerMenu.js'; 
import { ScrollRevealAnimation } from "./classes/scrollRevealAnimation.js";

document.addEventListener("DOMContentLoaded", () => {

  // Initialisation du changement de Tab dans le masthead
  const tabContainer = document.querySelector('.masthead__content__tablinks'); 
  const tabs = new Tabs(tabContainer);

  // Initialisation des curseurs dans le masthead
  const rangeSliderElement = document.querySelectorAll('.masthead__content__tabcontent__blocs__item--195');
  rangeSliderElement.forEach(slider => {
    new RangeSlider(slider);
  });

  // Appel explicite pour démarrer l'observation de la visibilité des compteurs
  Counter.observeVisibility();

  // Initialisation du slider Swiper
  const sliderCards = new SliderCards();

  // Initialisation du menu burger
  new BurgerMenu();  // Initialisation de la classe BurgerMenu

  // Initiliasation des animations
  const scrollRevealAnimation = new ScrollRevealAnimation();

});
