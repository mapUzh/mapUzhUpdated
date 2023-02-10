function resizeTooltip() {

    let tooltips = document.querySelectorAll('.leaflet-tooltip-top');
    tooltips.forEach(tooltip => {
        tooltip.style.marginTop = '-50px'

        tooltip.style.fontSize = '1.5vh'
    })

    let markers = document.querySelectorAll('.leaflet-marker-pane');
    markers.forEach(marker => {

        marker.style.marginTop = '65px';
    })
}
export {resizeTooltip}