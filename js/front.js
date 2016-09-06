console.log(window.innerHeight);
var hero = document.getElementById('hero');
hero.style.height = window.innerHeight - 94 + 'px';
hero.style.paddingBottom = 0;

var tags = document.querySelectorAll('#hero-tagline div');
for (i = 0; i < tags.length; i++){
    

    tags[i].innerHTML = tags[i].innerHTML.replace(/(.)/g,'<span>$1</span>');
    for (j = 0; j < tags[i].querySelectorAll('span').length; j++ ){
        
      
        k = 0.5 + 0.5 * i + 0.02 * j;
        tags[i].querySelectorAll('span')[j].style.transitionDelay = k + 's';
        
     }
    tags[i].className = '';
    tags[i].style.right = i * 5 + 'px';
    
}


function processTaglines() {
    for (i = 0; i < tags.length; i++){
        for (j = 0; j < tags[i].querySelectorAll('span').length; j++ ){
            tags[i].querySelectorAll('span')[j].className = 'processed';
        }
    }
}

function toggleArrow(){
    ar = document.getElementById('arrow-down');
    setInterval(function(){
        if (ar.className.indexOf('off') !== -1){
            ar.className = 'arrow-down on'
        } else {
            ar.className = 'arrow-down off'
        }
    },1000);
}

window.setTimeout(function(){
    processTaglines();
},200);

window.setTimeout(function(){
    toggleArrow();
},2000);

function showContent(){
    var frontContent = document.getElementById('front-content');
    var body = document.getElementsByTagName('body')[0];
    body.className = 'flash';
    window.setTimeout(function(){
        body.className = '';
    },300);
    frontContent.style.opacity = '1';
}


function timer(){
    
var firstHead = document.getElementById('first-head');
var rect = firstHead.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50){
       
        showContent();
         clearInterval(checkScroll);
    }
}
var checkScroll = setInterval(function(){
    console.log('checking');
    timer(); 
},200);
