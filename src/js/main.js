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

    marqueeCheck('.marquee__container', '.marquee__list');

    //header fixed
    function fixedHeader() {
        const header = document.querySelector('.header'),
            headerContent = document.querySelector('.header__content'),
            content = document.querySelector('main'),
            headerHeight = header.offsetHeight + parseInt(getComputedStyle(header).marginBottom),
            sticky = headerContent.offsetTop;

        window.onscroll = function () {
            if (window.scrollY > sticky) {
                header.classList.add('fixed');
                content.style.paddingTop = headerHeight + 'px';
            } else {
                header.classList.remove('fixed');
                content.style.paddingTop = '0px';
            }
        };
    }
    fixedHeader();

    //burger
    const burgerMenuButton = document.querySelector('.header__mobile-burger');
    const closeBurgerButton = document.querySelector('.header__mobile-burger-menu .close');

    burgerMenuButton.addEventListener('click', () => {
        $('.header__mobile-burger-menu').addClass('--active');
        $('body').addClass('locked');
        $('.header').css({
            height: '100vh'
        });
    });

    closeBurgerButton.addEventListener('click', () => {
        $('.header__mobile-burger-menu').removeClass('--active');
        $('body').removeClass('locked');
        $('.header').css({
            height: 'auto'
        });
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
                $('body').width($(document).width()).addClass('locked');
            });
        });
        $(close).on('click', () => {
            modalBody.classList.remove('--active');
            modal.classList.remove('--active');
            $('body').width('').removeClass('locked');
        });
        $(modal).on('click', (e) => {
            if (e.target === modal) {
                modalBody.classList.remove('--active');
                modal.classList.remove('--active');
                $('body').width('').removeClass('locked');
            }
        });

        callback();
    }

    bindModal('.success-button', '#success-modal', '#success-modal .modal__close', closeModalOnButtonClick);
    bindModal(
        '.question-button',
        '#question-modal',
        '#question-modal .modal__close',
        closeModalOnButtonClick
    );

    function closeModalOnButtonClick() {
        const button = $('.close-modal-button');

        button.on('click', () => {
            $('#success-modal').removeClass('--active');
            $('#success-modal .modal').removeClass('--active');
            $('body').removeClass('locked');
        });
    }

    //card rotate
    const cards = document.querySelectorAll('.card-rotate');

    [...cards].forEach((card) => {
        card.addEventListener('click', function () {
            card.classList.toggle('is-flipped');
        });
    });
    //footer dropdown

    const footerItems = document.querySelectorAll('.footer__nav-list-item-dropdown');

    footerItems.forEach((item) => {
        item.addEventListener('click', function () {
            const dropdownFooter = item.closest('.footer__nav-list-item').querySelector('.footer__nav__dropdown-list'),
                dropdownFooterArrow = item.querySelector('.footer__nav__dropdown-list-icon');
            console.log(item);
            $(dropdownFooter).toggleClass('open');

            if ($(dropdownFooter).hasClass('open')) {
                $(dropdownFooterArrow).addClass('rotate');
                $(dropdownFooter).slideDown('slow');
            } else {
                $(dropdownFooterArrow).removeClass('rotate');
                $(dropdownFooter).slideUp('slow');
            }
        });
    });
});
