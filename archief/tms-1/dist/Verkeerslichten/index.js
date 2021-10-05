require('@aliconnect/api');
aim.log('Start Verkeerslichten')

AfsluitBomen = {
  open() {},
  sluit() {},
}

Verkeerslicht = function() {}
Verkeerslicht.prototype.setStand = function (stand) {
  // console.log(this.$id, 'setStand', stand);
  this.Stand = stand;
}

/** @function Verkeerslichten
  * @constructor
  * @summary Verkeerslichten
  * @description Verkeerslichten object bla bla bla
  * @param *required* id Identifier of Verkeerslichten
  */
Verkeerslichten = function() {}
/** @function Verkeerslichten.setHandStand
  * @stereotype bediening
  * @summary SetHandStand
  * @description 'Stel de gewenste stand van de verkeerslichten in die gebruikt
  * moet worden als #bedieningswijze = hand. De instellingen worden gezet
  * op de LFV door het autonome proces *HandhaafInstellingen.'
  * @bsttiName SetHandStand
  * @bsttiNr BSTTI#16876
  * @bsttiPath
  * - Functies van een Verkeersbuis
  * - Verkeersgeleiding-functies
  * - Verkeerslichten
  * - Bedieningen
  * @conditie #in_gebruik = ja
  * @acties
  * - #hand_stand := stand
  * @param *required* stand In te stellen handmatige stand
  */
Verkeerslichten.prototype.setHandStand = function (stand) {
  // console.log('setHandStand', stand, this.$id);
  clearTimeout(this.standTimeout);
  const setStandActions = {
    rood:() => {
      this.Verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('geel'));
      this.standTimeout = setTimeout(event => {
        this.Verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('rood'));
        this.Stand = 'rood';
        setTimeout(() => AfsluitBomen.sluit(),3000);
      }, 6000);
    },
    groen:() => {
      this.Verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('groen'));
      this.Stand = 'groen';
    },
    geel_knipperen:() => {
      this.Verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('geel'));
      this.standTimeout = setTimeout(event => {
        this.Verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('gedoofd'));
        this.standTimeout = setTimeout(setStandActions.geel_knipperen, 1000);
      }, 1000);
      this.Stand = 'geel_knipperen';
    },
    gedoofd:() => {
      if (this.Stand !== 'gedoofd') {
        AfsluitBomen.open();
        this.standTimeout = setTimeout(() => {
          this.Verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('groen'));
          this.Stand = 'groen';
          this.standTimeout = setTimeout(() => {
            this.Verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('gedoofd'));
            this.Stand = 'gedoofd';
          }, 9000);
        }, 6000);
      }
    }
  };
  setStandActions[stand]();
};

(function(){
  aim()
  .extend({
    paths:{
      '/Verkeerslichten(id)/setHandStand(stand)': {
        post: {
          operationId: 'Verkeerslichten(id).setHandStand(stand)',
          security: [
            {
              auth: ['admin.readwrite', 'system.read']
            }
          ]
        }
      }
    },
  })
  .on('ready', event => {
    // TODO: Opnemen in AIM, set initial values execute oninit()
    Verkeerslichten.forEach(Verkeerslichten => {
      Verkeerslichten.setHandStand('gedoofd');
    });
  })
})()
