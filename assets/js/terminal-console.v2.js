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
function openConsole2() {
  let windowApp = createWindow('llllll');
  let desktop = document.getElementById('desktop');

  //remove the default window-content (Will disable draggability)
  let wContent = windowApp.querySelector('.window-content');
  windowApp.removeChild(wContent);

  let wconsole = _createTerminalConsole();
  windowApp.appendChild(wconsole);

  //re-enable draggability
  setDraggable(windowApp);

  desktop.appendChild(windowApp);
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

openConsole2();
