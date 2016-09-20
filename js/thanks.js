var url = window.location.href;
if (url.indexOf('?thanks') !== -1){
    document.getElementById('thanks').style.display  = 'block';
    document.getElementById('thanks').removeAttribute('hidden');
    
    setTimeout(function(){
           document.getElementById('thanks').className = 'processed';
    }, 200);
}