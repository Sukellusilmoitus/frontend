/* eslint-disable */
// Jest cannot render leaflet layers, thats why this func is mocked
// eslint disabled since this is a copied solution for this problem 
var createElementNSOrig = global.document.createElementNS
global.document.createElementNS = function(namespaceURI, qualifiedName) {
  if (namespaceURI==='http://www.w3.org/2000/svg' && qualifiedName==='svg'){
    var element = createElementNSOrig.apply(this, arguments)
    element.createSVGRect = function(){}; 
    return element;
  }
  return createElementNSOrig.apply(this, arguments)
}
