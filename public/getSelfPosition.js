const map = L.map('map').setView([48.613867, 22.265819], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,

}).addTo(map);

L.Control.geocoder().addTo(map);

let circle, lat, long, accuracy;

if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {

    navigator.geolocation.getCurrentPosition(getBound)

    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getSelfPosition)
    }, 1000);
}
;

function getSelfCoords(){
    return [lat, long];
}

function getBound(position) {
    getSelfPosition(position).then(
        res => map.setView(res, 20)
    )
}

function getSelfPosition(position) {
    return new Promise(resolve => {
        lat = position.coords.latitude
        long = position.coords.longitude
        accuracy = position.coords.accuracy
        console.log(lat, long)


        if (circle) {
            map.removeLayer(circle)
        }


        circle = L.circle([lat, long], {radius: 20})
        L.featureGroup([circle]).addTo(map)
        resolve([lat, long])
    })


}

export {map, tiles, getSelfCoords}