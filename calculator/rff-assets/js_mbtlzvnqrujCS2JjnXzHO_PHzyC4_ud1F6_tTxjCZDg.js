/**
 * @file
 * Theme JavaScript.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.filter_expand = {
    attach: function(context, settings) {
      // Show/collapse fuctionality for the publication landing filters.
      $('.filter-title').click(function(e) {
        e.preventDefault();

        if ($(window).width() < 700) {
          $(this).toggleClass('is-hidden');
          $(this).siblings('.list-filter--rail').toggleClass('is-hidden');
        }
      });
    }
  };

  Drupal.behaviors.subtopic_expand = {
    attach: function(context, settings) {
      // Show/collapse fuctionality for subtopic content lists that belong
      // to topics on the topic landing page.
      $('.topics__cta-reveal').click(function(e) {
        e.preventDefault();

        if ($(window).width() < 700) {
          $(this).toggleClass('is-active');
          $(this).siblings('.topics-list__content').toggleClass('is-active');
        }
      });
    }
  };

  Drupal.behaviors.footer_search = {
    attach: function(context, settings) {
      // Adjust footer search input placehoder text according to viewport.
      $(window).bind("load resize", function () {
        // We're using custom breakpoints that are better
        // tailored towards the responsive behavior instead of the breakpoint
        // values were using in init.scss for layout.
        
        // For larger viewports or when between 500px and 700px, display
        // a longer placeholder in the footer search input.
        if ($(window).width() > 1175 || $(window).width() >= 500 && $(window).width() < 700 ) {
          $('.footer-search__input').attr("placeholder", "Try a topic, a researcher's name, or a specific title.");
        }
        // On smaller viewports and mobile, display a shorter  placeholder.
        else {
          $('.footer-search__input').attr("placeholder", "Search RFF.");
        }
        if ($(window).width() > 1175 || $(window).width() >= 500 && $(window).width() < 700 ) {
          $('.footer-search__input').attr("placeholder", "Try a topic, a researcher's name, or a specific title.");
        }
        // On smaller viewports and mobile, display a shorter  placeholder.
        else {
          $('.footer-search__input').attr("placeholder", "Search RFF.");
        }
      });
    }
  };

})(jQuery, Drupal, this, this.document);
;
/**
 * @file
 * A JavaScript file for the magazine theme.
 *
 * @copyright Copyright (c) 2015 Palantir.net
 */

// open and close the navigation

(function ($, Drupal, window, document, undefined) {

    Drupal.behaviors.magazine_custom = {
        attach: function(context, settings) {
            if ($('.magazine').length > 0) {
                $('body').addClass('magazine');
            }

            var $pager = $('.pagination__item');
            if ($('.pagination__item').length > 0) {
                $('.pager').hide();

                $('.load-more__button').attr('href', $pager.attr('href'));
            }
        }
    };

    Drupal.behaviors.magazine_from_prototype = {
        attach: function(context, settings) {
            // Table of Contents
            $(document).ready(function($) {

                //Expand Table of Contents
                $('.toc-trigger').click(function(){

                    $(this).toggleClass("is-open");
                    $('.toc-drawer').toggleClass("is-open");

                    // close share if it is open
                    $('.share-drawer').removeClass("is-open");
                    $('.share-trigger').removeClass("is-open");

                });

                //Close Table of Contents
                $('.toc-drawer__close').click(function(){

                    $('.toc-drawer').removeClass("is-open");
                    $('.toc-trigger').removeClass("is-open");
                });

                //Close Table of Contents
                $('.toc-drawer__close--bottom').click(function(){

                    $('.toc-drawer').removeClass("is-open");
                    $('.toc-trigger').removeClass("is-open");
                });

                //Expand expand share and close table of contents
                $('.share-trigger').click(function(){

                    $(this).toggleClass("is-open");
                    $('.share-drawer').toggleClass("is-open");
                    $('.toc-drawer').removeClass("is-open");
                    $('.toc-trigger').removeClass("is-open");
                });

                $('.share-drawer__close').click(function(){
                    $('.share-drawer').removeClass("is-open");
                    $('.share-trigger').removeClass("is-open");
                });

                //Expand expand image caption
                $('.image-caption--trigger').click(function(){

                    $(this).toggleClass("is-open");
                    $('.image-caption--nested').toggleClass("is-open");
                });

                // Article Card hover Animation
                $('.article-card').hover(function(){
                    $(this).find('.article-card__drawer').slideDown('500');
                }, function() {
                    $(this).find('.article-card__drawer').slideUp('500');
                });
            });

            function scrollToAnchor(aid){
                var aTag = $("a[name='"+ aid +"']");
                $('html,body').animate({scrollTop: aTag.offset().top - 160}, '500');
            }

            $('.article-metadata__author').click(function(e) {
                e.preventDefault();
                scrollToAnchor('author-info');
            });

            // sticky header
            var StickyElement = function(node){
                var doc = $(document),
                    fixed = false,
                    anchor = node.find('.sticky-anchor'),
                    content = node.find('.sticky-content');

                var onScroll = function(e){
                    var docTop = doc.scrollTop(),
                        anchorTop = anchor.offset().top;

                    if(docTop > anchorTop){
                        if(!fixed){
                            content.addClass('fixed');
                            content.removeClass('is-hidden');
                            fixed = true;
                        }
                    }  else   {
                        if(fixed){
                            content.removeClass('fixed');
                            content.addClass('is-hidden');
                            fixed = false;
                        }
                    }
                };

                $(window).scroll(onScroll);
            };

            var demo = new StickyElement($('#sticky-header'));
            var demo = new StickyElement($('#sticky-article-header'));

            // Measure article header height and reposition
            function resizeArticle () {
                var $header = $('.article-header--image.position');
                var $hero = $('.article-hero');


                if ( $(window).width() > 700 ) {

                    var headerHeight = $header.height();
                    var heroHeight = $hero.height();

                    if (headerHeight > heroHeight) {
                        $header.css('marginTop', - heroHeight);
                    } else {
                        $header.css('marginTop', - headerHeight);
                    }

                } else {
                    $hero.removeAttr('style');
                }
            }

            $(document).ready(function () {
                resizeArticle();
            });
            $(window).resize(function () {
                resizeArticle();
            });
            $( window ).load(function() {
                resizeArticle();
            });
        }
    };
})(jQuery, Drupal, this, this.document);;
/**
 * @file
 * RFF Fonts.com tracking javascript file.
 */

(function ($, Drupal, window, document, undefined) {

Drupal.behaviors.RffTheme = {
  attach: function(context, settings) {
    var MTIProjectId='60a979d6-a5f4-4957-895c-492086762cf3';
    (function() {
      var mtiTracking = document.createElement('script');
      mtiTracking.type='text/javascript';
      mtiTracking.async='true';
      mtiTracking.src=('/sites/all/themes/rff_theme/js/mtiFontTrackingCode.js');
      (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild( mtiTracking );
    })();
  }
};

})(jQuery, Drupal, this, this.document);
;
