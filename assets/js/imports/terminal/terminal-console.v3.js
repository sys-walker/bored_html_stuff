import { BaseWindow } from '../genericWindow/generic_window.js';
import { Storage } from '../storage.js';
import { CURRENT_DIRECTORY, USER_HOME_DIRECTORY, SystemCommands } from '../system.js';
class TerminalConsole {
  baseWindowHTML = '';
  baseWindow;

  constructor() {
    this.baseWindow = new BaseWindow().addTitle('Terminal');
    this.baseWindowHTML = this.baseWindow.build();
  }

  build() {
    this.baseWindowHTML.classList.add('terminal-console');
    let windowContent = this.baseWindowHTML.querySelector('.window-content');
    windowContent.appendChild(this.terminalConsoleEl);
    return this.baseWindowHTML;
  }

  _initializeTerminal(terminal) {
    let prompt = `${SystemCommands.getPrompt()}`;
    terminal.value = `Last login ${this.lastLoginLine}  on ttys004` + '\n' + prompt;

    terminal.addEventListener('keydown', function (event) {
      const lines = terminal.value.split('\n');
      const lastLine = lines[lines.length - 1];
      let cleared = false;
      // Prevents deleting the prompt
      if (event.key === 'Backspace' && lastLine.length <= prompt.length) {
        event.preventDefault();
      }

      // Handles enter key
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevents adding a new line
        // Get the command in raw format
        const command = lastLine.slice(prompt.length).trim();
        let response;
        if (command === 'test') {
          response = 'test OK';
        } else if (command === 'clear') {
          response = '';
          cleared = true;
        } else {
          if (command) {
            response = 'not implemented';
          } else {
            response = '';
          }
        }

        // Print the response
        if (response !== '') {
          terminal.value += '\n' + response + '\n' + prompt;
        } else {
          if (!cleared) {
            terminal.value += '\n' + prompt;
          } else {
            terminal.value = prompt;
          }
        }

        terminal.scrollTop = terminal.scrollHeight;
      }
    });
  }

  get lastLoginLine() {
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
    console.log(lastLogin ? lastLogin : newLogin);

    return lastLogin ? lastLogin : newLogin;
  }
  get terminalConsoleEl() {
    let textArea = document.createElement('textarea');
    textArea.spellcheck = false;
    textArea.classList.add('terminal-textarea');

    this._initializeTerminal(textArea);
    textArea.scrollTop = textArea.scrollHeight; //ensure the terminal is scrolled to the bottom

    return textArea;
  }
}

export function openConsole() {
  let tterminal = new TerminalConsole();
  let app = tterminal.build();
  BaseWindow.addToDesktop(app);
}
