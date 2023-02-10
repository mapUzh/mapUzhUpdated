import {map} from "./getSelfPosition.js";
import {tiles} from "./getSelfPosition.js";

function drawArea(coord, time) {

    let arrayOfCircle = [
        {
            fillColor: 'red',
            color: 'red',
            radius: 50,
            opacity: 0.2,


        },
        {
            fillColor: 'orange',
            color: 'orange',
            radius: 100,
            opacity: 0.2,
        },
        {
            fillColor: 'yellow',
            color: 'yellow',
            radius: 150,
            opacity: 0.2,
        },
        {
            fillColor: 'lightgreen',
            color: 'lightgreen',
            radius: 200,
            opacity: 0.2,
        },
    ]
    arrayOfCircle.reverse().forEach(cirlce => {
        let circle = L.circle(JSON.parse(coord), {
            color: 'none',
            radius: cirlce.radius,
            fillColor: cirlce.fillColor,
            opacity: cirlce.opacity,
            fillOpacity: cirlce.opacity,

        }).addTo(map)
        setTimeout(() => {

            map.removeLayer(circle)
        }, `${time}000`)


    })


}
export {drawArea}