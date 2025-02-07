import { openConsole } from './imports/terminal/terminal-console.v2.js';
import { openNotepad } from './imports/notepad/notepad.js';
import { StartMenu } from './imports/startmenu/startmenu.v2.js';

function openStartMenu() {
  let existStartMenu = document.getElementById('startmenu');
  if (existStartMenu) {
    desktop.removeChild(existStartMenu);
  } else {
    console.log('start menu Open');

    let startmenu = new StartMenu().startmenu;
    console.log(startmenu);

    startmenu.addEventListener('click', function (event) {
      event.stopPropagation();
      //prevent close startmenu when click on it
    });

    let desktop = document.getElementById('desktop');
    desktop.appendChild(startmenu);
  }
}

//calls from startmenu accessible from body HTML
window.openStartMenu = openStartMenu;
window.openConsole = openConsole;
window.openNotepad = openNotepad;
//For development purposes
//openNotepad();
