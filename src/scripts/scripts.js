// Requires

var $                    = require('jquery');
var jQBridget            = require('jquery-bridget');
var Flickity             = require('flickity');
var Isotope              = require('isotope-layout');

// jQueryfy

$.bridget('flickity', Flickity, $);
$.bridget('isotope', Isotope, $);

// Main

$(function() {

  'use strict';

  var $html              = $('html'),
      $body              = $('body');

  var $header            = $('.Header'),
      $headerButtonOpen  = $('.Header__Button--Open'),
      $headerButtonClose = $('.Header__Button--Close'),
      $headerNavItem     = $('.Header__Nav__Item a'),
      headerOpened       = 'Header--Opened',
      headerAlternative  = 'Header--Alternative';

  var $grid              = $('.Grid'),
      $gridItems         = $('.Grid__Items'),
      $gridFilter        = $('.Grid__Filter'),
      $gridButton        = $('.Grid__Button'),
      gridItem           = '.Grid__Item',
      gridSizer          = '.Grid__Sizer',
      gridGutter         = '.Grid__Gutter',
      gridButton         = '.Grid__Button',
      gridButtonActive   = 'Grid__Button--Active';

  var init = function() {
    $html.addClass('js');
    initHeader();
    initHeaderScroll();
    initHeaderNavScroll();
    initFlickity();
    initIsotope();
    initIsotopeVideo();
    initWorkVideo();
    initHoverScroll();
  };

  function initHeader() {

    $headerButtonOpen.click(function (event) {
      event.preventDefault();

      $header.addClass(headerOpened);
      console.log('nav is open');

      return false;
    });

    $headerButtonClose.click(function (event) {
      event.preventDefault();

      $header.removeClass(headerOpened);
      console.log('nav is closed');

      return false;
    });
    
    $headerNavItem.click(function () {
      $header.removeClass(headerOpened);
      console.log('nav is closed for opened link');
    });

    console.log('nav is on');
  };

  function initHeaderScroll() {

    function headerScroll() {

      var screenPosition = $(document).scrollTop(),
          elementTarget  = $('.Advent').offset().top,
          headerHeight   = $header.outerHeight();

      if (screenPosition > (elementTarget - headerHeight)) {
        $header.addClass(headerAlternative);
      } else {
        $header.removeClass(headerAlternative);
      }
    }

    $(document).ready(function() {
      $(window).scroll(function(){
        headerScroll();
      });

      $(window).resize(function () {
        headerScroll();
      });

      //call the scroll() event so that the proper one is highlighted at the start
      $(window).scroll();
    });

    console.log('header is on');

  };

  function initHeaderNavScroll() {
     
    // scroll handler
    var scrollToAnchor = function( id ) {
   
      // grab the element to scroll to based on the name
      var elem = $("a[name='"+ id +"']");
   
      // if that didn't work, look for an element with our ID
      if ( typeof( elem.offset() ) === "undefined" ) {
        elem = $("#"+id);
      }
   
      // if the destination element exists
      if ( typeof( elem.offset() ) !== "undefined" ) {
   
        // do the scroll
        $('html, body').animate({
          scrollTop: elem.offset().top - $gridFilter.height()
        }, 1000 );
   
      }
      
    };
   
    // bind to click event
    $headerNavItem.click(function(event) {

        // only do this if it's an anchor link
        if ( $(this).attr('href').match(/^#/) ) {
          event.preventDefault();

          // scroll to the location
          var href = $(this).attr('href').replace('#', '');
          scrollToAnchor(href);

          return false;
        }
     
      });

  }

  function initFlickity() {

    var $carousel = $('.Showcase').flickity(),
        flkty = $carousel.data('flickity');

    $carousel.on( 'select.flickity', function() {
      if (flkty.selectedIndex) {
        console.log('item selected!')
      };
    });

    // -------

    if ($('.Showcase__Item').hasClass('Showcase__Item--Video')) {
      console.log('ok');
    };
    
    if ($('.Showcase__Item').hasClass('is-selected')) {
      console.log(':)');
    };
    
    // devo fare event trigger if class changed e iniziare: playShowcaseVideo();

    function playShowcaseVideo() {
      if ($('.Showcase__Item--Video').hasClass('is-selected')) {
        $('video', this).get(0).play();
      } else {
        $('video', this).get(0).load();
      };
    };
    
    $('.Showcase__Item').on('event', function() {
      $(this).addClass('Showcase__Item--Start').trigger('classChange');
    });

    // in another js file, far, far away
    $('.Showcase__Item').on('classChange', function() {
      console.log('class has been added!');
    });

    $('.Showcase__Item--Video').hover(playVideo, stopVideo);

    function playVideo(e) {
      $('video', this).get(0).volume = 0;
      $('video', this).get(0).pause();
      $('video', this).get(0).play();
    }

    function stopVideo(e) {
      $('video', this).get(0).volume = 0;
      $('video', this).get(0).pause();
      $('video', this).get(0).load(); // meglio fare pause così non jumpa o altrimenti animazione fade
    }

    console.log('flickity is on');

  };

  function initIsotope() {

    var $grid = $gridItems.isotope({
      itemSelector: gridItem,
      percentPosition: true,
      masonry: {
        columnWidth: gridSizer,
        gutter: gridGutter
      },
      transitionDuration: 750,
      stagger: 30,
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      }
    });

    $gridFilter.on('click', gridButton, function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      $gridButton.removeClass(gridButtonActive);
      $(this).addClass(gridButtonActive);
    });

    console.log('isotope is on');
  };

  function initIsotopeVideo() {
    $('.Grid__Item--HasVideo').hover(playVideo, stopVideo);

    function playVideo() {
      $('video', this).get(0).play();
      console.log('Grid__Item--HasVideo has been hovered!');
    }

    function stopVideo() {
      $('video', this).get(0).pause();
      $('video', this).get(0).currentTime = 0;
      console.log('Grid__Item--HasVideo has been un-hovered!');
    }
  }

  function initWorkVideo() {

    $('.Work__Hero-Button').click(function (event) {
      event.preventDefault();

      $('.Work__Hero').addClass('Work__Hero--Playing');
      $('.Work__Hero-Video iframe').vimeo('play');

      return false;
    });
    
    $('.Work__Hero-Video iframe').on('pause', function() {
      $('.Work__Hero').removeClass('Work__Hero--Playing');
      $(this).vimeo('seekTo', 0);
    });
    
    $('.Work__Hero-Video iframe').on('finish', function() {
      $('.Work__Hero').removeClass('Work__Hero--Playing');
    });

  }

  function initHoverScroll() {

    var body = document.body,
        timer;

    window.addEventListener('scroll', function() {
      clearTimeout(timer);

      if( !body.classList.contains('Hover--Disable') ) {
        body.classList.add('Hover--Disable');
      }
      
      timer = setTimeout( function() {
        body.classList.remove('Hover--Disable');
      }, 500);
    }, false);

  }

  init();

});
