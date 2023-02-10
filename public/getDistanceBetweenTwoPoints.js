import {getSelfCoords} from './getSelfPosition.js';

function getDistanceBetweenTwoPoints(coordsOfTarget){
    return new Promise(resolve => {
        let [lat, long] = getSelfCoords();
        let lat2 = coordsOfTarget.lat;
        let long2 = coordsOfTarget.lng;

        let distance = Math.sqrt( (((lat2 - lat)**2) + ((long2 - long)**2)) )
        let distanceInMeter = distance * 100000;
        resolve(distanceInMeter);
    })
}
export {getDistanceBetweenTwoPoints}