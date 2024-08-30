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
function openStartMenu() {
  let existStartMenu = document.getElementById("startmenu");
  if (existStartMenu) {
    desktop.removeChild(existStartMenu);
  } else {
    let startmenu = createStartMenu();
    let desktop = document.getElementById("desktop");
    desktop.appendChild(startmenu);
  }
}
function createStartMenu() {
  let startmenu = document.createElement("div");
  startmenu.id = "startmenu";
  let searchbar = createSearchBar();
  let startmenuContent = createStartMenuContent();
  startmenu.appendChild(searchbar);
  startmenu.appendChild(startmenuContent);
  return startmenu;
}
function createSearchBar() {
  let searchbar = document.createElement("div");
  searchbar.id = "searchbar";
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search";
  searchbar.appendChild(input);
  return searchbar;
}
function createStartMenuContent() {
  let startmenuContent = document.createElement("div");
  startmenuContent.id = "startmenu-content";
  let sidemenu = createSideMenu();
  let sidemenuList = createSideMenuList();
  startmenuContent.appendChild(sidemenu);
  startmenuContent.appendChild(sidemenuList);
  return startmenuContent;
}

let allItems = ["all"];
let allItemsList = [{ name: "Open Terminal", icon: "terminal" }];
function createSideMenu() {
  let sidemenu = document.createElement("div");
  sidemenu.id = "sidemenu";
  //multile items
  allItems.forEach((item) => {
    let iconmenu = document.createElement("div");
    iconmenu.classList.add("iconmenu");

    let img = document.createElement("img");
    img.src = `assets/img/${item}.svg`;
    iconmenu.appendChild(img);
    sidemenu.appendChild(iconmenu);
  });
  //end of items
  return sidemenu;
}
function createSideMenuList() {
  let sidemenulist = document.createElement("div");
  sidemenulist.id = "sidemenu-list";
  //multile items
  allItemsList.forEach((item) => {
    let listitem = document.createElement("div");
    listitem.classList.add("list-item");
    let img = document.createElement("img");
    img.src = `assets/img/${item.icon}.svg`;
    let p = document.createElement("p");
    p.innerText = item.name;
    listitem.appendChild(img);
    listitem.appendChild(p);
    sidemenulist.appendChild(listitem);
  });

  //end of items
  return sidemenulist;
}
