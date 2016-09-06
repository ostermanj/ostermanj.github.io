var tags = document.querySelectorAll('.hero-tagline');

for (i = 0; i < tags.length; i++){
    tags[i].innerHTML = tags[i].innerHTML.replace(/(.)/g,'<span>$1</span>');
    for (j = 0; j < tags[i].querySelectorAll('span').length; j++ ){
        console.log(i);
        console.log(j);
        k = 0.5 + i / 2 + 0.01 * j;
        tags[i].querySelectorAll('span')[j].style.transitionDelay = k + 's';
        
     }
    tags[i].className = 'hero-tagline';
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