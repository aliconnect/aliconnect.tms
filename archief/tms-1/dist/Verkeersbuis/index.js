require('@aliconnect/api');
aim.log('Start Verkeersbuis')
Verkeersbuis = function() {}
Verkeersbuis.prototype.setVerkeerslichtenHandStandRood = function () {
  aim.log('setVerkeerslichtenHandStandRood');
  Verkeerslichten.forEach(Verkeerslichten=>Verkeerslichten.setHandStand('rood'));
};
Verkeersbuis.prototype.setVerkeerslichtenHandStandGroen = function () {
  aim.log('setVerkeerslichtenHandStandGroen');
  Verkeerslichten.forEach(Verkeerslichten=>Verkeerslichten.setHandStand('gedoofd'));
};


aim().on('load', event => {
  aim.log('Verkeersbuis', 'LOADED')
})
