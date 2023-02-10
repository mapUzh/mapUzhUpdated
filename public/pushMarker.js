import {map} from './getSelfPosition.js';
import {drawArea} from './drawArea.js';
import {howPastTime} from './howPastTime.js';
import {resizeTooltip} from './resizeTooltip.js';
import {getDistanceBetweenTwoPoints} from './getDistanceBetweenTwoPoints.js';
import {changeStatus} from './changeStatusMarker.js';
import {showTooltip} from './distanceTooltip.js';


let FeatureGroup = L.featureGroup().addTo(map).on('click', groupClick);

function groupClick(event) {





    getDistanceBetweenTwoPoints(event.layer._latlng)
        .then((distance) => {

            if (distance <= 150) {
                changeStatus(event);
            } else {
                showTooltip();
            }
        });

}

function someFunction(coord, time, timePast, status1, status2, uprate, downrate) {
    let timeInMoment = Math.round(new Date().getTime() / 1000);
    let count = 1800 - (timeInMoment - timePast);
    drawArea(coord, count);

    let LeafIcon = L.Icon.extend({
        options: {
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }
    });
    let greenIcon = new LeafIcon({
        iconUrl: 'https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1fa96.png',

    });
    //some

    let marker = L.marker(JSON.parse(coord), {
        height: '100px',
        icon: greenIcon,

    }).addTo(FeatureGroup);

    let icon = marker.options.icon;

    icon.options.iconSize = [60, 70];
    marker.setIcon(icon);


    marker.bindTooltip(`${howPastTime(timePast)}<div class="info-tooltip-cont"><div class= ${status1} ><div class=${status2}></div></div><div class="numberRate"><div class="green-numb">${uprate}</div><div class="grey-line">/</div><div class="red-numb">${downrate}</div></div></div>`,
        {
            permanent: true,
            direction: 'top',

        }
    );



   resizeTooltip();





    setTimeout(() => {
        map.removeLayer(marker);
    }, `${count}000`);



}

export {someFunction};
