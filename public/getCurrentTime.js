function getCurrentTime() {
    let date = new Date()
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = hour + ':' + minutes + ':' + seconds;
    let secLeft = Math.round(date.getTime() / 1000)
    return secLeft;


}
export {getCurrentTime}