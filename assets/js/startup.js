import { startDesktopElements } from './imports/desktop.js';
import { openConsole } from './imports/apps/terminal/terminal-console.v3.js';
import { openNotepad } from './imports/apps/notepad/notepad2.js';
import { openStartMenu } from './imports/startmenu/startmenu.v2.js';
import { incrementMonth, decrementMonth, currentMonth } from './imports/apps/calendar/Calendar.js';

import { FileSystem } from './imports/os-core/filesystem/filesystem.v2.js';

document.body.onload = async function () {
  await startDesktopElements();
};

//calls from startmenu accessible from body HTML
window.openStartMenu = openStartMenu;
window.openConsole = openConsole;
window.openNotepad = openNotepad;
//For development purposes
window.increment = incrementMonth;
window.decrement = decrementMonth;
currentMonth();

FileSystem.getLS('/home/user').then((res) => {
  console.log(res);
});
