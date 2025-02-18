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

import { FileSystem } from '../../os-core/filesystem/filesystem.v2.js';
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

  static async changeDirectory(fdir) {
    console.log('async cd');

    fdir = normalizePath(fdir);
    let result = await FileSystem.changeDirectory(fdir);

    if (result.error) {
      return result.message;
    }
    SystemCommands.changeDirectory(fdir);
    return fdir;
  }

  static async listDirectory(fdir) {
    console.log('async ls');
    fdir = normalizePath(fdir);
    let result = await FileSystem.getLS(fdir);
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

  static async displayFile(fdir) {
    console.log('async cat');
    fdir = normalizePath(fdir);
    let result = await FileSystem.getFile(fdir);
    if (result.error) {
      return [result.message];
    } else {
      return result.lines;
    }
  }

  static async deleteFile(fdir) {
    console.log('async rm file');

    fdir = normalizePath(fdir);
    let result = await FileSystem.deleteFile(fdir);

    // if (result.error) {
    //   return result.message;
    // } else {
    //   return result.message;
    // }
    return result.message;
  }
  static async deleteFileOrDirectory(fdir) {
    console.log('async rm -r');

    fdir = normalizePath(fdir);
    let result = await FileSystem.deleteFileOrDirectory(fdir);

    // if (result.error) {
    //   return result.message;
    // } else {
    //   return result.message;
    // }
    return result.message;
  }

  static async createDirectory(fname) {
    console.log('async mkdir');

    let fdir = normalizePath(fname);
    let result = await FileSystem.createDirectory(fdir);
    return result.message;
  }
}
