(function(){
    function callback(entries, observer){
        entries.forEach(entry => {
            if (entry.isIntersecting){
                requestAnimationFrame(() => {
                    window._map.flyTo({
                        center: [-11.0813, 21.1456],
                        zoom: 3.9
                    });
                    observer.disconnect();
                })
            }
        })
    }
    const container = document.getElementById('map-cont');
    container?.insertAdjacentHTML('afterbegin','<div id="map-cont--inner"></div>');
    const timeout = setInterval(() => {
        console.log('nope');
        if (window.mapboxgl){
            console.log('yep');
            initMap()
        }
    })
    function initMap(){
        clearInterval(timeout);
        mapboxgl.accessToken = 'pk.eyJ1Ijoib3N0ZXJtYW5qIiwiYSI6ImNsOWl5NmF5ZTA4ODgzd28wczZ3bm9oYm0ifQ.qLNG2qiKlw8RkjFlHwsHhQ';
            window._map = new mapboxgl.Map({
            container: 'map-cont--inner', // container ID
            style: 'mapbox://styles/mapbox/satellite-streets-v11?optimize=true', // style URL
            center: [-100.4544, 37.0351], // starting position [lng, lat]
            // center: [-11.0813, 21.1456], // starting position [lng, lat]
            zoom: 1.256, // starting zoom
            minzoom: 1.256,
            maxzoom: 3.9,
            // zoom: 3.9, // starting zoom
            projection: 'globe' // display the map as a 3D globe
            });
        window._map.scrollZoom.disable();
        window._map.on('load', () => {
            const options = {
                root: null,
                threshold: 1
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(container);
        })
    }
})();