/*
<div class="window-app">
  <div class="window-header">
    <div class="window-title">
      <p>My Application</p>
    </div>
    <div class="buttons-slot">
      <div class="dot maxmize"><img src="assets/img/terminal/maximize.svg" /></div>
      <div class="dot close"><img src="assets/img/terminal/close.svg" /></div>
    </div>
  </div>
  <div class="window-content"></div>
</div>
*/

//Generic method scheme to create a window app
function openGenericWindow(appTitle) {
  let windowApp = createWindow(appTitle);
  let desktop = document.getElementById('desktop');
  desktop.appendChild(windowApp);

  setDraggable(windowApp);
}
//Generic method scheme to create a window app
function createWindow(appTitle) {
  //Must to reimplement this method to create a window app
  let windowApp = document.createElement('div');
  windowApp.className = 'window-app';
  windowApp.style.position = 'absolute';

  let windowHeader = createWindowHeader(appTitle);
  let windowContent = createWindowContent();

  windowApp.appendChild(windowHeader);
  windowApp.appendChild(windowContent);
  return windowApp;
}

function createWindowHeader(appTitle) {
  let windowHeader = document.createElement('div');
  windowHeader.className = 'window-header';
  let windowTitle = createWindowTitle(appTitle);

  let windowsButtons = createWindowButtons();

  windowHeader.appendChild(windowTitle);
  windowHeader.appendChild(windowsButtons);
  return windowHeader;
}
function createWindowContent() {
  let windowContent = document.createElement('div');
  windowContent.className = 'window-content';
  return windowContent;
}
function createWindowTitle(appTitle) {
  let windowTitle = document.createElement('div');
  windowTitle.className = 'window-title';
  if (typeof appTitle === 'string') {
    let p = document.createElement('p');
    p.innerHTML = appTitle;
    windowTitle.appendChild(p);
  }

  return windowTitle;
}
function createWindowButtons() {
  let buttonsSlot = document.createElement('div');
  buttonsSlot.className = 'window-buttons';

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

  return buttonsSlot;
}
function closeWindow(param) {
  let terminal = param.parentNode.parentNode.parentNode;
  let desktop = document.getElementById('desktop');
  desktop.removeChild(terminal);
}

function maximizeWindow(param) {
  let terminal = param.parentNode.parentNode.parentNode;
  const styles = window.getComputedStyle(terminal);

  let initialWindowHeight = styles.getPropertyValue('--initial-window-height');
  let initialWindowWidth = styles.getPropertyValue('--initial-window-width');
  let windowBorderRadius = styles.getPropertyValue('--window-border-radius');

  if (styles.position !== 'absolute') {
    terminal.style.position = 'absolute';
    terminal.style.top = _positionTerminal.top;
    terminal.style.left = _positionTerminal.left;
    terminal.style.height = initialWindowHeight;
    terminal.style.width = initialWindowWidth;
    terminal.style.borderRadius = windowBorderRadius;
  } else {
    positionTerminal = _getCurrentPsoition(terminal, param);
    terminal.style.position = ''; // Remove absolute positioning
    terminal.style.top = ''; // Remove top positioning
    terminal.style.left = ''; // Remove left positioning
    terminal.style.height = '100%'; // Set height to 100%
    terminal.style.width = '100%'; // Set width to 100%
    terminal.style.borderRadius = '0px'; // Set border radius
  }
}
var _positionTerminal = { top: 0, left: 0 };

function _getCurrentPsoition(terminal) {
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

function setDraggable(div) {
  var mousePosition;
  var offset = [0, 0];
  var isDown = false;
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

//openGenericWindow('My Application');
