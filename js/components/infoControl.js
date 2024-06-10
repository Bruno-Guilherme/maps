const infoControl = L.control();

infoControl.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'infoControl');
  this.update();
  return this._div;
};


infoControl.update = function (props) {
  this._div.innerHTML = `
  <h4>Localidade</h4> ${props ?
      '<b>' + props.name + '</b> <br />' + 'Área: ' + (props['Área Projeto (ha)'] === 'null' || props['Área Projeto (ha)'] === null ? 0 : props['Área Projeto (ha)']) + '.' :
      'Coloque o mouse sobre um Estado'
    }
  `;
};

module.exports =  { infoControl };