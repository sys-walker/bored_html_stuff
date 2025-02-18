import { openBaseWindow } from '../generic_elements/generic_window.js';
import { openConsole } from '../apps/terminal/terminal-console.v3.js';
import { openNotepad } from './../apps/notepad/notepad2.js';
import { openMapsApp } from './../apps/maps/maps.js';
import { openBaseDrawerWindow } from '../generic_elements/generic_drawer_window.js';
export class StartMenu {
  startmenu = '';

  allAppsCategories = [
    { icon: './assets/img/all.svg', name: 'all' },
    { icon: './assets/img/system.svg', name: 'system' },
    { icon: 'assets/img/config.svg', name: 'config' },
  ];
  allItemsList = [
    {
      category: 'system',
      name: 'Open Terminal',
      _name: 'terminal',
      icon: './assets/icons/Suru/Suru/scalable/apps/terminal-app-symbolic.svg',
      action: openConsole,
      args: [],
    },
    {
      category: 'config',
      name: 'Open Empty window',
      _name: 'generic window',
      icon: './assets/icons/Suru/Suru/scalable/apps/system-settings-symbolic.svg',
      action: openBaseWindow,
      args: [],
    },
    //openBaseDrawerWindow
    {
      category: 'config',
      name: 'Open Empty drawer window',
      _name: 'generic drawer window',
      icon: './assets/icons/Suru/Suru/scalable/apps/system-settings-symbolic.svg',
      action: openBaseDrawerWindow,
      args: [],
    },
    {
      category: '',
      name: 'Open Notepad',
      _name: 'notepad',
      icon: './assets/icons/Suru/Suru/scalable/apps/notes-app-symbolic.svg',
      action: openNotepad,
      args: [],
    },
    {
      category: '',
      name: 'Open Maps',
      _name: 'maps',
      icon: './assets/icons/Suru/Suru/scalable/apps/maps-app-symbolic.svg',
      action: openMapsApp,
      args: [],
    },
  ];
  constructor() {
    this.startmenu = document.createElement('div');
    this.startmenu.id = 'startmenu';
    let searchbar = this._createSearchBar();
    let startmenuContent = this._createStartMenuContent();
    this.startmenu.appendChild(searchbar);
    this.startmenu.appendChild(startmenuContent);
  }
  get startmenu() {
    return this.startmenu;
  }
  _createSearchBar() {
    let searchbar = document.createElement('div');
    searchbar.id = 'searchbar';
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search';
    input.oninput = (event) => {
      console.log('searching...', event.target.value.toUpperCase());
      let found = this.allItemsList.filter(
        (item) =>
          item.name.toUpperCase().includes(event.target.value.toUpperCase()) ||
          item._name.toUpperCase().includes(event.target.value.toUpperCase())
      );
      this._foundSearchResults(found);
    };
    searchbar.appendChild(input);
    return searchbar;
  }
  _createStartMenuContent() {
    let startmenuContent = document.createElement('div');
    startmenuContent.id = 'startmenu-content';
    let sidemenu = this._createSideMenu();
    let sidemenuList = this._createSideMenuList('all');
    startmenuContent.appendChild(sidemenu);
    startmenuContent.appendChild(sidemenuList);
    return startmenuContent;
  }

  _getAppByCategory(category) {
    if (category === 'all') return this.allItemsList;
    return this.allItemsList.filter((item) => item.category === category);
  }

  _createSideMenu() {
    let sidemenu = document.createElement('div');
    sidemenu.id = 'sidemenu';
    //multile items

    this.allAppsCategories.forEach((_item) => {
      let icon = _item.icon;
      let name = _item.name;
      let iconmenu = document.createElement('div');
      iconmenu.classList.add('iconmenu');

      let img = document.createElement('img');
      img.src = icon;
      iconmenu.appendChild(img);
      sidemenu.appendChild(iconmenu);
      iconmenu.onclick = () => {
        console.log('clicked: ', name);
        this._changedCategory(name);
      };
    });
    //end of items
    return sidemenu;
  }
  _createSideMenuList(category) {
    let sidemenulist = document.createElement('div');
    sidemenulist.id = 'sidemenu-list';
    //multile items

    let selectedItems = this._getAppByCategory(category);

    selectedItems.forEach((item) => {
      let listitem = document.createElement('div');
      listitem.classList.add('list-item');
      let img = document.createElement('img');
      img.src = item.icon;
      let p = document.createElement('p');
      p.innerText = item.name;
      listitem.appendChild(img);
      listitem.appendChild(p);

      listitem.onclick = function (event) {
        event.stopPropagation();
        item.action.apply(null, item.args);
      };
      sidemenulist.appendChild(listitem);
    });

    //end of items
    return sidemenulist;
  }

  _createSearchResultsList(found) {
    let sidemenulist = document.createElement('div');
    sidemenulist.id = 'sidemenu-list';
    //multile items

    let selectedItems = found;

    selectedItems.forEach((item) => {
      let listitem = document.createElement('div');
      listitem.classList.add('list-item');
      let img = document.createElement('img');
      img.src = item.icon;
      let p = document.createElement('p');
      p.innerText = item.name;
      listitem.appendChild(img);
      listitem.appendChild(p);

      listitem.onclick = function () {
        item.action.apply(null, item.args);
      };
      sidemenulist.appendChild(listitem);
    });

    //end of items
    return sidemenulist;
  }

  _changedCategory(newCategory) {
    let startmenuContent = document.getElementById('startmenu-content');
    let alreadyList = document.getElementById('sidemenu-list');
    if (alreadyList) {
      startmenuContent.removeChild(alreadyList);
    }

    let sidemenuList = this._createSideMenuList(newCategory);
    startmenuContent.appendChild(sidemenuList);
  }

  _foundSearchResults(found) {
    //Create list with found items
    let startmenuContent = document.getElementById('startmenu-content');
    console.log(found);

    let alreadyList = document.getElementById('sidemenu-list');
    if (alreadyList) {
      startmenuContent.removeChild(alreadyList);
    }
    if (found.length > 0) {
      //create newlist
      startmenuContent.appendChild(this._createSearchResultsList(found));
    } else {
      //No items found
      startmenuContent.appendChild(this._createSideMenuList('all'));
    }
  }
}

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
export function openStartMenu() {
  let existStartMenu = document.getElementById('startmenu');
  if (existStartMenu) {
    desktop.removeChild(existStartMenu);
  } else {
    let startmenu = new StartMenu().startmenu;

    console.log(startmenu);

    startmenu.addEventListener('click', function (event) {
      event.stopPropagation();
      //prevent close startmenu when click on it
      console.log('clicked on startmenu');
      //focus

      moveToFront(startmenu);
    });

    let desktop = document.getElementById('desktop');
    desktop.appendChild(startmenu);
  }
}
