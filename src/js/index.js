import L from 'leaflet';
import 'leaflet.css';

// Data
import geoJson_base from '../data/base01.js'

// Plugins
import './plugins/leaflet-sidebar.js'

// Componentes
import infoControl  from './components/infoControl.js';
import criarPoligonos from './components/criarPoligonos.js';

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
const sidebar = L.control.sidebar('sidebar').addTo(map);

const lotesPadrao = {"areaPadrao": geoJson_base}
const geoJsonLayers = {"BasePadrao": criarPoligonos(lotesPadrao.areaPadrao, map, infoControl, sidebar)}

geoJsonLayers.BasePadrao.addTo(map);