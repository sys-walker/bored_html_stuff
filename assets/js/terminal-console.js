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
  var mousePosition;
  var offset = [0, 0];
  //var div;
  var isDown = false;

  // div = document.createElement("div");
  // div.style.position = "absolute";
  // div.style.width = "100px";
  // div.style.height = "100px";
  // div.style.background = "red";
  // div.style.color = "blue";
  // div.style.cursor = "move"; // Set cursor to indicate draggability

  //begin terminal window draggable

  let terminal = document.createElement("div");
  terminal.className = "terminal";
  terminal.style.position = "absolute";
  // terminal.style.cursor = "move"; // Set cursor to indicate draggability

  let headerConsole = createHeaderConsole();
  let console = createTerminalConsole();

  terminal.appendChild(headerConsole);
  terminal.appendChild(console);
  let desktop = document.getElementById("desktop");
  desktop.appendChild(terminal);

  // //end create terminal window draggable

  // let desktop = document.getElementById("desktop");
  // desktop.appendChild(div);

  let div = terminal;

  div.addEventListener(
    "mousedown",
    function (e) {
      isDown = true;
      offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
    },
    true
  );

  document.addEventListener(
    "mouseup",
    function () {
      isDown = false;
    },
    true
  );

  document.addEventListener(
    "mousemove",
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
        newLeft = Math.max(
          0,
          Math.min(desktop.clientWidth - div.clientWidth, newLeft)
        );
        newTop = Math.max(
          0,
          Math.min(desktop.clientHeight - div.clientHeight, newTop)
        );

        div.style.left = newLeft + "px";
        div.style.top = newTop + "px";
      }
    },
    true
  );
}

function closeWindow(param) {
  let terminal = param.parentNode.parentNode.parentNode;
  let desktop = document.getElementById("desktop");
  desktop.removeChild(terminal);
}

function createHeaderConsole() {
  let headerConsole = document.createElement("div");
  headerConsole.className = "header-console";

  let buttonsSlot = document.createElement("div");
  buttonsSlot.className = "buttons-slot";

  let redDot = document.createElement("div");
  redDot.className = "dot red";
  redDot.onclick = function () {
    closeWindow(this);
  };
  buttonsSlot.appendChild(redDot);

  let orangeDot = document.createElement("div");
  orangeDot.className = "dot orange";
  buttonsSlot.appendChild(orangeDot);

  let greenDot = document.createElement("div");
  greenDot.className = "dot green";
  buttonsSlot.appendChild(greenDot);

  headerConsole.appendChild(buttonsSlot);

  return headerConsole;
}
function createTerminalConsole() {
  let console = document.createElement("div");
  console.className = "console";
  return console;
}
