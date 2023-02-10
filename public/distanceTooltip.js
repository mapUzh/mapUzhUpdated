let tooltipContainer = document.createElement('div');
tooltipContainer.classList.add('tooltip-container-distance')
function showTooltip() {


    let tooltip = document.createElement('div');
    tooltip.classList.add('distance-tooltip');
    tooltip.textContent = 'Ви знаходитеся занадто далеко :('
    tooltipContainer.append(tooltip)
    document.body.append(tooltipContainer);


    setTimeout(() => {
        tooltip.style.transform = 'translateY(-15vh)';
        setTimeout(() => {
            tooltip.remove();
        }, 1000);

    }, 2000);

    tooltip.addEventListener('click', e => {
        e.target.remove();
    });

}
export {showTooltip}