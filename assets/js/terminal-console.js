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
var positionTerminal = { top: 0, left: 0 };

function openConsole() {
  var mousePosition;
  var offset = [0, 0];
  //var div;
  var isDown = false;

  let terminal = document.createElement('div');
  terminal.className = 'terminal';
  terminal.style.position = 'absolute';

  let headerConsole = createHeaderConsole();
  let console = createTerminalConsole();

  terminal.appendChild(headerConsole);
  terminal.appendChild(console);
  let desktop = document.getElementById('desktop');
  desktop.appendChild(terminal);

  let div = terminal;

  div.addEventListener(
    'mousedown',
    function (e) {
      isDown = true;
      offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
    },
    true
  );

  document.addEventListener(
    'mouseup',
    function () {
      isDown = false;
    },
    true
  );

  document.addEventListener(
    'mousemove',
    function (event) {
      event.preventDefault();
      if (isDown) {
        mousePosition = {
          x: event.clientX,
          y: event.clientY,
        };

        // Calculate new position within desktop boundaries
        let newLeft = mousePosition.x + offset[0];
        let newTop = mousePosition.y + offset[1];

        // Constrain to desktop dimensions (assuming 100% width and height)
        newLeft = Math.max(0, Math.min(desktop.clientWidth - div.clientWidth, newLeft));
        newTop = Math.max(0, Math.min(desktop.clientHeight - div.clientHeight, newTop));

        div.style.left = newLeft + 'px';
        div.style.top = newTop + 'px';
      }
    },
    true
  );
}

function closeWindow(param) {
  let terminal = param.parentNode.parentNode.parentNode;
  let desktop = document.getElementById('desktop');
  desktop.removeChild(terminal);
}

function getCurrentPsoition(terminal) {
  let _top = 0,
    _left = 0;
  let element = terminal;
  do {
    _top += element.offsetTop;
    _left += element.offsetLeft;
    element = element.offsetParent;
  } while (element);

  return { top: _top + 'px', left: _left + 'px' };
}

function maximizeWindow(param) {
  let terminal = param.parentNode.parentNode.parentNode;
  const styles = window.getComputedStyle(terminal);

  if (styles.position !== 'absolute') {
    terminal.style.position = 'absolute';
    terminal.style.top = positionTerminal.top;
    terminal.style.left = positionTerminal.left;
    terminal.style.height = '200px';
    terminal.style.width = '300px';
    terminal.style.borderRadius = '15px';
  } else {
    positionTerminal = getCurrentPsoition(terminal);
    terminal.style.position = ''; // Remove absolute positioning
    terminal.style.top = ''; // Remove top positioning
    terminal.style.left = ''; // Remove left positioning
    terminal.style.height = '100%'; // Set height to 100%
    terminal.style.width = '100%'; // Set width to 100%
    terminal.style.borderRadius = '0px'; // Set border radius
  }
}

function createHeaderConsole() {
  let headerConsole = document.createElement('div');
  headerConsole.className = 'header-console';

  let buttonsSlot = document.createElement('div');
  buttonsSlot.className = 'buttons-slot';

  // //Minimize button
  // let orangeDot = document.createElement("div");
  // orangeDot.className = "dot minimize";
  // buttonsSlot.appendChild(orangeDot);

  //Maximize button
  let greenDot = document.createElement('div');
  greenDot.className = 'dot maxmize';
  let ic = document.createElement('img');
  ic.src = 'assets/img/terminal/maximize.svg';
  greenDot.appendChild(ic);
  greenDot.onclick = function () {
    maximizeWindow(this);
  };

  //Close button
  let redDot = document.createElement('div');
  ic = document.createElement('img');
  ic.src = 'assets/img/terminal/close.svg';
  redDot.appendChild(ic);

  redDot.className = 'dot close';
  redDot.onclick = function () {
    closeWindow(this);
  };

  //l'ordre importa

  buttonsSlot.appendChild(greenDot);
  buttonsSlot.appendChild(redDot);
  //buttonsSlot.appendChild(orangeDot);
  headerConsole.appendChild(buttonsSlot);

  return headerConsole;
}
function createTerminalConsole() {
  let console = document.createElement('div');
  console.className = 'console';
  let lastloginLine = createLastLoginLine();
  console.appendChild(lastloginLine);
  return console;
}
function getLastLogin() {
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

function createLastLoginLine() {
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
    
    >Last login ${getLastLogin()} on ttys004</p>
  
  `;
  return lastloginContainer;
}
