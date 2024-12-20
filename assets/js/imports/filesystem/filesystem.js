import { Storage } from './../storage.js';
export class FileSystem {
  static initFS() {
    let fs = Storage.getItem('fs');

    let initialFS = [
      {
        name: 'root',
        children: [
          { name: 'example.txt', content: 'Hello World', type: 'file' },
          { name: 'MyDir', children: [], type: 'dir' },
        ],
        type: 'dir',
      },
      { name: 'tmp', children: [], type: 'dir' },
    ];
    if (!fs) {
      Storage.setItem('fs', initialFS);
    }
  }
  static getFS() {
    FileSystem.initFS();
    return Storage.getItem('fs');
  }

  static createFile(path, name, content) {
    let pathArray = path.split('/');
    let obj = { name: name, content: content, type: 'file' };
    let fs = FileSystem.getFS();
    let canAdd = FileSystem.__canAddFile([...pathArray], fs);
    if (canAdd) {
      FileSystem.__AddRec(pathArray, obj, fs);
    }
    Storage.setItem('fs', fs);
  }

  static __canAddFile(pathArray, fs) {
    if (pathArray.length === 0) {
      if (Array.isArray(fs)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (Array.isArray(pathArray) && pathArray.every((segment) => segment === '')) {
        return true;
      }
      let npathArray = pathArray.shift();
      npathArray = npathArray === '' ? pathArray.shift() : npathArray;
      for (let i = 0; i < fs.length; i++) {
        if (fs[i].name === npathArray) {
          return FileSystem.__canAddFile(pathArray, fs[i].children);
        }
      }
      return false;
    }
  }

  static __AddRec(pathArray, obj, fs) {
    if (pathArray.length === 0) {
      if (Array.isArray(fs)) {
        fs.push(obj);
        return true;
      } else {
        console.log('This is not a directory');
        return false;
      }
    } else {
      if (Array.isArray(pathArray) && pathArray.every((segment) => segment === '')) {
        fs.push(obj);
        return true;
      }

      let npathArray = pathArray.shift();
      if (npathArray === '') {
        npathArray = pathArray.shift();
      }

      for (let i = 0; i < fs.length; i++) {
        console.log(fs[i].name, npathArray);
        if (fs[i].name === npathArray) {
          console.log('found');
          return FileSystem.__AddRec(pathArray, obj, fs[i].children);
        }
      }

      console.log('This path does not exists', npathArray);

      return false;
    }
  }

  /**
   * Retrieves the list of files and directories at the specified path in the filesystem.
   *
   * @param {string} path - The path to the directory in the filesystem.
   * @returns {Object} An object containing the result of the operation.
   * @returns {boolean} return.error - Indicates if there was an error.
   * @returns {Array} return.children - The list of files and directories if no error occurred.
   * @returns {string} return.message - The error message if an error occurred.
   */
  static getLS(path) {
    
    let pathArray = path.split('/');
    let fs = FileSystem.getFS();
    let exists = FileSystem.__existsDirectory([...pathArray], fs);

    if (!exists.error) {
      let files = FileSystem.__getLS([...pathArray], fs);
      return { error: false, children: files, message: '' };
    } else {
      return { error: true, children: [], message: exists.message };
    }


  }

  static __getLS(pathArray, fs) {
    if (pathArray.length === 0) {
      if (Array.isArray(fs)) {
        return fs;
      } else {

        return [];
      }
    } else {
      if (Array.isArray(pathArray) && pathArray.every((segment) => segment === '')) {
        return fs;
      }
      let npathArray = pathArray.shift();
      npathArray = npathArray === '' ? pathArray.shift() : npathArray;
      for (let i = 0; i < fs.length; i++) {
        if (fs[i].name === npathArray) {
          return FileSystem.__getLS(pathArray, fs[i].children);
        }
      }
      return [];
    }
  }

  static changeDirectory(path) {
    let pathArray = path.split('/');
    let fs = FileSystem.getFS();
    let exists = FileSystem.__existsDirectory([...pathArray], fs);

    return exists;
  }
  static __existsDirectory(pathArray, fs) {
    /**
     *
     * @param {Array} pathArray
     * @param {Array} fs
     * @returns {Object} {error:boolean,message:string}
     */
    if (pathArray.length === 0) {
      if (Array.isArray(fs)) {
        return { error: false, message: 'Directory exists' };
      } else {
        return { error: true, message: 'This is not a directory' };
      }
    } else {
      if (Array.isArray(pathArray) && pathArray.every((segment) => segment === '')) {
        return { error: false, message: 'Directory exists' };
      }
      let npathArray = pathArray.shift();
      npathArray = npathArray === '' ? pathArray.shift() : npathArray;
      for (let i = 0; i < fs.length; i++) {
        if (fs[i].name === npathArray) {
          return FileSystem.__existsDirectory(pathArray, fs[i].children);
        }
      }
      return { error: true, message: 'Directory does not exists' };
    }
  }
}

/*
FIleSystem JSON


Directories => {name:"MyDir",children:[]}
Files => {title:"example.txt",content:"Hello World"}

root is  []

/ = ["",""]

*/
