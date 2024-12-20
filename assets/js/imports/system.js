import { Storage } from './storage.js';
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
export const N_TERMINAL = 'ETerm';
export const N_TERMINAL_FONT = 'monospace';
export const N_CPU = 'none';
export const N_GPU = 'none';
export const N_MEMORY = 'none';

export let USER_LOGGED = 'root';
export let USER_HOME_DIRECTORY = '/root';
export let CURRENT_DIRECTORY = '/root';
export let USER_LOGGED_SYMBOL = '#';

export function normalizePath(path) {
  if (path === '/') {
    return '/';
  }
  path = path.replace(/\/+$/, '');

  path = path.startsWith('/') ? path : CURRENT_DIRECTORY + '/' + path;

  let pathArr = path.split('/');
  let normalizedPathArr = [];
  pathArr.forEach((val) => {
    if (val == '' || val != '.') {
      normalizedPathArr.push(val);
    }
  });

  let count = normalizedPathArr.reduce((acc, val) => acc + (val === '..'), 0);

  if (count != 0) {
    normalizedPathArr.splice(-(count * 2));
  }

  let normalizedPath = normalizedPathArr.join('/');

  return normalizedPath === '' ? '/' : normalizedPath;
}



export class SystemCommands {
  static changeDirectory(newPath) {
    console.log('Changed directory', CURRENT_DIRECTORY + ' -> ' + newPath);
    CURRENT_DIRECTORY = newPath;
  }
  static getPrompt(){
    return `${USER_LOGGED}@${N_HOST} ${CURRENT_DIRECTORY} ${USER_LOGGED_SYMBOL} `;
  }
}
