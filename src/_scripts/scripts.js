$(function() {

  'use strict';
  
  var $body            = $('body'),
      $header          = $('.Header'),
      $headerNav       = $('.Header__Nav'),
      $headerNavButton = $('.Header__Nav__Button');
  
  var init = function() {
    $body.addClass('js');
    initNav();
  };
  
  function initNav() {
    $headerNavButton.click(function (event) {
      event.preventDefault();
      
      $header.toggleClass('Header--Opened');

      return false;
    });
  };

  init();

});
