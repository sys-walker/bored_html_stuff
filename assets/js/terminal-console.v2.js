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
function openConsole() {
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
  let lastloginLine = _createLastLoginLine();

  consoleContent.onclick = function () {
    _writableTerminal(consoleContent);
  };

  consoleContent.appendChild(lastloginLine);
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

function _getLastLogin() {
  let lastLogin = storage_getItem('shell-login-date');
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

  storage_setItem('shell-login-date', newLogin);
  return lastLogin ? lastLogin : newLogin;
}

function _writableTerminal(consoleContent) {
  let cmd = ''; //buffer of keyinput
  let completeLine = '';
  let originalALstLogin = consoleContent.innerHTML;

  consoleContent.onclick = function () {
    consoleContent.tabIndex = 0;

    consoleContent.onkeydown = function (e) {
      if (e.key === 'Enter') {
        // completeLine,originalALstLogin,this.parentElement,consoleContent
  
        switch (completeLine) {
          case 'clear':
            consoleContent.innerHTML = '';
            originalALstLogin = '';
            break;
          case 'exit':
            let desktop = document.getElementById('desktop');
            desktop.removeChild(this.parentElement);
            break;
          case '':
            break;
          default:
            printLineTerminal(`esh: command not found: ${completeLine}`, consoleContent, consoleContent.innerHTML);
            originalALstLogin = consoleContent.innerHTML;
            break;
        }

        cmd = '';
        completeLine = '';
      } else if (e.key === 'Backspace') {
        completeLine = '';
        cmd = cmd.slice(0, -1);
        completeLine = cmd;
        printLineTerminal(completeLine, consoleContent, originalALstLogin);
      } else {
        cmd += e.key;
        completeLine = cmd;

        printLineTerminal(completeLine, consoleContent, originalALstLogin);
      }
    };

    console.log('clicked');
    consoleContent.focus();
  };
}

function printLineTerminal(text, consoleContent, firstLineTerminal) {
  let newLine = `
          <div style="display: flex; flex-flow: wrap;">
            <p style="
                color:#4AF626;
                margin:0px;
                font-family:monospace
              ">${text}</p>
        `;
  consoleContent.innerHTML = firstLineTerminal + newLine;
}
/* 
<p style="color: #4AF626;margin: 0px;font-family: monospace;"><span style="color:transparent">.................................</span>root@Experiments</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:<span style="color:transparent">......</span>-----------------------</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:<span style="color:transparent">......</span>OS: ExperimentOS</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>Host: Unknown</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>Kernel: Unknown</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>Uptime: Unknown</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>Packages: Unknown</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>Shell: esh 1.0</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:<span style="color:transparent">......</span>Resolution: Unknown</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:<span style="color:transparent">......</span>DE: Pencil</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>WM: Unknown</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>WM Theme: Pencil</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>Terminal: Element Terminal</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>Terminal Font: Unknown</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:<span style="color:transparent">........................</span>CPU: Unknown</p>
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:<span style="color:transparent">......</span>GPU: Unknown</p> 
<p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:<span style="color:transparent">......</span>Memory: Unknown</p> 

                                                         
                                                         

*/