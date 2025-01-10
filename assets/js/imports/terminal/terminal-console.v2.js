import { Storage } from '../storage.js';
import { TerminalCommands } from './terminal-commands.js';
import { createWindowHeader, setDraggable } from '../window-app.js';
import { CURRENT_DIRECTORY, USER_HOME_DIRECTORY, SystemCommands } from '../system.js';
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

  //consoleContent.onclick = function () {
  _writableTerminal(consoleContent);
  //};

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
    >${SystemCommands.getPrompt()}</p>
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
        completeLine = completeLine.replace(SystemCommands.getPrompt(), '').replace(/^\s+|\s+$/g, '');
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

        consoleContent.scrollTop = consoleContent.scrollHeight;
      } else if (e.key === 'Backspace') {
        completeLine = '';
        cmd = cmd.slice(0, -1);
        completeLine = SystemCommands.getPrompt() + cmd;
        writeOnWrite(consoleContent, completeLine);
      } else {
        cmd += e.key.length === 1 ? e.key : '';
        completeLine = SystemCommands.getPrompt() + cmd;
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

  switch (true) {
    case /^clear$/.test(completeLine):
      consoleContent.innerHTML = '';
      originalALstLogin = '';
      cleared = true;
      break;
    case /^exit$/.test(completeLine):
      desktop = document.getElementById('desktop');
      desktop.removeChild(this.parentElement);
      break;
    case /^uptime$/.test(completeLine):
      printLineTerminal(TerminalCommands.uptime_str(), consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case /^neofetch$/.test(completeLine):
      TerminalCommands.neofetch(consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case /^pwd$/.test(completeLine):
      printLineTerminal(CURRENT_DIRECTORY, consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case /^ls/.test(completeLine):
      let lsParts = completeLine.split(' ');
      let children = TerminalCommands.listDirectory(lsParts[1] || '.');
      children.forEach((child) => {
        let childName = child.name + (child.type === 'dir' ? '/' : '');
        printLineTerminal(childName, consoleContent);
      });

      originalALstLogin = consoleContent.innerHTML;
      break;

    case /^cat/.test(completeLine):
      let catArgs = completeLine.split(' ');
      let fileLines = TerminalCommands.displayFile(catArgs[1] || '.');
      fileLines.forEach((line) => {
        printLineTerminal(line, consoleContent);
      });

      originalALstLogin = consoleContent.innerHTML;
      break;

    case /^rm/.test(completeLine):
      let rmArgs = completeLine.split(' ');
      let rmResult = TerminalCommands.deleteFile(rmArgs[1] || '.');

      printLineTerminal(rmResult, consoleContent);

      originalALstLogin = consoleContent.innerHTML;
      break;

    case /^cd/.test(completeLine):
      let _lsParts = completeLine.split(' ');
      let result = TerminalCommands.changeDirectory(_lsParts[1] || USER_HOME_DIRECTORY);
      printLineTerminal(result, consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case /^help$/.test(completeLine):
      printLineTerminal('Supported commands: exit, uptime, neofetch, pwd, ls', consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
    case /^$/.test(completeLine):
      cleared = true;
      break;
    default:
      printLineTerminal(`esh: command not found: ${completeLine}`, consoleContent);
      originalALstLogin = consoleContent.innerHTML;
      break;
  }
  return cleared;
}
