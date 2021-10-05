Verkeerslichten = function() {}
Verkeerslichten.prototype.createElement = function () {
  document.body.createElement('H1', '', 'Verkeerslichten');
  // console.log(verkeerslichten.Hand_stand);
  // console.log(verkeerslichten.Children);
  // console.log(verkeerslichten.Verkeerslicht);
  this.element = document.body.createElement('DIV');
  this.Verkeerslicht.forEach(Verkeerslicht => Verkeerslicht.createElement() );
  const buttons = [
    ['Rood', event => this.setHandStand('rood')],
    ['Groen', event => this.setHandStand('groen')],
    ['Knipperen', event => this.setHandStand('geel_knipperen')],
    ['Gedoofd', event => this.setHandStand('gedoofd')],
  ];
  for (const button of buttons) {
    document.body.createElement('button', '', ...button);
  }
}

Verkeerslicht = function() {}
Verkeerslicht.prototype.createElement = function () {
  this.parent.element.createElement('DIV', this.$id, this.gui.detail, {
    stand: String(this.Stand)
  } );
}

AIM.extend({
  config: {
    aim: {
      websocket: {
        servers: [{ url: document.location.origin.replace(/http/, 'ws') }]
      },
      servers: [{ url: document.location.origin + '/api' }]
    }
  },
  on: {
    init() {
      AIM.datainit(event => {
        console.log('INIT', Verkeerslichten);
        document.body.createElement('H2', '', document.location.origin);
        Verkeerslichten.forEach(Verkeerslichten => Verkeerslichten.createElement());
      });
    },
  }
});
