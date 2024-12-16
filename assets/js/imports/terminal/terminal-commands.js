import {
  getDate,
  getUptime,
  N_OS,
  N_HOST,
  N_KERNEL,
  N_PACKAGES,
  N_SHELL,
  N_RESOLUTION,
  N_DE,
  N_THEME,
  N_TERMINAL,
  N_TERMINAL_FONT,
  N_CPU,
  N_GPU,
  N_MEMORY,
  USER_LOGGED,
  CURRENT_DIRECTORY,
  USER_LOGGED_SYMBOL,
} from '../system.js';
export class TerminalCommands {
  static neofetch(consoleContent, firstLineTerminal = '') {
    let newLine = `
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${USER_LOGGED}@${N_HOST}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-----------------------</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>OS: ${N_OS}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Host: ${N_HOST}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Kernel: ${N_KERNEL}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Uptime: ${getUptime()}</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Packages: ${N_PACKAGES}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Shell: ${N_SHELL}</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Resolution: ${N_RESOLUTION}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>DE: ${N_DE}</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>WM: ${'???'}</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>WM Theme: ${N_THEME}</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Terminal: ${N_TERMINAL}</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Terminal Font: ${N_TERMINAL_FONT}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>CPU: ${N_CPU}</p>
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>GPU: ${N_GPU}</p> 
        <p style="color: #4AF626;margin: 0px;font-family: monospace;">:EEEEEEEEEEEEEEEEEEEEEEEE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Memory: ${N_MEMORY}</p> 
    `;
    consoleContent.innerHTML = '' + newLine;
  }

  static uptime_str() {
    let currentDate = getDate({
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    let uptime = getUptime();
    return `${currentDate} up ${uptime}`;
  }
}
