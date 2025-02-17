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
  normalizePath,
  SystemCommands,
} from '../../os-core/system.js';

import { FileSystem } from '../../os-core/filesystem/filesystem.js';

export class TerminalCommands {
  static neofetch() {
    let newLine = `
                                         ${USER_LOGGED}@${N_HOST}
        :EEEEEEEEEEEEEEEEEEEEEEEE:      ----------------------- 
        :EEEEEEEEEEEEEEEEEEEEEEEE:      OS: ${N_OS}
        :EEEEEE:                        Host: ${N_HOST}
        :EEEEEE:                        Kernel: ${N_KERNEL}
        :EEEEEE:                        Uptime: ${getUptime()} 
        :EEEEEE:                        Packages: ${N_PACKAGES}
        :EEEEEE:                        Shell: ${N_SHELL} 
        :EEEEEEEEEEEEEEEEEEEEEEEE:      Resolution: ${N_RESOLUTION}
        :EEEEEEEEEEEEEEEEEEEEEEEE:      DE: ${N_DE} 
        :EEEEEE:                        WM: ${'???'}
        :EEEEEE:                        WM Theme: ${N_THEME} 
        :EEEEEE:                        Terminal: ${N_TERMINAL} 
        :EEEEEE:                        Terminal Font: ${N_TERMINAL_FONT}
        :EEEEEE:                        CPU: ${N_CPU}
        :EEEEEEEEEEEEEEEEEEEEEEEE:      GPU: ${N_GPU} 
        :EEEEEEEEEEEEEEEEEEEEEEEE:      Memory: ${N_MEMORY} 
    `;
    return newLine;
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

  static changeDirectory(fdir) {
    fdir = normalizePath(fdir);
    let result = FileSystem.changeDirectory(fdir);

    if (result.error) {
      return result.message;
    }
    SystemCommands.changeDirectory(fdir);
    return fdir;
  }

  static listDirectory(fdir) {
    fdir = normalizePath(fdir);
    let result = FileSystem.getLS(fdir);
    if (result.error) {
      return [
        {
          name: result.message,
          content: 'error',
          type: 'error',
        },
      ];
    } else {
      return result.children;
    }
  }

  static displayFile(fdir) {
    fdir = normalizePath(fdir);
    let result = FileSystem.getFile(fdir);
    if (result.error) {
      return [result.message];
    } else {
      return result.lines;
    }
  }

  static deleteFile(fdir) {
    fdir = normalizePath(fdir);
    let result = FileSystem.deleteFile(fdir);

    // if (result.error) {
    //   return result.message;
    // } else {
    //   return result.message;
    // }
    return result.message;
  }
  static deleteFileOrDirectory(fdir) {
    fdir = normalizePath(fdir);
    let result = FileSystem.deleteFileOrDirectory(fdir);

    // if (result.error) {
    //   return result.message;
    // } else {
    //   return result.message;
    // }
    return result.message;
  }

  static createDirectory(fname) {
    let fdir = normalizePath(fname);
    let result = FileSystem.createDirectory(fdir);
    return result.message;
  }
}
