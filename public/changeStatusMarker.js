import {map} from './getSelfPosition.js';
import {getAllCoords} from "./getAllcoords.js";

let tooltip;

const hideMenu = () => {
    document.getElementById('bottomPanel').style.bottom = '-10vh'
}
map.on('zoomstart', hideMenu)

let event2;
function changeStatus(ev) {
     event2 =  ev;
    document.getElementById('bottomPanel').style.bottom = '0';
    map.off('zoomstart', hideMenu)
    if (tooltip !== undefined) {
        tooltip.lastChild.style.transform = 'scale(1)'
    }
    tooltip = document.getElementById(`leaflet-tooltip-${ev.layer._tooltip._leaflet_id}`);
    tooltip.lastChild.style.transform = 'scale(1.5)'




    document.getElementById('bottomPanel').addEventListener('click', status)

}

const status = (event) => {



    console.log(Number(tooltip.lastChild.lastChild.firstChild.textContent))

    if (event.target.id === 'approvedButton') {

        document.getElementById('bottomPanel').removeEventListener('click', status)
        $.post("/changeRate", {
            coord: JSON.stringify(event2.layer._latlng),
            up: true,
        })

        tooltip.lastChild.style.transform = 'scale(1)'
        if(tooltip.lastChild.firstChild.className !== 'ok' &&
            tooltip.lastChild.firstChild.className !== 'not-approved') {
            if (tooltip.lastChild.lastChild.firstChild.textContent >= 2) {
                tooltip.lastChild.firstChild.className = 'ok';
                tooltip.lastChild.firstChild.firstChild.className = 'done';
            }
        }
        console.log(tooltip.lastChild.lastChild.firstChild)
        tooltip.lastChild.lastChild.firstChild.textContent = Number(tooltip.lastChild.lastChild.firstChild.textContent) + 1
        map.on('zoomstart', hideMenu)
    }
    else if (event.target.id === 'rejectButton'){
        document.getElementById('bottomPanel').removeEventListener('click', status)
        $.post("/changeRate", {
            coord: JSON.stringify(event2.layer._latlng),
            up: false,
        })

        tooltip.lastChild.style.transform = 'scale(1)'
        if(tooltip.lastChild.firstChild.className !== 'ok' &&
            tooltip.lastChild.firstChild.className !== 'not-approved') {
            if (tooltip.lastChild.lastChild.lastChild.textContent >= 2) {
                tooltip.lastChild.firstChild.className = 'not-approved';
                tooltip.lastChild.firstChild.firstChild.className = 'reject';
            }
        }

        tooltip.lastChild.lastChild.lastChild.textContent = Number(tooltip.lastChild.lastChild.lastChild.textContent) + 1

        map.on('zoomstart', hideMenu)
    }

}


export {changeStatus};