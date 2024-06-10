//import { infoControl } from "./components/infoControl";
import L from 'leaflet';
import 'leaflet.css';
import infoControl  from './components/infoControl';

var map = L.map('map', {
  zoomControl: false, maxZoom: 28, minZoom: 1
}).fitBounds([[-8.145613789548003, -34.97560602091026], [-8.10941480853255, -34.93623795524364]]);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);

infoControl.addTo(map);