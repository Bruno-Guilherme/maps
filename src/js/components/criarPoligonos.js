

const criarPoligonos = (geoJson, mapa, infoControl, sidebar) => {

    let camadaGeoJson;

    function geojsonStyle(feature) {
        // Função para definir o estilo dos poligonos.

        return {
            // Área
            fillOpacity: 0.5,
            dashArray: "10. 10",

            // Aresta
            color: "#1C63B1",
            weight: 2,
            opacity: 1,
        };
    }

    function highlightFeature(e) {
        // Função para estilizar os poligonos on hover

        let layer = e.target;
        layer.setStyle({
            weight: 5,
            dashArray: '',
            fillOpacity: 0.7
        });

        layer.bringToFront();
        infoControl.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        // Função para estilizar o poligono out hover
        camadaGeoJson.resetStyle(e.target);


        infoControl.update();
    }

    function zoomToFeature(e) {
        // Função para dar foco ao poligono clicado
        mapa.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        // Adição dos ouvintes ao mapa
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: (e) => {
                zoomToFeature(e);

                sidebar.open('home');


                openPopupWithTable(feature.properties);
            }
        });
    }


    camadaGeoJson = L.geoJson(geoJson, {
        style: geojsonStyle,
        onEachFeature: onEachFeature
    });

    return camadaGeoJson
}

export default criarPoligonos;