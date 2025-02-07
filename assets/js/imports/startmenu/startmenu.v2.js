import { openBaseWindow } from '../genericWindow/generic_window.js';
import { openConsole } from './../terminal/terminal-console.v2.js';
import { openNotepad } from './../notepad/notepad2.js';
export class StartMenu {
  startmenu = '';

  allAppsCategories = [
    { icon: '/assets/img/all.svg', name: 'all' },
    { icon: '/assets/img/system.svg', name: 'system' },
    { icon: 'assets/img/config.svg', name: 'config' },
  ];
  allItemsList = [
    {
      category: 'system',
      name: 'Open Terminal',
      _name: 'terminal',
      icon: '/assets/icons/Suru/Suru/scalable/apps/terminal-app-symbolic.svg',
      action: openConsole,
      args: [],
    },
    {
      category: 'config',
      name: 'Open Empty window',
      _name: 'generic window',
      icon: '/assets/icons/Suru/Suru/scalable/apps/system-settings-symbolic.svg',
      action: openBaseWindow,
      args: [],
    },
    {
      category: ' ',
      name: 'Open Notepad',
      _name: 'notepad',
      icon: '/assets/icons/Suru/Suru/scalable/apps/notes-app-symbolic.svg',
      action: openNotepad,
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

      //Create list with found items
      let startmenuContent = document.getElementById('startmenu-content');
      console.log(found);

      if (found.length > 0) {
        //create newlist
        let alreadyList = document.getElementById('sidemenu-list');
        if (alreadyList) {
          startmenuContent.removeChild(alreadyList);
        }
        startmenuContent.appendChild(this._createSearchResultsList(found));
      } else {
        //No items found
        let alreadyList = document.getElementById('sidemenu-list');
        if (!alreadyList) {
          startmenuContent.appendChild(this._createSideMenuList('all'));
        }
      }
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

      listitem.onclick = function () {
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
}
