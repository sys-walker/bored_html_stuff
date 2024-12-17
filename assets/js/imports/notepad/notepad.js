import { createWindowHeader, setDraggable } from '../window-app.js';
import { FileSystem } from '../filesystem/filesystem.js';
/*

Create Notepad window with draggable functionality
<div class="notepad-app">
<div class="header-console">
  <div class="buttons-slot">
    <div class="dot red" onclick="closeWindow(this)"></div>
    <div class="dot orange"></div>
    <div class="dot green"></div>
  </div>
</div>
<div class="window-content"><textarea></textarea></div>
</div> 

*/
export function openNotepad() {
  FileSystem.initFS();
  let windowApp = _createNotepadWindow('Notepad');
  let desktop = document.getElementById('desktop');
  desktop.appendChild(windowApp);
}

function _createNotepadWindow(appTitle) {
  let windowApp = document.createElement('div');
  windowApp.className = 'window-app notepad-app';
  windowApp.style.position = 'absolute';
  //windowApp.style.setProperty('--initial-window-height', '200px');
  //windowApp.style.setProperty('--initial-window-width', '350px');

  let windowHeader = createWindowHeader(appTitle);
  let windowContent = _createNotepadContent();

  windowApp.appendChild(windowHeader);
  windowApp.appendChild(windowContent);

  setDraggable(windowApp);
  return windowApp;
}
function _createNotepadContent() {
  let consoleContent = document.createElement('div');
  consoleContent.className = 'window-content';
  let buttonsSlot = _createNotepadButtons();
  let textArea = document.createElement('textarea');
  consoleContent.appendChild(buttonsSlot);
  consoleContent.appendChild(textArea);

  _configureButtons(buttonsSlot, consoleContent);

  return consoleContent;
}

function _createNotepadButtons() {
  let buttonsSlot = document.createElement('div');
  buttonsSlot.className = 'buttons-slot';

  let buttonSave = document.createElement('button');
  buttonSave.className = 'button-save';
  buttonSave.innerText = 'Save';

  let buttonOpen = document.createElement('button');
  buttonOpen.className = 'button-open';
  buttonOpen.innerText = 'Open';
  buttonsSlot.appendChild(buttonSave);
  buttonsSlot.appendChild(buttonOpen);
  return buttonsSlot;
}

function _configureButtons(buttonsSlot, consoleContent) {
  let saveButton = buttonsSlot.getElementsByClassName('button-save')[0];
  let openButton = buttonsSlot.getElementsByClassName('button-open')[0];
  saveButton.onclick = function () {
    let textArea = consoleContent.getElementsByTagName('textarea')[0];
    let text = textArea.value;
    consoleContent.appendChild(createSaveModal(consoleContent));

    //Storage.setItem('notepad-content', text);
  };

  openButton.onclick = function () {
    alert('Not implemented yet');
    // let textArea = consoleContent.getElementsByTagName('textarea')[0];
    // let text = Storage.getItem('notepad-content');
    // textArea.value = text;
  };
}

function createSaveModal(consoleContent) {
  //Temporary modal save
  console.log('Creating modal');

  let modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'myModal';
  modal.innerHTML = `
    <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Save file</p>
    <input type="text" id="filesave" name="fname"><br><br>

  </div>
  `;
  let closeButton = modal.getElementsByClassName('close')[0];

  closeButton.onclick = function () {
    console.log('Closing modal', modal);

    modal.style.display = 'none';
  };

  let filesave = modal.getElementsByTagName('input')[0];

  //console.log('File name', filesave);

  filesave.onkeydown = function (e) {
    if (e.key === 'Enter') {
      let textArea = consoleContent.getElementsByTagName('textarea')[0];
      FileSystem.createFile('/root', filesave.value, textArea.value);

      modal.style.display = 'none';
    }
  };

  return modal;
}
