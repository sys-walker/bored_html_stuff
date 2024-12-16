import { Storage } from '../storage.js';
import { TerminalCommands } from './terminal-commands.js';
import { createWindowHeader, setDraggable } from '../window-app.js';
import { getDate, getUptime, N_HOST, USER_LOGGED, CURRENT_DIRECTORY, USER_LOGGED_SYMBOL } from '../system.js';
/*

Create terminal console window with draggable functionality
<div class="terminal">
<div class="header-console">
  <div class="buttons-slot">
    <div class="dot red" onclick="closeWindow(this)"></div>
    <div class="dot orange"></div>
    <div class="dot green"></div>
  </div>
</div>
<div class="console"></div>
</div> 

*/
export function openConsole() {
  let windowApp = _createTerminalWindow('Terminal console');
  let desktop = document.getElementById('desktop');
  desktop.appendChild(windowApp);
}

function _createTerminalWindow(appTitle) {
  let windowApp = document.createElement('div');
  windowApp.className = 'window-app';
  windowApp.style.position = 'absolute';
  windowApp.style.setProperty('--initial-window-height', '200px');
  windowApp.style.setProperty('--initial-window-width', '350px');

  let windowHeader = createWindowHeader(appTitle);
  let windowContent = _createTerminalConsole();

  windowApp.appendChild(windowHeader);
  windowApp.appendChild(windowContent);

  setDraggable(windowApp);
  return windowApp;
}

function _createTerminalConsole() {
  let consoleContent = document.createElement('div');
  consoleContent.className = 'window-console';
  consoleContent.appendChild(_createLastLoginLine());
  consoleContent.appendChild(_createFirstPromptLine());

  consoleContent.onclick = function () {
    _writableTerminal(consoleContent);
  };

  return consoleContent;
}

function _createLastLoginLine() {
  let lastloginContainer = document.createElement('div');
  lastloginContainer.style.display = 'flex';
  lastloginContainer.style.flexDirection = 'row';
  lastloginContainer.style.flexWrap = 'wrap';

  lastloginContainer.innerHTML = `
    <p
      style="
        color:#4AF626;
        margin:0px;
        font-family:monospace
      "
    >Last login ${_getLastLogin()} on ttys004</p>
  `;
  return lastloginContainer;
}
var PROMPT_CONSOLE = `${USER_LOGGED}@${N_HOST} ${CURRENT_DIRECTORY} ${USER_LOGGED_SYMBOL} `;
function _createFirstPromptLine() {
  let lastloginContainer = document.createElement('div');
  lastloginContainer.style.display = 'flex';
  lastloginContainer.style.flexDirection = 'row';
  lastloginContainer.style.flexWrap = 'wrap';

  lastloginContainer.innerHTML = `
    <p
      style="
        color:#4AF626;
        margin:0px;
        font-family:monospace
      "
    >${PROMPT_CONSOLE}</p>
  `;
  return lastloginContainer;
}

function _getLastLogin() {
  let lastLogin = Storage.getItem('shell-login-date');
  let newLogin = new Date()
    .toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    })
    .replace(/,/g, '');

  Storage.setItem('shell-login-date', newLogin);
  return lastLogin ? lastLogin : newLogin;
}

function _writableTerminal(consoleContent) {
  let cmd = ''; //buffer of keyinput
  let completeLine = '';
  let originalALstLogin = consoleContent.innerHTML;

  consoleContent.onclick = function () {
    consoleContent.tabIndex = 0;

    consoleContent.onkeydown = function (e) {
      let cleared = false;
      if (e.key === 'Enter') {
        completeLine = completeLine.replace(PROMPT_CONSOLE, '').replace(/^\s+|\s+$/g, '');
        console.log(completeLine, cmd);

        cleared = handleConsoleCommands(completeLine, consoleContent, originalALstLogin);

        cmd = '';
        completeLine = '';

        if (!cleared) {
          printLineTerminal(``, consoleContent, false);
          cleared = false;
        }

        let newChildP = _createFirstPromptLine();
        consoleContent.appendChild(newChildP);
      } else if (e.key === 'Backspace') {
        completeLine = '';
        cmd = cmd.slice(0, -1);
        completeLine = PROMPT_CONSOLE + cmd;
        writeOnWrite(consoleContent, completeLine);
      } else {
        cmd += e.key;
        completeLine = PROMPT_CONSOLE + cmd;
        writeOnWrite(consoleContent, completeLine);
      }
    };

    console.log('clicked');
    consoleContent.focus();
  };
}

function writeOnWrite(consoleContent, completeLine) {
  let linesArr = consoleContent.getElementsByTagName('div');
  let oldLastChild = linesArr[linesArr.length - 1];
  let newChild = linesArr[linesArr.length - 1].cloneNode(true);
  consoleContent.removeChild(oldLastChild);
  let newChildP = newChild.getElementsByTagName('p')[0];
  newChildP.innerHTML = completeLine;
  consoleContent.appendChild(newChild);
}

function printLineTerminal(text, consoleContent, visible = true) {
  let newLine = `
          <div style="display: flex; flex-flow: wrap;">
            <p style="
                color: ${visible ? '#4AF626' : 'transparent'};
                margin:0px;
                font-family:monospace
              ">${visible ? text : '&nbsp;'}</p></div>
              
        `;

  consoleContent.innerHTML = consoleContent.innerHTML + newLine;
}

function handleConsoleCommands(completeLine, consoleContent, originalALstLogin) {
  let cleared = false;
  switch (completeLine) {
    case 'clear':
      consoleContent.innerHTML = '';
      originalALstLogin = '';
      cleared = true;
      break;
    case 'exit':
      desktop = doletcument.getElementById('desktop');
      desktop.removeChild(this.parentElement);
      break;
    case 'uptime':
      printLineTerminal(TerminalCommands.uptime_str(), consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case '':
      cleared = true;
      break;
    case 'neofetch':
      TerminalCommands.neofetch(consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case 'pwd':
      printLineTerminal(`/root`, consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case 'ls':
      originalALstLogin = consoleContent.innerHTML;
      break;
    case 'help':
      printLineTerminal('Supported commands: exit, uptime, neofetch, pwd', consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    default:
      printLineTerminal(`esh: command not found: ${completeLine}`, consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
  }
  return cleared;
}
