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
  let console = document.createElement('div');
  console.className = 'window-console';
  let lastloginLine = _createLastLoginLine();
  console.appendChild(lastloginLine);
  return console;
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
