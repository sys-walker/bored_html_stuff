import { BaseWindow } from '../genericWindow/generic_window.js';

class Notepad {
  baseWindowHTML = '';
  baseWindow;

  constructor() {
    this.baseWindow = new BaseWindow().addTitle('Notepad').addTabButton().addSeach().addMenuDropwdown();
    this.baseWindowHTML = this.baseWindow.build();
  }

  build() {
    this.baseWindowHTML.classList.add('notepad');
    let windowContent = this.baseWindowHTML.querySelector('.window-content');
    let textArea = document.createElement('textarea');
    windowContent.appendChild(textArea);
    return this.baseWindowHTML;
  }
}

export function openNotepad() {
  let notepad2 = new Notepad();
  let app = notepad2.build();
  BaseWindow.addToDesktop(app);
}
