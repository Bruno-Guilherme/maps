import { criarPoligono } from "./criarPoligono.js";

// Função para escapar caracteres especiais em regex
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Função para filtrar o GeoJSON por gid
function filterGeoJSON(geojsonData, operator, value) {
    return {
        "type": "FeatureCollection",
        "features": geojsonData.features.filter(feature => {
            const gid = feature.properties.gid;
            switch (operator) {
                case 'equals':
                    return gid === value;
                case 'greaterThan':
                    return gid > value;
                case 'lessThan':
                    return gid < value;
                default:
                    return true; // Caso nenhum operador seja especificado, não filtra por gid
            }
        }),
    };
}

// Função principal para configurar o filtro no mapa
const setupFilter = (map, geojsonData, info, sidebar) => {
    const html = `
    <div class="input-group">
        <select id="operator-select" class="form-control input-sm">
            <option value="equals">Igual a</option>
            <option value="greaterThan">Maior que</option>
            <option value="lessThan">Menor que</option>
        </select>
        <input id="numeric-input" type="number" class="form-control input-sm" placeholder="Valor">
        <span class="input-group-btn">
            <button id="search-button" class="btn btn-default btn-sm" type="button">Filtrar</button>
        </span>
    </div>
    `;

    const css = {
        position: 'absolute',
        left: '50px',
        top: '0px',
        width: '20vw',
        float: 'right'
    };

    const eventos = {
        click: function(data) {
            if (typeof geojsonData === "object") {
                if (data.target && data.target.id === 'search-button') {
                    const operator = document.getElementById('operator-select').value;
                    const numericValue = parseFloat(document.getElementById('numeric-input').value);
    
                    // Filtrar o GeoJSON
                    const filteredData = filterGeoJSON(geojsonData, operator, numericValue);
    
                    // Verificar se há dados filtrados
                    if (filteredData.features.length > 0) {
                        // Remover camadas antigas do mapa
                        map.eachLayer(layer => {
                            if (layer instanceof L.GeoJSON) {
                                map.removeLayer(layer);
                            }
                        });
    
                        // Adicionar nova camada com dados filtrados
                        const filteredLayer = criarPoligono(filteredData, map, info, sidebar).addTo(map);
    
                        // Ajustar o zoom do mapa para a nova camada filtrada
                        map.fitBounds(filteredLayer.getBounds());
    
                        // Mostrar quantidade de features filtradas
                        console.log(`Foram encontradas ${filteredData.features.length} features com os critérios de filtro.`);
    
                        // Mostrar os layers com o gid filtrado
                        filteredData.features.forEach(feature => {
                            const gid = feature.properties.gid;
                            if (feature.geometry && feature.geometry.coordinates) {
                                const latLng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                                L.marker(latLng)
                                    .bindPopup(`GID: ${gid}`)
                                    .addTo(map);
                            } else {
                                console.log(`Feature com gid ${gid} não possui coordenadas válidas.`);
                            }
                        });
                    } else {
                        console.log('Nenhuma feature encontrada com os critérios de filtro.');
                    }
                }
            } else {
                console.log("GeoJSON não é um objeto válido.");
            }
        },
        // Eventos adicionais, como contextmenu, podem ser adicionados conforme necessário
    };

    // Controle customizado para o filtro
    const filtrar = L.control.custom({
        position: 'topleft',
        content: html,
        classes: '',
        style: css,
        events: eventos,
    });

    // Adicionar controle ao mapa
    filtrar.addTo(map);
};

export { setupFilter };
