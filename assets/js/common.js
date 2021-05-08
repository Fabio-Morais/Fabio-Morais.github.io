/*
 * Author: ArtStyles (ArtTemplate)
 * Template Name: vCard
 * Version: 1.0.3
*/

$(document).ready(function () {

    'use strict';

    /*-----------------------------------------------------------------
      Detect device mobile
    -------------------------------------------------------------------*/

    var isMobile = false;
    if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('touch');
        isMobile = true;
    }
    else {
        $('html').addClass('no-touch');
        isMobile = false;
    }


    /*-----------------------------------------------------------------
      Loaded
    -------------------------------------------------------------------*/

    anime({
        targets: 'body',
        opacity: 1,
        delay: 400,
        complete: function (anim) {
            progressBar(); //Init progress bar
            AOS.init({ once: true });

        }
    });

    $('body, .js-img-load').imagesLoaded({ background: !0 }).always(function (instance) {
        preloader(); //Init preloader

    });

    function preloader() {
        var tl = anime.timeline({});
        tl
            .add({
                targets: '.preloader',
                duration: 1,
                opacity: 1
            })
            .add({
                targets: '.circle-pulse',
                duration: 300,
                //delay: 500,
                opacity: 1,
                zIndex: '-1',
                easing: 'easeInOutQuart'
            }, '+=500')
            .add({
                targets: '.preloader__progress span',
                duration: 500,
                width: '100%',
                easing: 'easeInOutQuart'
            }, '-=500')
            .add({
                targets: '.preloader',
                duration: 500,
                opacity: 0,
                zIndex: '-1',
                easing: 'easeInOutQuart'
            });
    };


    /*-----------------------------------------------------------------
      Hamburger
    -------------------------------------------------------------------*/

    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');
        $('.inner-menu').toggleClass('is-active');
        $('body').toggleClass('open-menu');
    });


    /*-----------------------------------------------------------------
      Nav
    -------------------------------------------------------------------*/

    var sideNavOpen = $('.hamburger');
    var sideNavTl = anime.timeline({ autoplay: false });

    if (window.matchMedia("(max-width: 580px)").matches) {
        $('.js-menu').each(function (i) {
            sideNavTl
                .add({
                    targets: '.nav',
                    duration: 1000,
                    width: ['0', '100%'],
                    opacity: [0, 1],
                    easing: 'easeInOutBack'
                })
                .add({
                    targets: '.nav__item',
                    duration: 200,
                    delay: anime.stagger(50),
                    opacity: [0, 1],
                    translateX: [70, 0],
                    easing: 'easeInOutBack'
                }, '-=500');
        });
    } else {
        $('.js-menu').each(function (i) {
            sideNavTl
                .add({
                    targets: '.nav',
                    duration: 1000,
                    width: ['0', '100%'],
                    easing: 'easeInOutBack'
                })
                .add({
                    targets: '.nav__item',
                    duration: 200,
                    delay: anime.stagger(50),
                    opacity: [0, 1],
                    translateX: [70, 0],
                    easing: 'easeInOutBack'
                }, '-=500');
        });
    }

    $(sideNavOpen).on('click', function (e) {
        e.preventDefault();
        if (sideNavTl.began) {
            sideNavTl.reverse()
            sideNavTl.completed = false;
        }
        if (sideNavTl.paused) {
            sideNavTl.play()
        }
    });


    /*-----------------------------------------------------------------
      Carousel
    -------------------------------------------------------------------*/

    // Testimonials
    $('.js-carousel-review').each(function () {
        var carousel = new Swiper('.js-carousel-review', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 300,
            grabCursor: true,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                580: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                991: {
                    slidesPerView: 1
                }
            }
        });
    });

    // Clients
    $('.js-carousel-clients').each(function () {
        var carousel = new Swiper('.js-carousel-clients', {
            slidesPerView: 3,
            spaceBetween: 40,
            //loop: true,
            grabCursor: true,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                580: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    });


    /*-----------------------------------------------------------------
      Sticky sidebar
    -------------------------------------------------------------------*/

    function activeStickyKit() {
        $('.sticky-column').stick_in_parent({
            parent: '.sticky-parent',
            offset_top: 15,
            spacer: ".sticky-spacer"
        });
        // bootstrap col position
        $('.sticky-column')
            .on('sticky_kit:bottom', function (e) {
                $(this).parent().css('position', 'static');
            })
            .on('sticky_kit:unbottom', function (e) {
                $(this).parent().css('position', 'relative');
            });
    };
    activeStickyKit();

    function detachStickyKit() {
        $('.sticky-column').trigger("sticky_kit:detach");
    };

    //  stop sticky kit
    //  based on your window width

    var screen = 790;//height
    var screen2 = 1200;//width

    var windowHeight, windowWidth;
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    if ((windowWidth < screen2 || windowHeight < screen)) {
        detachStickyKit();
    } else {
        activeStickyKit();
    }

    // windowSize
    // window resize
    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).resize(debounce(function () {
        windowSize();
        $(document.body).trigger("sticky_kit:recalc");
        if (windowWidth < screen2 || windowHeight < screen) {
            detachStickyKit();
        } else {
            activeStickyKit();
        }

    }, 250));


    /*-----------------------------------------------------------------
      Progress bar
    -------------------------------------------------------------------*/

    function progressBar() {
        $('.progress').each(function () {
            var ctrl = new ScrollMagic.Controller();
            new ScrollMagic.Scene({
                triggerElement: '.progress',
                triggerHook: 'onEnter',
                duration: 300
            })
                .addTo(ctrl)
                .on("enter", function (e) {
                    var progressBar = $('.progress-bar');
                    progressBar.each(function (indx) {
                        $(this).css({ 'width': $(this).attr('aria-valuenow') + '%', 'z-index': '2' });

                    });
                });
        });
    }


    /*-----------------------------------------------------------------
      Scroll indicator
    -------------------------------------------------------------------*/

    function scrollIndicator() {
        $(window).on('scroll', function () {
            var wintop = $(window).scrollTop(), docheight =
                $(document).height(), winheight = $(window).height();
            var scrolled = (wintop / (docheight - winheight)) * 100;
            $('.scroll-line').css('width', (scrolled + '%'));
        });
    }

    scrollIndicator(); //Init


    /*-----------------------------------------------------------------
      ScrollTo
    -------------------------------------------------------------------*/

    function scrollToTop() {
        var $backToTop = $('.back-to-top'),
            $showBackTotop = $(window).height();

        $backToTop.hide();


        $(window).scroll(function () {
            var windowScrollTop = $(window).scrollTop();
            if (windowScrollTop > $showBackTotop) {
                $backToTop.fadeIn('slow');
            } else {
                $backToTop.fadeOut('slow');
            }
        });

        $backToTop.on('click', function (e) {
            e.preventDefault();
            $(' body, html ').animate({ scrollTop: 0 }, 'slow');
        });
    }

    scrollToTop(); //Init


    /*-----------------------------------------------------------------
      Style background image
    -------------------------------------------------------------------*/

    $('.js-image').each(function () {
        var dataImage = $(this).attr('data-image');
        $(this).css('background-image', 'url(' + dataImage + ')');
    });


    /*-----------------------------------------------------------------
      Autoresize textarea
    -------------------------------------------------------------------*/

    $('textarea').each(function () {
        autosize(this);
    });


    /*-----------------------------------------------------------------
      Tabs
    -------------------------------------------------------------------*/

    $('.js-tabs').each(function () {
        $('.content .tabcontent').hide();
        $('.content .tabcontent:first').show();
        $('.nav .nav__item a').on('click', function () {
            console.log($(this))
            $('.nav .nav__item a').removeClass('active');
            $(this).addClass('active');
            var currentTab = $(this).attr('href');
            console.log(currentTab)
            $('.content .tabcontent').hide();
            $('html,body').animate({
                scrollTop: $(currentTab).offset().top
            }, 'slow');
            $portfolioMasonry.isotope({
                columnWidth: '.gallery-grid__item',
                gutter: '.gutter-sizer',
                isAnimated: true
            });
            $('.js-scroll').getNiceScroll().resize()
            return false;
        });

        // Mobile close menu
        var screenMobile = 580;

        windowWidth = $(window).width();
        if ((windowWidth < screenMobile)) {
            $('.nav .nav__item a').on('click', function (e) {
                e.preventDefault();
                $('.hamburger').removeClass('is-active');
                $('.inner-menu').removeClass('is-active');
                $('body').removeClass('open-menu');

                if (sideNavTl.began) {
                    sideNavTl.reverse()
                    sideNavTl.completed = false;
                }
                if (sideNavTl.paused) {
                    sideNavTl.play()
                }
            });
        } else {

        }
    });


    /*-----------------------------------------------------------------
      Tooltip
    -------------------------------------------------------------------*/

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });


    /*-----------------------------------------------------------------
      Switch categories & Filter mobile
    -------------------------------------------------------------------*/

    $('.select').on('click', '.placeholder', function () {
        var parent = $(this).closest('.select');
        if (!parent.hasClass('is-open')) {
            parent.addClass('is-open');
            $('.select.is-open').not(parent).removeClass('is-open');
        } else {
            parent.removeClass('is-open');
        }
    }).on('click', 'ul>li', function () {
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text($(this).text());
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));

        $('.filter__item').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');

        $('.js-filter-container').isotope({
            filter: selector
        });
        return false;
    });


    /*-----------------------------------------------------------------
      Masonry
    -------------------------------------------------------------------*/

    // Portfolio
    var $portfolioMasonry = $('.js-masonry').isotope({
        itemSelector: '.gallery-grid__item',
        layoutMode: 'fitRows',
        percentPosition: true,
        transitionDuration: '0.5s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },
        fitRows: {
            gutter: '.gutter-sizer'
        },
        masonry: {
            columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true
        }
    });

    $portfolioMasonry.imagesLoaded().progress(function () {
        $portfolioMasonry.isotope({
            columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true,
            layoutMode: 'fitRows',
            fitRows: {
                gutter: '.gutter-sizer'
            }
        });
    });


    /*-----------------------------------------------------------------
      niceScroll
    -------------------------------------------------------------------*/

    $('textarea').niceScroll({
        horizrailenabled: false
    });


    /*-----------------------------------------------------------------
      emoji add in textarea
    -------------------------------------------------------------------*/

    $(function () {
        $('.emoji-wrap img').on('click', function () {
            var emoji = $(this).attr('title');
            $('#commentForm').val($('#commentForm').val() + " " + emoji + " ");
        });
    });


    /*-----------------------------------------------------------------
      mediumZoom
    -------------------------------------------------------------------*/

    mediumZoom('[data-zoom]', {
        margin: 30
    });


    /*-----------------------------------------------------------------
      Lazyload
    -------------------------------------------------------------------*/

    lazySizes.init();


    /*-----------------------------------------------------------------
      Polyfill object-fit
    -------------------------------------------------------------------*/

    var $someImages = $('img.cover');
    objectFitImages($someImages);


    /*-----------------------------------------------------------------
      Contacts form
    -------------------------------------------------------------------*/

    $("#contact-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Please fill in the form...");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var name = $("#nameContact").val(),
            email = $("#emailContact").val(),
            message = $("#messageContact").val();

        var url = "assets/php/form-contact.php";

        $.ajax({
            type: "POST",
            url: url,
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success: function (text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $("#contact-form")[0].reset();
        submitMSG(true, "Thanks! Your message has been sent.");
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        var msgClasses;
        if (valid) {
            msgClasses = "validation-success";
        } else {
            msgClasses = "validation-danger";
        }
        $("#validator-contact").removeClass().addClass(msgClasses).text(msg);
    }
});


/*-----------------------------------------------------------------
  Change Active Menu Item on Page Scroll
-------------------------------------------------------------------*/
var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));
console.log(dir)
//just for the index
if (dir.length < 2) {
    // Cache selectors
    var topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            console.log($(this).attr("href"))

            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });
}


$(window).scroll(function () {
    if (dir.length < 2) {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 300;
        if ($(this).scrollTop() <= 200)
            var fromTop = $(this).scrollTop() + topMenuHeight

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
});




function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
var color = getCookie('color');

console.log(color)
aux = ""
if (dir.length > 2) {
    aux = "../"
}
var checkbox = document.querySelector('input[type="checkbox"]');
if (color == "true") {
    checkbox.checked = true
    $('head').append('<link rel="stylesheet" type="text/css" id="black" href="' + aux + 'assets/styles/style-dark.css">');
}

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        console.log('Checked');
        $('head').append('<link rel="stylesheet" type="text/css" id="black" href="' + aux + 'assets/styles/style-dark.css">');
    } else {
        $("#black").remove()
    }
    setCookie('color', "" + checkbox.checked, 7);
});
setCookie('color', "" + checkbox.checked, 7);
