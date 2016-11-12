// Requires

var $                   = require('jquery');
var jQBridget           = require('jquery-bridget');
var Flickity            = require('flickity');
var Isotope             = require('isotope-layout');

// jQueryfy

$.bridget('isotope', Isotope, $);

// Main

$(function() {

  'use strict';
  
  var $body             = $('body');
  
  var $header           = $('.Header'),
      headerOpened      = 'Header--Opened',
      $headerNav        = $('.Header__Nav'),
      $headerNavButton  = $('.Header__Nav__Button');
    
  var $grid             = $('.Grid'),
      $gridItems        = $('.Grid__Items'),
      $gridItem         = $('.Grid__Item');

  var init = function() {
    $body.addClass('js');
    initNav();
    initFlickity();
    initIsotope();
  };
  
  function initNav() {
    $headerNavButton.click(function (event) {
      event.preventDefault();
      
      $header.toggleClass(headerOpened);

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
