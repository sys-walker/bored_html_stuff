export class BaseWindow {
  hasDefaultTitle = true;
  hasTabButton = false;
  hasSearch = false;
  hasMenuDropdown = false;
  titleContent = 'My Application';

  constructor() {}
  build() {
    let genericWindow = document.createElement('div');
    genericWindow.className = 'g-window';

    let windowHeader = document.createElement('div');
    windowHeader.className = 'window-header';
    if (this.hasTabButton) {
      windowHeader.appendChild(this._TabButton);
    }
    windowHeader.appendChild(this._appTitle);
    if (this.hasSearch) {
      windowHeader.appendChild(this._searchButton);
    }

    if (this.hasMenuDropdown) {
      windowHeader.appendChild(this._menuDropdown);
    }

    windowHeader.appendChild(this._windowControlButtons);

    let windowContent = document.createElement('div');
    windowContent.className = 'window-content';

    genericWindow.appendChild(windowHeader);
    genericWindow.appendChild(windowContent);

    return genericWindow;
  }
  addTitle(title) {
    this.titleContent = title;
    this.hasDefaultTitle = false;
    return this;
  }
  addTabButton() {
    this.hasTabButton = true;
    return this;
  }

  addSeach() {
    this.hasSearch = true;
    return this;
  }
  addMenuDropwdown() {
    this.hasMenuDropdown = true;
    return this;
  }

  get _TabButton() {
    let tabButton = document.createElement('button');
    tabButton.className = 'tab-button';
    let icon = document.createElement('img');
    icon.src = '/assets/icons/Suru/Suru/scalable/ui/tab-new-symbolic.svg';
    tabButton.appendChild(icon);

    tabButton.onclick = function () {
      console.log('tab button clicked');
    };
    return tabButton;
  }
  get _searchButton() {
    let searchButton = document.createElement('button');
    searchButton.className = 'search-button';
    let icon = document.createElement('img');
    icon.src = '/assets/icons/Suru/Suru/scalable/actions/system-search-symbolic.svg';
    searchButton.appendChild(icon);
    searchButton.onclick = function () {
      console.log('search button clicked');
    };
    return searchButton;
  }
  get _menuDropdown() {
    let menuDropdown = document.createElement('button');
    menuDropdown.className = 'menu-dropdown';
    let icon = document.createElement('img');
    icon.src = '/assets/icons/Suru/Suru/scalable/actions/open-menu-symbolic.svg';
    menuDropdown.appendChild(icon);
    menuDropdown.onclick = function () {
      console.log('menu dropdown clicked');
    };
    return menuDropdown;
  }
  get _appTitle() {
    let pTitle = document.createElement('p');
    pTitle.className = 'app-title';
    pTitle.innerHTML = this.hasDefaultTitle ? 'BASE WINDOW' : this.titleContent;
    return pTitle;
  }
  get _windowControlButtons() {
    let windowControl = document.createElement('div');
    windowControl.className = 'window-control';

    //sub buttons
    let maximize = document.createElement('div');
    maximize.className = 'gw-button gw-maximize';
    let maximizeImg = document.createElement('img');
    maximizeImg.src = '/assets/img/terminal/maximize.svg';

    maximize.onclick = function () {
      let param = this;
      let terminal = param.parentNode.parentNode.parentNode;
      const styles = window.getComputedStyle(terminal);

      let initialWindowHeight = styles.getPropertyValue('--default-window-height');
      let initialWindowWidth = styles.getPropertyValue('--default-window-width');
      let windowBorderRadius = styles.getPropertyValue('--window-border-radius');

      if (styles.position !== 'absolute') {
        terminal.style.position = 'absolute';
        terminal.style.top = _positionTerminal.top;
        terminal.style.left = _positionTerminal.left;
        terminal.style.height = initialWindowHeight;
        terminal.style.width = initialWindowWidth;
        terminal.style.borderRadius = windowBorderRadius;
      } else {
        _positionTerminal = _getCurrentPsoition(terminal, param);
        terminal.style.position = ''; // Remove absolute positioning
        terminal.style.top = ''; // Remove top positioning
        terminal.style.left = ''; // Remove left positioning
        terminal.style.height = '100%'; // Set height to 100%
        terminal.style.width = '100%'; // Set width to 100%
        terminal.style.borderRadius = '0px'; // Set border radius
      }
    };

    let close = document.createElement('div');
    close.className = 'gw-button gw-close';
    let closeImg = document.createElement('img');
    closeImg.src = '/assets/img/terminal/close.svg';

    close.onclick = function () {
      let windowApp = this.parentNode.parentNode.parentNode;
      let desktop = document.getElementById('desktop');
      desktop.removeChild(windowApp);
    };

    maximize.appendChild(maximizeImg);
    close.appendChild(closeImg);

    windowControl.appendChild(maximize);
    windowControl.appendChild(close);

    return windowControl;
  }

  static _setDraggable(div) {
    const desktop = document.getElementById('desktop');

    var offset = [0, 0];
    var isDown = false;

    div.style.position = 'absolute';

    const moveToFront = (win) => {
      const desktop = win.parentNode;
      const children = Array.from(desktop.children);
      if (children.length <= 1) return;

      // get the maximum z-index
      const maxZIndex = children.reduce((max, child) => {
        const z = parseInt(child.style.zIndex) || 0;
        return Math.max(max, z);
      }, 0);

      // Obtener el z-index actual del elemento
      const currentZ = parseInt(win.style.zIndex) || 0;

      // If the current z-index is the maximum, set all the other windows to 0
      if (currentZ >= 2147483647) {
        children.forEach((child) => {
          if (child !== win) {
            child.style.zIndex = 0;
          }
        });
        win.style.zIndex = 1;
      } else {
        win.style.zIndex = maxZIndex + 1;
      }
    };

    div.querySelector('.window-header').addEventListener(
      'mousedown',
      function (e) {
        moveToFront(div);
        isDown = true;
        offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
      },
      true
    );

    document.addEventListener(
      'mouseup',
      function () {
        isDown = false;
      },
      true
    );

    document.addEventListener(
      'mousemove',
      function (event) {
        event.preventDefault();
        if (isDown) {
          let mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };

          // Calcular la nueva posición
          let newLeft = mousePosition.x + offset[0];
          let newTop = mousePosition.y + offset[1];

          // Asegurarse de que no se salga de los límites del escritorio
          newLeft = Math.max(0, Math.min(desktop.clientWidth - div.clientWidth, newLeft));
          newTop = Math.max(0, Math.min(desktop.clientHeight - div.clientHeight, newTop));

          div.style.left = newLeft + 'px';
          div.style.top = newTop + 'px';
        }
      },
      true
    );
  }
  static addToDesktop(app) {
    let desktop = document.getElementById('desktop');

    desktop.appendChild(app);
    BaseWindow._setDraggable(app);
  }
}

export var _positionTerminal = { top: 0, left: 0 };
export function _getCurrentPsoition(terminal) {
  let _top = 0,
    _left = 0;
  let element = terminal;
  do {
    _top += element.offsetTop;
    _left += element.offsetLeft;
    element = element.offsetParent;
  } while (element);

  return { top: _top + 'px', left: _left + 'px' };
}

export function openBaseWindow() {
  let baseWindow = new BaseWindow();
  let app = baseWindow.build();
  BaseWindow.addToDesktop(app);
}
