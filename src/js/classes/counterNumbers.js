class Counter {
    constructor(element, duration = 3000) {  // Par défaut, la durée est de 4000 ms (4 secondes)
        this.element = element;
        this.targetValue = parseInt(this.element.dataset.count, 10);
        this.currentValue = 0;
        this.duration = duration; // Durée totale de l'animation en ms
    }

    startCounting() {
        const increment = this.targetValue / (this.duration / 20);  // Divise la durée en incréments tous les 20ms
        const interval = setInterval(() => {
            if (this.currentValue < this.targetValue) {
                this.currentValue += increment;
                this.element.textContent = Math.round(this.currentValue);
            } else {
                clearInterval(interval);
                this.element.textContent = this.targetValue; // Assure que la valeur finale est exacte
            }
        }, 20); // Le temps entre chaque incrément (20 ms)
    }

    // Méthode pour observer la visibilité de l'élément
    static observeVisibility() {
        const counterElements = document.querySelectorAll('.section3__container__blocs__item__number');

        // Observer options
        const observerOptions = {
            root: null,  // Utilise la fenêtre du navigateur
            rootMargin: '0px',
            threshold: 0.5  // L'élément doit être à 50% visible pour démarrer l'animation
        };

        // Observer callback
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quand l'élément devient visible, démarrer l'animation
                    new Counter(entry.target, 3000).startCounting();
                    observer.unobserve(entry.target);  // Arrêter d'observer après l'animation
                }
            });
        };

        // Créer l'observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observer chaque élément avec le compteur
        counterElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Démarrer l'observation à l'initialisation
Counter.observeVisibility();

export { Counter };
