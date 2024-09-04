/*

 <div id="startmenu">
    <div id="searchbar">
        <input type="text" placeholder="Search" />
    </div>
    
    <div id="startmenu-content">
        <div id="sidemenu">
        
            //multile items
            <div class="iconmenu">
                <img src="assets/img/all.svg" />
            </div>
        </div>
        <div id="sidemenu-list">
            
           //multile items
            <div class="list-item">
                <img src="assets/img/terminal.svg" />
                <p>Terminal console</p>
            </div>
        </div>
    </div>
</div>
*/

let allAppsCategories = ['all', 'system', 'config'];
let allItemsList = [
  { category: 'system', name: 'Open Terminal', icon: 'terminal', action: openConsole, args: [] },
  {
    category: 'config',
    name: 'Open Open Empty window',
    icon: 'config',
    action: openGenericWindow,
    args: ['Generic window'],
  },
];

function openStartMenu() {
  let existStartMenu = document.getElementById('startmenu');
  if (existStartMenu) {
    desktop.removeChild(existStartMenu);
  } else {
    let startmenu = createStartMenu();
    startmenu.addEventListener('click', function (event) {
      event.stopPropagation();
      //prevent close startmenu when click on it
    });

    let desktop = document.getElementById('desktop');
    desktop.appendChild(startmenu);
  }
}
function createStartMenu() {
  let startmenu = document.createElement('div');
  startmenu.id = 'startmenu';
  let searchbar = createSearchBar();
  let startmenuContent = createStartMenuContent();
  startmenu.appendChild(searchbar);
  startmenu.appendChild(startmenuContent);
  return startmenu;
}
function createSearchBar() {
  let searchbar = document.createElement('div');
  searchbar.id = 'searchbar';
  let input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search';
  searchbar.appendChild(input);
  return searchbar;
}
function createStartMenuContent() {
  let startmenuContent = document.createElement('div');
  startmenuContent.id = 'startmenu-content';
  let sidemenu = createSideMenu();
  let sidemenuList = createSideMenuList('all');
  startmenuContent.appendChild(sidemenu);
  startmenuContent.appendChild(sidemenuList);
  return startmenuContent;
}

function getAppByCategory(category) {
  if (category === 'all') return allItemsList;
  return allItemsList.filter((item) => item.category === category);
}

function createSideMenu() {
  let sidemenu = document.createElement('div');
  sidemenu.id = 'sidemenu';
  //multile items

  allAppsCategories.forEach((item) => {
    let iconmenu = document.createElement('div');
    iconmenu.classList.add('iconmenu');

    let img = document.createElement('img');
    img.src = `assets/img/${item}.svg`;
    iconmenu.appendChild(img);
    sidemenu.appendChild(iconmenu);
    iconmenu.onclick = function () {
      console.log('clicked: ', item);
      changedCategory(item);
    };
  });
  //end of items
  return sidemenu;
}
function createSideMenuList(category) {
  let sidemenulist = document.createElement('div');
  sidemenulist.id = 'sidemenu-list';
  //multile items

  let selectedItems = getAppByCategory(category);

  selectedItems.forEach((item) => {
    let listitem = document.createElement('div');
    listitem.classList.add('list-item');
    let img = document.createElement('img');
    img.src = `assets/img/${item.icon}.svg`;
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

function changedCategory(newCategory) {
  let startmenuContent = document.getElementById('startmenu-content');
  let alreadyList = document.getElementById('sidemenu-list');
  if (alreadyList) {
    startmenuContent.removeChild(alreadyList);
  }
  let sidemenuList = createSideMenuList(newCategory);
  startmenuContent.appendChild(sidemenuList);
}
