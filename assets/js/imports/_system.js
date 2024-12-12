import { Storage } from './_storage.js';
export function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function saveBootTime() {
  let bootTime = Storage.getItem('boot-time');
  if (!bootTime) {
    bootTime = getTimestampInSeconds();
    Storage.setItem('boot-time', bootTime);
    console.debug('saved boot time');
  } else {
    console.debug('already sdaved boot time');
  }
}

export function getUptime() {
  let currentTime = getTimestampInSeconds();
  let bootTime = Storage.getItem('boot-time');
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

