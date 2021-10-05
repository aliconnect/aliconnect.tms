(function() {

  function header(level, title) {
    // contentElement.createElement('A', {name: 'h' + headerIndex});
    contentElement.createElement('H' + level, '', title);
    // if (level<4) {
    //   indexElement.createElement('LI', 'h' + level, [
    //     ['A', '', title, {href: '#h' + headerIndex }],
    //   ]);
    // }
    // headerIndex++;
  }
  function schemaElement(schemaName,schema) {
    header(2, schemaName);
    header(3, 'Items');
    console.log(schemaName,schema);
    const schemaItems = AIM.ref.filter(item => item.schema === schema.title);
    const tableElement = contentElement.createElement('UL', 'properties');
    schemaItems.forEach(item => {
      var path = [];
      for (var p=item;p;p=p.master) {
        path.unshift(p);
      }
      tableElement.createElement('LI', [
        ['A', 'code', item.$id, { href: '#htest' } ],
        ['SPAN', '', ': ', path.map(item => item.$id).join(' / ') ],
      ]);
    });
    // console.log('schemaItems', schemaItems, schema.title);

    if (schema.gui) {
      header(3, 'GUI object');
      contentElement.createElement('P', '', 'Dit object heeft een digital twin configuratie en wordt in het 3D model weergegeven. 3D Voorbeeld volgt.');
      if (schema.gui.global) {
        contentElement.createElement('DIV', '', 'Global icon');
        const guiElement = contentElement.createElement('DIV', 'gui global').createElement('DIV', 'object').createElement('DIV',schema.title + '()').createElement(schema.gui.global);
      }
      if (schema.gui.global) {
        contentElement.createElement('DIV', '', 'Detail icon');
        const guiElement = contentElement.createElement('DIV', 'gui detail').createElement('DIV', 'object').createElement('DIV',schema.title + '()').createElement(schema.gui.global);
      }
    }

    if (schema.geo) {
      header(3, 'DigitalTwin');
      contentElement.createElement('P', '', 'Dit object heeft een digital twin configuratie en wordt in het 3D model weergegeven. 3D Voorbeeld volgt.');
      contentElement.createElement('PRE', 'code', JSON.stringify(schema.geo,null,2));
    }

    const stereotypes = {
      configuratie_element: { title: 'Configuratie' },
      variabele: { title: 'Variabelen' },
      signalering: { title: 'Signaleringen' },
      bediening: { title: 'Bediening' },
      besturing: { title: 'Besturing' },
      autonoom_proces: { title: 'Autonoom proces' },
    };
    [schema.properties, schema.operations].forEach(par => {
      if (!par) return;
      for (let [propertyName, property] of Object.entries(par)) {
        property.propertyName = propertyName.split(/\[| |=/)[0];
        property.stereotype = property.stereotype || 'variabele';
        stereotypes[property.stereotype].items = stereotypes[property.stereotype].items || [];
        stereotypes[property.stereotype].items.push(property);
      }
    });
    for (let [stereotype, type] of Object.entries(stereotypes)) {
      if (type.items) {
        header(3, type.title);
        const tableElement = contentElement.createElement('UL', 'properties ' + stereotype);
        type.items.forEach(property => {
          tableElement.createElement('LI', [
            // ['A', 'code' , property.propertyName, {href: '#h' + headerIndex } ],
            ['SPAN', '', property.description ? ': ' + property.description.split('.')[0] : ''],
          ]);
          header(4, property.propertyName);
          const keysElement = contentElement.createElement('UL', 'properties');
          for (let [key, value] of Object.entries(property)) {
            if (key === 'rules' && Array.isArray(value)) {
              keysElement.createElement('LI',[
                ['CODE', '', key ],
                ['UL', value.map(rule => ['LI', '', 'Conditie: <code>' + rule.conditie + '</code>' +  (rule.acties ? '<br>Acties: <code>' + rule.acties.join('</code>; <code>') + '</code>' : '' )]) ]
              ]);
            } else if (key.match(/\(/)) {
              keysElement.createElement('LI', [
                ['CODE', '', key ],
                ['PRE', 'code', value ],
              ]);
            } else {
              keysElement.createElement('LI', [
                ['CODE', '', key ],
                // [ key.match(/\(/) ? 'code' : '', Array.isArray(value) ? [['UL', value.map(value => ['LI', '', '- ' + value])]] : value ],
                ['SPAN', '', ': ', Array.isArray(value) ? [['OL', value.map(value => ['LI', '', value])]] : value ],
              ]);
            }

          }
        });
      }
    }
  }
  function createBody(event) {
    data = event.body;
    console.log('DATA', data);
    const item = AIM.getItem(Number(AIM.auth.access.sub));


    let docnav = new Docs.Nav('H0', '', 'JAAA');
    // contentElement.createElement('H1', '', 'sdfgsdf');

    console.log('createBody', item);

    contentElement.createElement('H1', '', AIM.info.title);
    contentElement.createElement('P', '', AIM.info.description);
    // contentElement.createElement('P', '', [['A', '', 'tms.yaml', {target:'src', href: 'https://aliconnect.nl/v1/api/tms/config/tms.yaml'}]]);

    // indexSection.createElement('H1', '', 'Index');
    const indexElement = contentElement.createElement('SECTION', 'index').createElement('UL');

    let headerIndex = 0;

    // header(1, 'Source files');
    // const tableElement = contentElement.createElement('UL', 'properties');
    // data.ref.forEach(ref => {
    //   tableElement.createElement('LI', '', [['A', '', ref, {target:'src', href: ref}]]);
    // });

    header(1, 'Schemas');
    for (let [schemaName, schema] of Object.entries(data.components.schemas)) {
      schemaElement(schemaName, schema);
    }
    docnav.createNext();
  }

  AIM.extend({
    config: {
      aim: {
        // "headers":{
        //   "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJyd3MuYWxpY29ubmVjdC5ubCIsInNjb3BlIjoid2Vic2l0ZS5yZWFkIG5hbWUgZW1haWwiLCJzdWIiOiIyODA0MzQyIiwiYXVkIjoiMzY2NjEzNCIsImV4cCI6MTYwNTM2Mjk3MCwiaWF0IjoxNjA1Mjc2NTcwfQ.UKHp3WPoh5DtXvZBG9D3TNpLeh6v17rD1kfJSRBWqxU"
        // },
        websocket: {
          servers: [{ url: document.location.origin.replace(/http/, 'ws') }]
        },
        servers: [{ url: document.location.origin + '/api' }]
      }
    },
    docs: {
      index: {
        'LTS': {
          Test: {src: '/lts/input/README.md'},
        },
      },
    },
    on: {
      load() {
        console.log('DATA',data.components.schemas);
        AIM.docs.index.LTS = AIM.docs.index.LTS || {};
        for (let [schemaName, schema] of Object.entries(data.components.schemas)) {
          schema.hoortbij = schema.hoortbij || 'Tunnel';
          AIM.docs.index.LTS[schema.hoortbij] = AIM.docs.index.LTS[schema.hoortbij] || {};
          AIM.docs.index.LTS[schema.hoortbij][schemaName] = event => {
            console.log(schemaName, schema.hoortbij);
            let docnav = new Docs.Nav('H0', '', schemaName);
            contentElement.createElement('H1', '', schemaName);
            schemaElement(schemaName, schema);
            docnav.createNext();
          }
        }
        // AIM.extend(data);
      },
      init() {
        // console.log('INIT', data);
        // createBody({body: data});
        AIM.datainit();
        // console.log('REF', AIM.ref);

      }
    },
  });
})();
