import { BaseWindow } from '../genericWindow/generic_window.js';

class MapsApp {
  baseWindowHTML = '';
  baseWindow;
  map;
  constructor() {
    this.baseWindow = new BaseWindow().addTitle('Maps');
    this.baseWindowHTML = this.baseWindow.build();
  }

  build() {
    this.baseWindowHTML.classList.add('maps');
    let windowContent = this.baseWindowHTML.querySelector('.window-content');
    let mapDiv = document.createElement('div');
    mapDiv.id = 'map';

    windowContent.appendChild(mapDiv);

    this.map = L.map(mapDiv)
      .on('load', () => {
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);
      })
      .locate({ setView: true, maxZoom: 16 });

    // Event when location is found
    this.map.on('locationfound', (e) => {
      L.marker(e.latlng).addTo(this.map);

      // Optionally, add a circle around user's location
      L.circle(e.latlng, { radius: e.accuracy }).addTo(this.map);
    });

    // Event when location fails
    this.map.on('locationerror', (e) => {
      alert('Location access denied or unavailable.');
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([51.5, -0.09]).addTo(this.map).bindPopup('A pretty CSS popup.<br> Easily customizable.').openPopup();
    return this.baseWindowHTML;
  }
}
export function openMapsApp() {
  let mapsApp = new MapsApp();
  let app = mapsApp.build();
  BaseWindow.addToDesktop(app);
}
