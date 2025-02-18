import { BaseWindow } from '../../generic_elements/generic_window.js';
import { Storage } from '../../os-core/storage/storage.js';
import { CURRENT_DIRECTORY, USER_HOME_DIRECTORY, SystemCommands } from '../../os-core/system.js';
import { TerminalCommands } from './terminal-commands.js';

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

    terminal.addEventListener('keydown', (event) => {
      const lines = terminal.value.split('\n');
      const lastLine = lines[lines.length - 1];

      // Prevents deleting the prompt
      if (event.key === 'Backspace' && lastLine.length <= prompt.length) {
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        event.preventDefault(); // Prevents adding a new line
        terminal.value = this._getCommandOutput(lastLine, terminal.value);
        terminal.scrollTop = terminal.scrollHeight;
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        //future implementation for command history
        event.preventDefault();
      }
    });
  }

  _getCommandOutput(lastLine, currentOutput) {
    let prompt = `${SystemCommands.getPrompt()}`;
    let cleared = false;
    // Get the command in raw format
    const command = lastLine.slice(prompt.length).trim();
    let response = '';

    switch (true) {
      case /^clear$/.test(command):
        cleared = true;
        break;
      case /^neofetch$/.test(command):
        response = TerminalCommands.neofetch();
        break;
      case /^exit$/.test(command):
        let desktop = document.getElementById('desktop');
        desktop.removeChild(this.baseWindowHTML);
        return;
      case /^pwd$/.test(command):
        response = CURRENT_DIRECTORY;
        break;
      case /^ls/.test(command):
        let lsParts = command.split(' ');
        let children = TerminalCommands.listDirectory(lsParts[1] || '.');
        children.forEach((child) => {
          let childName = child.name + (child.type === 'dir' ? '/' : '');
          response += childName + '\n';
        });
        break;
      case /^cat/.test(command):
        let catArgs = command.split(' ');
        let fileLines = TerminalCommands.displayFile(catArgs[1] || '.');
        fileLines.forEach((line) => {
          response += line + '\n';
        });
        break;
      case /^$/.test(command):
        break;
      case /^help$/.test(command):
        response = 'Supported commands: exit, uptime, neofetch, pwd, ls, cat, rm, cd, help,clear';
        break;
      case /^uptime$/.test(command):
        response = TerminalCommands.uptime_str();
        break;
      case /^cd/.test(command):
        let _lsParts = command.split(' ');
        response = TerminalCommands.changeDirectory(_lsParts[1] || USER_HOME_DIRECTORY);
        break;
      case /^rm/.test(command):
        let rmArgs = command.split(' ');
        if (rmArgs.length < 2) {
          response = 'rm: missing operand\n';
          break;
        }
        rmArgs.shift(); //removes the rm commandname

        let r = rmArgs.reduce(
          (result, currenVal) => {
            let updatedRes = result;
            if (currenVal.startsWith('-')) {
              //is a flag commanc
              updatedRes.flags.push(currenVal);
            } else {
              //is a file
              updatedRes.files.push(currenVal);
            }
            return updatedRes;
          },
          { flags: [], files: [] }
        );

        let files2delete = r.files;
        let flags = r.flags;

        if (flags.includes('-r')) {
          files2delete.forEach((file) => {
            response += TerminalCommands.deleteFileOrDirectory(file) + '\n';
          });
        } else {
          files2delete.forEach((file) => {
            response += TerminalCommands.deleteFile(file) + '\n';
          });
        }

        break;

      case /^(md|mkdir)/.test(command):
        let mvArgs = command.split(' ');
        if (mvArgs.length < 2) {
          response = 'mv: missing operand\n';
          break;
        }
        mvArgs.shift(); //removes the rm commandname
        let files2create = mvArgs;

        files2create.forEach((file) => {
          response += TerminalCommands.createDirectory(file) + '\n';
        });

        break;

      default:
        response = `esh: command not found: ${command}`;
        break;
    }
    //checks if the prompt changed
    prompt = `${SystemCommands.getPrompt()}`;
    if (response !== '') {
      currentOutput += `\n${response}\n${prompt}`;
    } else {
      currentOutput = cleared ? prompt : `${currentOutput}\n${prompt}`;
    }
    return currentOutput;
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
