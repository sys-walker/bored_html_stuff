function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

function saveBootTime() {
  let bootTime = storage_getItem('boot-time');
  if (!bootTime) {
    bootTime = getTimestampInSeconds();
    storage_setItem('boot-time', bootTime);
    console.debug('saved boot time');
  } else {
    console.debug('already sdaved boot time');
  }
}

function getUptime() {
  let currentTime = getTimestampInSeconds();
  let bootTime = storage_getItem('boot-time');
  if (!bootTime) {
    bootTime = currentTime;
  }
  let totalTime = currentTime - bootTime;
  let days = Math.floor(totalTime / 86400);
  let hours = Math.floor((totalTime % 86400) / 3600);
  let minutes = Math.floor(((totalTime % 86400) % 3600) / 60);
  let seconds = ((totalTime % 86400) % 3600) % 60;
  let uptime = '';

  if (days > 0) {
    uptime += days + ' days ';
  }
  if (hours > 0) {
    uptime += hours + ' hours ';
  }
  if (minutes > 0) {
    uptime += minutes + ' minutes ';
  }
  if (seconds > 0) {
    uptime += seconds + ' seconds ';
  } else {
    if (totalTime === 0) {
      uptime += '0 seconds ';
    }
  }
  return uptime;
}

