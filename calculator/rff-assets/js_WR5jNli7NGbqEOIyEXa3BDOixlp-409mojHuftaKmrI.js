/**
* @file
* A JavaScript file for the Past Issues.
*
* It is loaded by the layout plugin.
*/

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.rff_menu = {
    attach: function(context, settings) {
      // Function for opening and closing the secondary navigation items.
      $('.nav__list-item', context).once().click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Find the ID of the top level link.
        var menuID = $(this).children('.nav__list-item-link').attr('id');
        // Remove the active class from the menu siblings incase they're open.
        $(this).siblings().children('.nav__list-item-link').removeClass('is-active');
        // Close all other secondary menus before opening a new one.
        $('.nav-mega').removeClass('is-active');
        // Check to see if the menu is already active.
        if (!$(this).children('.nav__list-item-link').hasClass('is-active')) {
          // Make the link appear active so it matches the opened secondary nav.
          $(this).children('.nav__list-item-link').toggleClass('is-active');
          // Toggle the active class on the div that has a partial ID match.
          $('div[id*=' + menuID + ']').toggleClass('is-active');
        }
        else {
          // If the secondary menu is already active, close it.
          $(this).children('.nav__list-item-link').removeClass('is-active');
        }
      });

      // Mobile menu collapse/expand.
      $('.mobile-nav__trigger', context).click(function(e) {
        e.preventDefault();
        $('.mobile-nav').toggleClass('is-active');
      });

      // Mobile menu drawers collapse/expand.
      $('.mobile-nav__list-item-link', context).click(function(e) {
        e.preventDefault();
        // Display the child items of this list item.
        $(this).parents('.mobile-nav__list-item').children('.nav-mega').toggleClass('is-active');
        // Add a class for rotating the arrow svg downward.
        $(this).toggleClass('is-active');
        // Close the other menus when a new menu is opened.
        $(this).parents('.mobile-nav__list-item').siblings('.mobile-nav__list-item').children().removeClass('is-active');
      });

    }
  };

  /**
   *   Provides show/hide for topic landing filters.
   */
  Drupal.behaviors.filter_collapse = {
    attach: function(context, settings) {
    
      $('.views-widget-filter-type_1 > label', context).click(function(e) {
        e.preventDefault();

        if($(window).width() < 600) {
          $(this).toggleClass('is-hidden');
          $(this).siblings('.views-widget').toggleClass('is-hidden');
          $('.list-filter--type').find('.views-submit-button').toggleClass('is-hidden');
        }
      });
    }
  };

})(jQuery, Drupal, this, this.document);
;
