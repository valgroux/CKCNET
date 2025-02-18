import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

class SliderCards {
    constructor() {

        this.swiper = new Swiper(".js-cards", {
            slidesPerView: "auto",
            spaceBetween: 16,
            loop: true,
            breakpoints:{
                1920:{
                    slidesPerView:"auto",
                },

                381:{
                    slidesPerView:"auto",
                },

                380:{
                    slidesPerView:1,
                },
                350:{
                    slidesPerView:1,
                },
            },
            keyboard: {
                enabled:true
            },
            navigation: {
                nextEl: ".section5__container__bloc__arrows--right",
                prevEl: ".section5__container__bloc__arrows--left",
            },
            autoplay: {
                delay: 4000000,
                disableOnInteraction: false,
            },
        });
    }
}

export { SliderCards };
