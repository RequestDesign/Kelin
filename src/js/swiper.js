const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
        swiper = new Swiper(className, settings);

        if (callback) {
            callback(swiper);
        }
    };

    const cheker = function () {
        if (breakpoint.matches) {
            return enableSwiper(swiperClass, swiperSettings);
        } else {
            if (swiper !== undefined) swiper.destroy(true, true);
            return;
        }
    };

    breakpoint.addEventListener('change', cheker);
    cheker();
};
const rem = function (rem) {
    if ($(window).width() > 768) {
        return 0.005208335 * $(window).width() * rem;
    } else {
        // где 375 это ширина моб версии макета
        return (100 / 375) * (0.1 * $(window).width()) * rem;
    }
};

resizableSwiper('(max-width: 768px)', '.abilities-swiper', {
    loop: true,
    speed: 1200,
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: rem(0.8)
});

resizableSwiper('(max-width: 100vw)', ' .home__industry-swiper', {
    loop: true,
    speed: 1200,
    direction: 'horizontal',
    slidesPerView: 1.3,
    spaceBetween: rem(0.8),
    grabCursor: true,
    navigation: {
        nextEl: '.home__industry-swiper-button-next'
    },
    breakpoints: {
        768: {
            direction: 'vertical',
            spaceBetween: rem(1.2),
            slidesPerView: 3
        }
    }
});

resizableSwiper('(max-width: 768px)', '.clients-swiper', {
    loop: true,
    speed: 1200,
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: rem(0.8)
});

resizableSwiper('(max-width: 100vw)', '.home__protection-swiper', {
    loop: true,
    speed: 1200,
    grabCursor: true,
    spaceBetween: rem(2),
    navigation: {
        nextEl: '.home__protection-swiper-button-next',
        prevEl: '.home__protection-swiper-button-prev'
    }
});

resizableSwiper('(max-width: 100vw)', '.home__tu-letters-swiper', {
    loop: true,
    speed: 1200,
    grabCursor: true,
    spaceBetween: rem(1.2),
    slidesPerView: 1.2,
    navigation: {
        nextEl: '.home__tu-letters-swiper-button-next',
        prevEl: '.home__tu-letters-swiper-button-prev'
    },
    breakpoints: {
        768: {
            spaceBetween: rem(1.6),
            slidesPerView: 3
        }
    }
});

resizableSwiper('(max-width: 768px)', '.talents-swiper', {
    loop: true,
    speed: 1200,
    direction: 'horizontal',
    slidesPerView: 1.2,
    spaceBetween: rem(0.8)
});

resizableSwiper('(max-width: 100vw)', '.home__individual-calc-swiper', {
    loop: true,
    speed: 1200,
    grabCursor: true,
    spaceBetween: rem(0.8),
    slidesPerView: 'auto',

    breakpoints: {
        768: {
            spaceBetween: rem(1.6),
            slidesPerView: 2
        }
    }
});

resizableSwiper('(max-width: 100vw)', '.home__category-list-swiper', {
    loop: true,
    speed: 1200,
    grabCursor: true,
    spaceBetween: rem(0.8),
    slidesPerView: 'auto',

    breakpoints: {
        768: {
            spaceBetween: rem(1.2)
        }
    }
});

resizableSwiper('(max-width: 100vw)', '.about-us__reviews-swiper', {
    loop: true,
    speed: 1200,
    grabCursor: true,
    spaceBetween: rem(0.8),
    slidesPerView: 1,
    navigation: {
        nextEl: '.about-us__reviews-button-next',
        prevEl: '.about-us__reviews-button-prev'
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: rem(1.2)
        }
    }
});
