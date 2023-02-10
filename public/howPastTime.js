
import {getCurrentTime} from "./getCurrentTime.js";
const howPastTime = (time) =>{

      let res = getCurrentTime() - time;
      let minutesLeft = res / 60;
      if (minutesLeft > 1) {
          return `${Math.round(minutesLeft)} хв. тому`
      } else {
          return `${res} сек. тому`
      }



}
export {howPastTime}