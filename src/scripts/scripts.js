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
  
  var $body              = $('body');
  
  var $header            = $('.Header'),
      $headerButtonOpen  = $('.Header__Button--Open'),
      $headerButtonClose = $('.Header__Button--Close'),
      headerOpened       = 'Header--Opened';

  var $grid              = $('.Grid'),
      $gridItems         = $('.Grid__Items'),
      $gridItem          = $('.Grid__Item');

  var init = function() {
    $body.addClass('js');
    initNav();
    initFlickity();
    initIsotope();
    initIsotopeVideo();
  };
  
  function initNav() {

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

    console.log('nav is on');
  };
  
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

    var $grid = $('.Grid__Items').isotope({
      itemSelector: '.Grid__Item',
      percentPosition: true,
      masonry: {
        columnWidth: '.Grid__Sizer',
        gutter: '.Grid__Gutter'
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

    $('.Grid__Filter').on('click', '.Grid__Button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      $('.Grid__Button').removeClass('Grid__Button--Active');
      $(this).addClass('Grid__Button--Active');
    });

    console.log('isotope is on');
  };

  function initIsotopeVideo() {
    $('.Grid__Item--HasVideo').hover(playVideo, stopVideo);

    function playVideo(e) {
      $('video', this).get(0).play();
    }

    function stopVideo(e) {
      $('video', this).get(0).pause();
      $('video', this).get(0).currentTime = 0;
    }
  }

  init();

});
