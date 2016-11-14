// Requires

var $                    = require('jquery');
var jQBridget            = require('jquery-bridget');
var Flickity             = require('flickity');
var Isotope              = require('isotope-layout');

// jQueryfy

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
    console.log('flickity is on');
  };
  
  function initIsotope() {
    console.log('isotope is on');
  };

  init();

});
