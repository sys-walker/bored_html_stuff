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

  static __deleteFile(pathArray, fs) {
    /**
     * MUST CHECK IF THE FILE EXISTS BEFORE CALLING THIS
     *
     * assumed the last path segment is a file
     *
     */
    if (pathArray.length === 2) {
      let index = fs.findIndex((file) => file.name === pathArray[1]);
      if (index > -1) {
        fs.splice(index, 1);
      } else {
        //error
      }
    } else {
      if (pathArray.length !== 2) {
        pathArray.shift();
        let nextPathSegment = pathArray[0];
        let nextFsLevel = fs.find((element) => element.name === nextPathSegment);
        return FileSystem.__deleteFile(pathArray, nextFsLevel.children);
      } else {
        //error
      }
    }
  }
  static deleteFile(path) {
    let pathArray = path.split('/');
    let fs = FileSystem.getFS();

    let found = FileSystem.__findDirectoryOrFile([...pathArray], fs);
    if (found !== undefined) {
      if (found.type === 'file') {
        FileSystem.__deleteFile([...pathArray], fs);
        Storage.setItem('fs', fs); //update FS
        return { error: false, message: `${pathArray.at(-1)} deleted` };
      } else {
        return { error: true, message: `${pathArray.at(-1)}: is a directory use -r option (Not implemented)` };
      }
    } else {
      return { error: true, message: `${path}: Not found` };
    }
  }

  static changeDirectory(path) {
    let pathArray = path.split('/');
    let fs = FileSystem.getFS();
    let found = FileSystem.__findDirectoryOrFile([...pathArray], fs);
    if (found !== undefined) {
      if (found.type === 'dir') {
        return { error: false, message: '' };
      } else {
        return { error: true, message: `${pathArray.at(-1)}: Not a directory` };
      }
    } else {
      return { error: true, message: `${path}: Not found` };
    }
  }
  static getLS(path) {
    let pathArray = path.split('/');
    let fs = FileSystem.getFS();

    let found = FileSystem.__findDirectoryOrFile([...pathArray], fs);
    if (found !== undefined) {
      if (found.type === 'dir') {
        return { error: false, children: found.children, message: '' };
      } else {
        return { error: true, children: [], message: `${pathArray.at(-1)}: Not a directory` };
      }
    } else {
      return { error: true, lines: [], message: `${path}: Not found` };
    }
  }
  static getFile(path) {
    let pathArray = path.split('/');
    let fs = FileSystem.getFS();
    let found = FileSystem.__findDirectoryOrFile([...pathArray], fs);

    if (found !== undefined) {
      if (found.type === 'file') {
        return { error: false, lines: found.content.split('\n'), message: '' };
      } else {
        return { error: true, lines: [], message: `${pathArray.at(-1)}: Not a file` };
      }
    } else {
      return { error: true, lines: [], message: `${path}: Not found` };
    }
  }
  static __findDirectoryOrFile(pathArray, fs) {
    if (pathArray.every((segment) => segment === '')) {
      //Special case for '/'. '/' has no anteccesor and defined type as dir then we fake it for functiopnality
      return {
        name: 'root',
        children: fs,
        type: 'dir',
      };
    } else {
      if (pathArray[0] === '') {
        pathArray.shift();
      }
      let intermitg = pathArray[0];
      for (let i = 0; i < fs.length; i++) {
        let segment = fs[i];
        if (segment.name === intermitg) {
          if (segment.type === 'file') {
            return segment;
          } else {
            pathArray.shift();
            if (pathArray.length === 0) {
              return segment;
            } else {
              return FileSystem.__findDirectoryOrFile(pathArray, segment.children);
            }
          }
        }
      }
      return undefined;
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
