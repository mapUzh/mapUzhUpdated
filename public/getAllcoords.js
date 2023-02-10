import {someFunction} from "./pushMarker.js";

function getAllCoords() {
    fetch('/getAllCoords')
        .then(res => res.json())
        .then((res) => {
            const markers = res;
            markers.forEach(marker => {
                someFunction(marker.coord, marker.timer, marker.timeInMoment, marker.status1, marker.status2, marker.uprate, marker.downrate)
            })

        });
}
getAllCoords();

export {getAllCoords};