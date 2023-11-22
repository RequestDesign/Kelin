// Custom scripts
document.addEventListener('DOMContentLoaded', function () {
    function setPhoneMask() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');

        phoneInputs.forEach((phoneInput) => {
            const im = new Inputmask('+ 7 ( 999 ) 999-99-99', { placeholder: '+ 7 ( 999 ) 999-99-99' });
            im.mask(phoneInput);
        });
    }

    setPhoneMask();

    //read more
    if (document.querySelector('.privacy__block-link')) {
        const buttons = document.querySelectorAll('.privacy__block-link');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                let text = button.previousElementSibling;

                if (!text.classList.contains('show-text')) {
                    text.classList.add('show-text');
                    text.classList.remove('hide-text');
                    button.style.display = 'none';
                }
            });
        });
    }

    //video play
    function videoPlayerPlay(videoPlayerSelector, buttonSelector) {
        if (document.querySelector(buttonSelector)) {
            const button = document.querySelector(buttonSelector);
            if (document.querySelector(videoPlayerSelector)) {
                const videoPlayer = document.querySelector(videoPlayerSelector);
                videoPlayer.controls = false;

                button.innerHTML =
                    "<svg  width='30' height='43' viewBox='0 0 30 43' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M30 21.5L0.749998 42.7176L0.75 0.282376L30 21.5Z' fill='white' /> </svg>";

                button.addEventListener('click', () => {
                    if (videoPlayer.paused == true) {
                        videoPlayer.play();
                        button.innerHTML =
                            '<svg width="39" height="49" viewBox="0 0 39 49" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16.7143" height="49" fill="white"/><rect x="22.2856" width="16.7143" height="49" fill="white"/></svg>';
                    } else {
                        videoPlayer.pause();
                        button.innerHTML =
                            "<svg  width='30' height='43' viewBox='0 0 30 43' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M30 21.5L0.749998 42.7176L0.75 0.282376L30 21.5Z' fill='white' /> </svg>";
                    }
                });
            }
        }
    }

    videoPlayerPlay('.home__video-player', '.home__video-player-button');
    videoPlayerPlay('.about-us__video-player', '.about-us__video-player-button');

    //marquee
    const marquee = (marqueeElem, textElem) => {
        const widthText =
                textElem.offsetWidth +
                parseInt(window.getComputedStyle(marqueeElem, null).getPropertyValue('gap')),
            content = textElem.cloneNode(true);

        marqueeElem.appendChild(content);
        marqueeElem.animate([{ left: '0px' }, { left: `-${widthText}px` }], {
            duration: 25000,
            iterations: Infinity
        });
    };

    function marqueeCheck(marqueeSelector, textSelector) {
        if (document.querySelector(marqueeSelector)) {
            let marqueeElems = document.querySelectorAll(marqueeSelector);
            marqueeElems.forEach((marqueeElem) => {
                const text = marqueeElem.querySelector(textSelector);
                marquee(marqueeElem, text);
            });
        }
    }

    marqueeCheck('.work__marquee-container', '.work__marquee-list');

    //burger
    const burgerMenuButton = document.querySelector('.header__mobile-burger');
    const closeBurgerButton = document.querySelector('.header__mobile-burger-menu .close');

    burgerMenuButton.addEventListener('click', () => {
        $('.header__mobile-burger-menu').addClass('--active');
        $('body').addClass('locked');
    });

    closeBurgerButton.addEventListener('click', () => {
        $('.header__mobile-burger-menu').removeClass('--active');
        $('body').removeClass('locked');
    });

    const burgerMenuDropdown = document.querySelectorAll('.header__mobile-burger-menu-item');

    burgerMenuDropdown.forEach((dropdown) => {
        dropdown.addEventListener('click', () => {
            const arrow = dropdown.querySelector('.header__mobile-burger-menu-item-title');
            const list = dropdown.querySelector('.header__mobile-burger-menu-dropdown-list');

            if (!list) return;

            $(list).slideToggle('slow').css('display', 'flex');
            $(arrow).toggleClass('--active');
        });
    });
    //modal
    function bindModal(trigger, modal, close, callback = () => null) {
        (modal = document.querySelector(modal)), (close = document.querySelector(close));

        const body = document.body;
        const modalBody = modal.querySelector('.modal');

        if (!$(trigger) || !modal || !close || !modalBody) return;

        $(trigger).each(function () {
            $(this).on('click', (e) => {
                e.preventDefault();
                modal.classList.add('--active');
                modalBody.classList.add('--active');
                body.classList.add('locked');
            });
        });
        $(close).on('click', () => {
            modalBody.classList.remove('--active');
            modal.classList.remove('--active');
            body.classList.remove('locked');
        });
        $(modal).on('click', (e) => {
            if (e.target === modal) {
                modalBody.classList.remove('--active');
                modal.classList.remove('--active');
                body.classList.remove('locked');
            }
        });

        callback();
    }

    bindModal('.success-button', '#success-modal', '#success-modal .modal__close', closeModalOnButtonClick);

    function closeModalOnButtonClick() {
        const button = $('.close-modal-button');

        button.on('click', () => {
            $('#success-modal').removeClass('--active');
            $('#success-modal .modal').removeClass('--active');
            $('body').removeClass('locked');
        });
    }
});

