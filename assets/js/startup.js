function getDate(dateOptions) {
  if (dateOptions === undefined) {
    dateOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  }
  const formattedDate = new Date().toLocaleString('en-US', dateOptions).replace(',', '');
  return formattedDate;
}

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

document.body.onload = function () {
  saveBootTime();
  console.log(getUptime());
  setDesktopClock();
};
