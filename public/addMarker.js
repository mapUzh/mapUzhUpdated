
import {getCurrentTime} from "./getCurrentTime.js";
import {someFunction} from "./pushMarker.js";

const addMarker  = (e) => {
    let time = getCurrentTime();

    // let coord = e.latlng.toString().split(',');
    // let lat = coord[0].split('(');
    // let lng = coord[1].split(')');
    let coord = JSON.stringify(e.latlng)
    let timeInMoment = Math.round(new Date().getTime() / 1000)


    console.log(coord)

    $.post("/request", {
            coords: coord,
            countTime: 1800,
            timeInMoment: timeInMoment,
            status1: 'pending',
            status2: 'reject',
            uprate: 1,
            downrate: 2,
        }
    ).then(marker => someFunction(marker.coord, marker.timer, marker.timeInMoment, marker.status1, marker.status2, marker.uprate, marker.downrate) )

    // someFunction(coord, 1800, time)

}
export {addMarker}