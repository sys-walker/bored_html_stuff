
let desktop = document.getElementById("desktop");
desktop.addEventListener("click", function (e) {
    let existStartMenu = document.getElementById("startmenu");
  if (existStartMenu) {
    desktop.removeChild(existStartMenu);
  }
  
});

document.body.onload = function () {
    console.log("Desktop loaded");

    let getDate = () => {
        const d = new Date();
        const formattedDate = d.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).replace(',', '');
        return formattedDate;
    }

    //Load time
    let timeElement = document.getElementById("timeval")
    timeElement.innerHTML = getDate();

    setInterval(function() {
        // Get the current date and time
        const updatedTime = getDate()
        timeElement.innerHTML =updatedTime
        timeElement.style.minWidth = window.getComputedStyle(timeElement).width;
    }, 1000);



    
 
    
}