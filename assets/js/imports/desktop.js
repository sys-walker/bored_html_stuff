import { LStorage } from './os-core/storage/large-storage.js';
import { saveBootTime2, saveBootTime, getDate } from './os-core/system.js';

function setDesktopClock() {
  //Load time
  let timeElement = document.getElementById('timeval');
  timeElement.innerHTML = getDate();

  setInterval(function () {
    // Get the current date and time
    timeElement.innerHTML = getDate();
    timeElement.style.minWidth = window.getComputedStyle(timeElement).width;
  }, 1000);
}

export function autoHideElements() {
  let desktop = document.getElementById('desktop');
  desktop.addEventListener('click', function (e) {
    let existStartMenu = document.getElementById('startmenu');
    if (existStartMenu) {
      desktop.removeChild(existStartMenu);
    }
  });
}

export async function startDesktopElements() {
  await LStorage.init();
  saveBootTime();
  setDesktopClock();
  autoHideElements();
}
