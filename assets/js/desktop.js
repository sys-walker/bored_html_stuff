let desktop = document.getElementById('desktop');
desktop.addEventListener('click', function (e) {
  let existStartMenu = document.getElementById('startmenu');
  if (existStartMenu) {
    desktop.removeChild(existStartMenu);
  }
});