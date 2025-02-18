class RangeSlider {
    constructor(sliderElement) {
        if (!sliderElement) {
            console.error("Slider element is missing");
            return;
        }

        this.slider = sliderElement;
        this.progress = this.slider.querySelector(".masthead__content__tabcontent__blocs__item__range__slider__progress");
        this.minPriceInput = this.slider.querySelector(".masthead__content__tabcontent__blocs__item__min-price");
        this.maxPriceInput = this.slider.querySelector(".masthead__content__tabcontent__blocs__item__max-price");
        this.minInput = this.slider.querySelector(".masthead__content__tabcontent__blocs__item__range__min-input");
        this.maxInput = this.slider.querySelector(".masthead__content__tabcontent__blocs__item__range__max-input");
        this.minValueSpan = this.slider.querySelector(".formatted-value[data-for='min']");
        this.maxValueSpan = this.slider.querySelector(".formatted-value[data-for='max']");

        if (!this.progress || !this.minPriceInput || !this.maxPriceInput || !this.minInput || !this.maxInput || !this.minValueSpan || !this.maxValueSpan) {
            return;
        }

        this.isDragging = false;
        this.startOffsetX = 0;

        this.addEventListeners();
        this.updateProgress();
    }


    formatNumber(number) {
        return number.toLocaleString('fr');  
    }

    // Mise à jour de la barre de progression
    updateProgress() {
        const minValue = parseInt(this.minInput.value);
        const maxValue = parseInt(this.maxInput.value);

        const range = this.maxInput.max - this.minInput.min;
        const valueRange = maxValue - minValue;
        const width = (valueRange / range) * 100;
        const minOffset = ((minValue - this.minInput.min) / range) * 100;

        this.progress.style.width = width + "%";
        this.progress.style.left = minOffset + "%";

        this.minPriceInput.value = minValue;
        this.maxPriceInput.value = maxValue;

        this.minValueSpan.textContent = this.formatNumber(minValue);
        this.maxValueSpan.textContent = this.formatNumber(maxValue);

        // Ajouter l'unité en fonction de l'ordre des blocs
        if (this.slider.classList.contains('masthead__content__tabcontent__blocs__item--195')) {
            // Premier bloc - pas d'unité
            this.minValueSpan.textContent = this.formatNumber(minValue); // Pas d'unité
            this.maxValueSpan.textContent = this.formatNumber(maxValue); // Pas d'unité
        }
        if (this.slider === document.querySelectorAll('.masthead__content__tabcontent__blocs__item--195')[1]) {
            // Deuxième bloc - unité €
            this.minValueSpan.textContent += ' €';
            this.maxValueSpan.textContent += ' €';
        }
        if (this.slider === document.querySelectorAll('.masthead__content__tabcontent__blocs__item--195')[2]) {
            // Troisième bloc - unité m
            this.minValueSpan.textContent += ' m';
            this.maxValueSpan.textContent += ' m';
        }
    }

    // Mise à jour de la plage des valeurs en fonction des inputs
    updateRange(event) {
        const input = event.target;

        let min = parseInt(this.minPriceInput.value.replace(/\s/g, ''));
        let max = parseInt(this.maxPriceInput.value.replace(/\s/g, ''));

        if (input === this.minPriceInput && min > max) {
            max = min;
            this.maxPriceInput.value = this.formatNumber(max);
        } else if (input === this.maxPriceInput && max < min) {
            min = max;
            this.minPriceInput.value = this.formatNumber(min);
        }

        this.minInput.value = min;
        this.maxInput.value = max;

        this.updateProgress();
    }

    // Ajout des écouteurs d'événements pour les inputs et la barre de progression
    addEventListeners() {
        if (this.minPriceInput && this.maxPriceInput) {
            this.minPriceInput.addEventListener("input", this.updateRange.bind(this));
            this.maxPriceInput.addEventListener("input", this.updateRange.bind(this));
        }

        if (this.minInput && this.maxInput) {
            this.minInput.addEventListener("input", () => {
                if (parseInt(this.minInput.value) >= parseInt(this.maxInput.value)) {
                    this.maxInput.value = this.minInput.value;
                }
                this.updateProgress();
            });

            this.maxInput.addEventListener("input", () => {
                if (parseInt(this.maxInput.value) <= parseInt(this.minInput.value)) {
                    this.minInput.value = this.maxInput.value;
                }
                this.updateProgress();
            });
        }

        if (this.progress) {
            this.progress.addEventListener("mousedown", (e) => {
                e.preventDefault(); 
                this.isDragging = true;
                this.startOffsetX = e.clientX - this.progress.getBoundingClientRect().left;
                this.slider.classList.toggle("dragging", this.isDragging);
            });
        }

        document.addEventListener("mousemove", (e) => {
            if (this.isDragging) {
                const sliderRect = this.slider.getBoundingClientRect();
                const progressWidth = parseFloat(this.progress.style.width || 0);
                let newLeft = ((e.clientX - sliderRect.left - this.startOffsetX) / sliderRect.width) * 100;
                newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);
                this.progress.style.left = newLeft + "%";

                const range = this.maxInput.max - this.minInput.min;
                const newMin = Math.round((newLeft / 100) * range) + parseInt(this.minInput.min);
                const newMax = newMin + parseInt(this.maxInput.value) - parseInt(this.minInput.value);

                this.minInput.value = newMin;
                this.maxInput.value = newMax;

                this.updateProgress();
            }
            this.slider.classList.toggle("dragging", this.isDragging);
        });

        document.addEventListener("mouseup", () => {
            if (this.isDragging) {
                this.isDragging = false;
            }
            this.slider.classList.toggle("dragging", this.isDragging);
        });
    }
}

export { RangeSlider };
