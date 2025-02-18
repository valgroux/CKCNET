import ScrollReveal from 'scrollreveal';

class ScrollRevealAnimation {
    constructor() {
        this.initScrollReveal();
    }

    initScrollReveal() {
        const sr = ScrollReveal({
            distance: '40px',
            duration: 600,
            easing: 'ease-in-out',
            reset: false,
            viewFactor: 0.1, // L'animation se déclenche quand l'élément est visible à 10% de la hauteur de la fenêtre
            origin: 'bottom',
        });

        // Objets pour les vitesses
        const revealSettings = {
            'reveal-fast': { delay: 30 },
            'reveal-medium': { delay: 200 },
            'reveal-low': { delay: 400 },
        };

        // Parcourir les réglages et révéler les éléments
        Object.keys(revealSettings).forEach((className) => {
            const elements = document.querySelectorAll(`.${className}`);
            elements.forEach((element, index) => {
                sr.reveal(element, {
                    delay: index * revealSettings[className].delay,
                });
            });
        });
    }
}

export { ScrollRevealAnimation };