import { BaseWindow } from '../genericWindow/generic_window.js';

class Notepad {
  baseWindowHTML = '';
  baseWindow; // Declarar la propiedad para almacenar el objeto BaseWindow

  constructor() {
    this.baseWindow = new BaseWindow();
    this.baseWindow.addTitle('Notepad');
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
export function testWindow() {
  let i = new Notepad();
  let app = i.build();
  BaseWindow.addToDesktop(app);
}
