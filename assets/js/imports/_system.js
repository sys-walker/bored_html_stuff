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

export function getDate(dateOptions) {
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

export function neofetchCommand() {
  return `
  OS: ${navigator.platform}
  Hostname: ${navigator.userAgent}
  Kernel: ${navigator.appVersion}
  Uptime: ${getUptime()}
  `;
}

export const N_OS = 'ExperimentOS';
export const N_HOST = 'Bored';
export const N_KERNEL = 'Bored';
//uptime
export const N_PACKAGES = 'none';
export const N_SHELL = 'esh 1.0';
export const N_RESOLUTION = `${window.screen.width}x${window.screen.height}`;
export const N_DE = 'none';
export const N_WM = 'none';
export const N_THEME = 'none';
export const N_TERMINAL = 'none';
export const N_TERMINAL_FONT = 'none';
export const N_CPU = 'none';
export const N_GPU = 'none';
export const N_MEMORY = 'none';
