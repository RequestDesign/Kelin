// Custom scripts
document.addEventListener('DOMContentLoaded', function () {
    function setPhoneMask() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');

        phoneInputs.forEach((phoneInput) => {
            const im = new Inputmask('+ 7 ( 999 )  999 - 99 - 99');
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
            height: '100dvh'
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
    bindModal('.rewiews-button', '#rewiews-modal', '#rewiews-modal .modal__close', closeModalOnButtonClick);
    bindModal('.resume-button', '#resume-modal', '#resume-modal .modal__close', closeModalOnButtonClick);
    bindModal('.law-button', '#law-modal', '#law-modal .modal__close', closeModalOnButtonClick);
    bindModal('.share-button', '#share-modal', '#share-modal .modal__close', closeModalOnButtonClick);
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

    $('.law-button').click(function () {
        console.log($(this).attr('data-index'));
    });
    //footer dropdown
    const footerItems = document.querySelectorAll('.footer__nav-list-item-dropdown');

    footerItems.forEach((item) => {
        item.addEventListener('click', function () {
            const dropdownFooter = item
                    .closest('.footer__nav-list-item')
                    .querySelector('.footer__nav__dropdown-list'),
                dropdownFooterArrow = item.querySelector('.footer__nav__dropdown-list-icon');
            // console.log(item);
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

    //vilidation forms
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
        $(form).submit(function (event) {
            event.preventDefault();

            if (form.querySelector('input[id="name"]')) {
                const name = form.querySelector('input[id="name"]'),
                    nameValue = name.value;

                if (!nameValue) {
                    name.classList.add('not-valid');
                    addMess(name, 'Поле должно быть заполнено!');
                    return;
                }
                if (!isValidName(nameValue)) {
                    name.classList.add('not-valid');
                    addMess(name, 'Поле не может содержать эти символы!');
                    return;
                }
                removeMess(name);
                name.classList.remove('not-valid');
            }
            if (form.querySelector('input[id="tel"]')) {
                const phone = form.querySelector('input[id="tel"]'),
                    phoneValue = phone.value;

                if (!phoneValue) {
                    phone.classList.add('not-valid');
                    addMess(phone, 'Поле должно быть заполнено!');

                    return;
                }
                if (!isValidPhone(phoneValue)) {
                    phone.classList.add('not-valid');
                    addMess(phone, 'Поле не может иметь такой вид!');
                    return;
                }
                removeMess(phone);
                phone.classList.remove('not-valid');
            }
            if (form.querySelector('input[id="email"]')) {
                const mail = form.querySelector('input[id="email"]'),
                    mailValue = mail.value;

                if (!mailValue) {
                    mail.classList.add('not-valid');
                    addMess(mail, 'Поле должно быть заполнено!');
                    return;
                }
                if (!isValidMail(mailValue)) {
                    mail.classList.add('not-valid');
                    addMess(mail, 'Поле не может содержать эти символы!');
                    return;
                }
                removeMess(mail);
                mail.classList.remove('not-valid');
            }
            if (form.querySelector('input[id="comment"]')) {
                const comment = form.querySelector('input[id="comment"]'),
                    commentValue = comment.value;

                if (!commentValue) {
                    comment.classList.add('not-valid');
                    addMess(comment, 'Поле должно быть заполнено!');
                    return;
                }

                removeMess(comment);
                comment.classList.remove('not-valid');
            }
            const modalSuccess = document.querySelector('#success-modal'),
                modals = $('[id $="-modal"]');

            $(modals).removeClass('--active');
            modalSuccess.classList.add('--active');

            $('body').width($(document).width()).addClass('locked');

            // var formData = $(this).serialize(); // Собираем все данные из формы
            // $.ajax({
            //     type: 'POST', // Метод отправки
            //     url: 'public/script/send.php', // Путь до файла отправителя
            //     data: formData,
            //     success: function () {
            //         // Код в этом блоке выполняется при успешной отправке сообщения
            //         alert('Ваше сообщение отправлено!');
            //     }
            // });
        });
    });
    function addMess(elem, mess) {
        if ($(elem).next('.not-valid__mes').length) {
            $(elem).next('.not-valid__mes').text(mess);
            return;
        } else {
            $(elem).after(`<span class="not-valid__mes">${mess}</span>`);
        }
    }
    function removeMess(elem) {
        if ($(elem).next('.not-valid__mes').length) {
            $(elem).next('.not-valid__mes').remove();
        } else {
            return;
        }
    }
    function isValidName(name) {
        const pattern = /^[а-яёА-ЯЁ]+(\s?[а-яёА-ЯЁ]*)*$/;

        if (name.length >= 2) {
            return pattern.test(name);
        }
    }
    function isValidMail(mail) {
        const pattern =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

        return pattern.test(mail);
    }
    function isValidPhone(phone) {
        const pattern = /\+\s7\s\(\s\d{3}\s\)\s\s\d{3}\s-\s\d{2}\s-\s\d{2}/;
        if (pattern.test(phone)) {
            if (!phone.replace(/[^\d]/g, '').match(/123456789/)) {
                return !phone
                    .replace(/[^\d]/g, '')
                    .match(/0{10}|1{10}|2{10}|3{10}|4{10}|5{10}|6{10}|7{10}|8{10}|9{10}/);
            }
        }
    }

    //scroll to card
    $(`.spheres-list-item a`).click(function () {
        $('.spheres-card').removeClass('active');

        let href = $(this).attr('href');
        $(href).addClass('active');

        $('html, body').animate(
            {
                scrollTop: $(href).offset().top - $('header').outerHeight()
            },
            {
                duration: 0
            }
        );
        setTimeout(function () {
            $(href).removeClass('active');
        }, 1200);

        return false;
    });

    //video nodownload
    fsLightbox.props.onOpen = function () {
        const videos = document.querySelectorAll('video');

        videos.forEach((video) => {
            if (video) {
                video.setAttribute('controlsList', 'nodownload');
            }
        });
    };
});
