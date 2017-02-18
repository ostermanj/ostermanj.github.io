// js onclick for menu to avoid sticky hover on mobile    
    
    var menu = document.querySelector('.site-nav');
    var icon = document.querySelector('.menu-icon');
    
    icon.onclick = function(e){
        e.preventDefault(); // prevents 
    
        if (menu.className.indexOf('open') == -1){
            menu.className += ' open';
        } else {
            menu.className = menu.className.replace(' open','');
        }
    };
    
// adds tweet-this functionality
    
      var tweetSpans = document.querySelectorAll('.tweet-this');
      for (i = 0; i < tweetSpans.length; i++){
          tweetSpans[i].className += ' processed';
          var tweetLink = document.createElement('a');
          var tweetText = tweetSpans[i].innerText;
          tweetSpans[i].innerText = '';
          var tweetPath = encodeURIComponent 
          tweetLink.setAttribute('href','http://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(tweetText) + '&url=' + encodeURIComponent(window.location.href) + '&related=johnaosterman');
          tweetLink.innerHTML = tweetText;
          tweetSpans[i].appendChild(tweetLink);
      }


// add social shares hrefs

    var tweetShares = document.querySelectorAll('.twitter-share');
    for (i = 0; i < tweetShares.length; i++){
        tweetShares[i].onclick = function(e){
            e.preventDefault();
            window.open('http://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(document.title) + '&url=' + encodeURIComponent(window.location.href) + '&related=johnaosterman', null, 'left=20,top=20,width=700,height=400,toolbar=0,resizable=1');
        }
    }

    var fbookShares = document.querySelectorAll('.facebook-share');
    for (i = 0; i < fbookShares.length; i++){
        fbookShares[i].onclick = function(e){
            e.preventDefault();
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), null, 'left=20,top=20,width=700,height=400,toolbar=0,resizable=1');
        }
    }

    var linkedInShares = document.querySelectorAll('.linkedin-share');
    for (i = 0; i < linkedInShares.length; i++){
        linkedInShares[i].onclick = function(e){
            e.preventDefault();
            window.open('https://www.linkedin.com/cws/share?url=' + encodeURIComponent(window.location.href), null, 'left=20,top=20,width=700,height=400,toolbar=0,resizable=1');
        }
    }

// hide/show filter by tags on projects page
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, "-"));
}

window.onload = function(){
  if (location.pathname === '/projects/'){
    var filter = getParameterByName('tag');
    if (filter){
        console.log(filter);
        document.querySelector('.home').style.display = 'none';
        var filteredDivs = document.querySelectorAll('.tag-filtered');
        for (i = 0; i < filteredDivs.length; i++){
            filteredDivs[i].style.display = 'none';
          }
          document.getElementById('tag-' + filter).style.display = 'block';
      }
    }
}

function showAll(){
  if (location.pathname === '/projects/'){
    window.location.href = '/projects/';
  }
}

// plain vanilla animated scrolltop courtesy http://stackoverflow.com/a/24559613/5701184 but changed scrollY to pageYOffset for better IE support

    function scrollToTop(e, scrollDuration) {
        console.log('click');
        console.log(e);
        e.preventDefault();
         var scrollStep = -window.pageYOffset / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
            if ( window.pageYOffset != 0 ) {
                window.scrollBy( 0, scrollStep );
            }
            else clearInterval(scrollInterval); 
        },15);
    }