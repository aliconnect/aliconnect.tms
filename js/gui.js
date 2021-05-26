console.log('GUI');
(function() {
  var elTabSystem;
  function getvalue (item, name) {
    return name in item.values ? item.values[name].title || item.values[name] || '' : item[name] || '';
  }
  em = { definitions: {} }
  $().extend({
    // config: {
    //   aim: {
    //     websocket: {
    //       servers: [{ url: document.location.origin.replace(/http/, 'ws') }],
    //     },
    //     servers: [{ url: document.location.origin + '/api' }]
    //   }
    // },
    messenger: {
      update: true,
      onreceive1: function (event) {
        //console.log(this.data.to,$().client);
        if (this.data.state === 'connected' && $().app != 'em' && this.data.from.app === 'em') document.location.reload();
        if (this.data.value) this.data.value.forEach(function (row) {
          if (row.signalering) for (var name in row.signalering) Gui.createSignal(api.item[row.id], name, row.signalering[name]);
        });
      },
    },
    Gui: Gui = GUI = {
      createSignal: function (item, name, row) {
        var prop = item.properties[name];
        //item[name] = value;
        //console.log(name, item[name]);
        if (!item[name]) with (item[name] = elSignals.createElement('LI', '', { item: item, name: name, onclick: Gui.bevestig, el: {} })) {
          createElement('SPAN', 'type icon ' + prop.type );
          item[name].el.cam = createElement('SPAN', 'cam');
          item[name].el.time = createElement('SPAN', 'tijd');
          createElement('SPAN', 'locatie', prop.locatie);
          createElement('SPAN', 'title', prop.title);
          item[name].el.notitie = createElement('SPAN', 'notitie');
        };
        //console.log(name, row, item[name]);
        for (var attrname in row) if (item[name].el[attrname]) item[name].el[attrname].setAttribute('value', row[attrname]);
        item[name].setAttribute('value', item[name].value = row.value);
        Gui.sumSignals();
        //(function signalup(item) {
        //	console.log('SIGNALUP',item);
        //	if (item.master) signalup(item.master);
        //})(item);
      },
      createElementGUI: function () {
        with (this.elDetail = elDetail.createElement('LI', { style: "top:" + this.top + "px;left:" + this.left + 'px' }).createElement('DIV', this.className || this.schema, {item: this, onmouseup: Gui.showpanel, })) {
          if (this.gui.construct) this.gui.construct.call(this);
          createElement('ICN', 'hand');
          createElement('ICN', 'disable');
          createElement('ICN', 'storing');
        }
      },
      element: {
      },
      signaleringen: {
      },
      itemids: {},
      key: $().key = $().uid || $().key,
      definitions: {},
      bevestig: function (event) {
        this.signal.bevestigd = true;
        this.signal.onchange();
      },
      msgSend: function (data) {
        console.log('SEND', data.id, data.values, data);
        $().messenger.send({ msg: { item: { [data.id]: data } } });
      },
      showpanel: function (event) {
        console.log('showpanel', this.item);
        event.stopPropagation();
        var item = this.item;
        if (item.elPanel) return item.elPanel.on('click', );
        with (item.elPanel = document.body.createElement('DIV', 'col itemFaceplate noselect', { draggable: false })) {
          item.elPanel.onclick = function (event) {
            console.log('CLICKED');
            //item.elPanel.parentElement.appendChild(item.elPanel);
            item.elPanel.style.display = '';
          };
          createElement('DIV', 'header', 'Langsventilatie HBL01 123.10', {
            onmousedown: function(event) {
              (window.elementMove = this.parentElement).move = { screenX: event.screenX, screenY: event.screenY, offsetLeft: window.elementMove.offsetLeft, offsetTop: window.elementMove.offsetTop };
              window.onmousemove = function (event) {
                window.elementMove.style.left = Math.min(document.body.clientWidth - window.elementMove.offsetWidth, Math.max(0, window.elementMove.move.offsetLeft + event.screenX - window.elementMove.move.screenX)) + 'px'
                window.elementMove.style.top = Math.min(document.body.clientHeight - window.elementMove.offsetHeight, Math.max(0, window.elementMove.move.offsetTop + event.screenY - window.elementMove.move.screenY)) + 'px'
              }
              window.onmouseup = function (event) {
                window.elementMove = null;
                window.onmousemove = null;
              }
            },
          }).createElement('BUTTON', 'close', 'x', {
            el: item.elPanel, onclick: function (event) {
              console.log('CLOSSED');
              this.el.style.display = 'none'; event.stopPropagation();
            }
          });
          var tabControl = createElement('DIV', 'row tabsControl');
          var tabSheet = createElement('DIV', 'col aco tabSheets');
          var tab = function () {
            this.onclick = function () {
              var c = this.parentElement.children;
              for (var i = 0, e; e = c[i]; i++) {
                e.sheet.style.display = 'none';
                e.removeAttribute('selected');
              }
              this.sheet.style.display = '';
              this.setAttribute('selected', '');

            }
            this.sheet = tabSheet.createElement('DIV', 'col aco itemPanel');
            return this;
          }
          item.tabs = {
            Overzicht: tab.call(tabControl.createElement('A', '', 'Overzicht')),
            Meldingen: tab.call(tabControl.createElement('A', '', 'Meldingen')),
            Configuratie: tab.call(tabControl.createElement('A', '', 'Configuratie')),
            ResetOnd: tab.call(tabControl.createElement('A', '', 'Reset onderdr.')),
          }
          item.tabs.Overzicht.on('click', );
          with (item.tabs.Overzicht.sheet) {
            with (createElement('DIV', 'row')) {
              createElement('b', 'aco', item.title);
              createElement('A', 'auto', 'auto');
              createElement('A', 'hand', 'hand');
              createElement('A', '', 'x');
            }
            with (createElement('UL', 'col aco')) {
              if (item.control.variabelen) {
                with (createElement('LI')) {
                  //console.log('VALUES', item.title, item.values);
                  for (var name in item.values) setAttribute(name, getvalue(item, name));
                  createElement('DIV', 'row opener', 'Variabelen', { open: 1, onclick: function () { this.setAttribute('open', this.getAttribute('open') ^ 1); } });
                  with (createElement('DIV')) {
                    for (var name in item.control.variabelen) {
                      with (createElement('DIV', 'row')) {
                        createElement('SPAN', 'aco', name);
                        createElement('SPAN', item.id + '_' + name, item.control.variabelen[name].value || '' );
                      }
                    }
                  }
                }
              }
              if (item.control.bedieningen) {
                with (createElement('LI')) {
                  createElement('DIV', 'row opener', 'Bedieningen', { open: 1, onclick: function () { this.setAttribute('open', this.getAttribute('open') ^ 1); } });
                  with (createElement('DIV')) {
                    for (var name in item.control.bedieningen) with (createElement('DIV', 'row')) {
                      var fn = item.control.bedieningen[name].js;
                      var code = String(fn);
                      var par = code.split('(')[1].split(')').shift().trim();
                      var values = String(fn).split("\r\n").shift().split("//");
                      values.shift();
                      values = values.length ? values.shift().trim().split('|') : '';
                      if (!par) {
                        createElement('SPAN', 'aco', name, {item: item, fn: fn, onclick: function () { this.fn.call(this.item); } });
                      } else {
                        createElement('SPAN', 'aco', name);
                        if (!values) createElement('input', { item: item, fn: fn, onchange: function () { this.fn.call(this.item, this.value); } });
                        else with (createElement('SPAN')) {
                          values.forEach(function (val) {
                            createElement('SPAN', 'aco', val, {item: item, fn: fn, onclick: function () { this.fn.call(this.item, this.innerText); } });

                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      showtabpanelitem: function (el, level) {
        with (this.tabpanel = el.createElement('LI', this.id, { bedieningswijze: this.values && this.values.bedieningswijze ? this.values.bedieningswijze.title || this.values.bedieningswijze || '' : '' } )) {
          with (createElement('DIV', 'row', { open: level > 0 ? 0 : null, onclick: function () { this.setAttribute('open', this.getAttribute('open') ^ 1) } } )) {
            createElement('SPAN', '', this.title);
            with (createElement('DIV', 'btns')) {
              createElement('A', 'btn_auto', { item: this, onclick: function (event) {
                event.stopPropagation();
                Gui.msgSend({ id: this.item.id, method: { SetOpAutobediening: [] } });
              }});
              createElement('A', 'btn_hand', { item: this, onclick: function (event) {
                event.stopPropagation();
                Gui.msgSend({ id: this.item.id, method: { SetOpHandbediening: [] } });
              }});
            }
            if (!level) createElement('A', 'close');
          }
          with (this.elUl = createElement('ul')) {
            if (this.control) {
              var variabelen = this.control.variabelen;
              for (var name in variabelen) {
                var prop = variabelen[name];
                if (prop.gui) {
                  with (createElement('DIV', 'row')) {
                    if (name in this.values) {
                      this.tabpanel.setAttribute(name, getvalue(this, name));
                    }
                    createElement('SPAN', 'aco', prop.title);
                    createElement('SPAN', 'selectpo ' + this.id + '_' + name, String(getvalue(this, name)).replace(/_/g, ' ').capitalize(), {
                      item: this,
                      enum: variabelen[prop.Gui.selectvariabele].enum,
                      bediening: prop.Gui.bediening,
                      onclick: function () {
                        var options = this.enum.split('|');
                        var rect = this.getBoundingClientRect();
                        var span = this;
                        with (popupselect) {
                          options.forEach(function (option) {
                            //console.log(span, span.item, span.bediening);
                            createElement('DIV', '', String(option.replace(/_/g, ' ')).capitalize(), {
                              value: option, span: span, onclick: function () {
                                Gui.msgSend({ id: this.span.item.id, method: { [this.span.bediening]: [this.value] } });
                                popupselect.innerText = '';
                              }
                            });
                          });
                          style.left = (rect.right - popupselect.offsetWidth) + 'px';
                          style.top = rect.top + 'px';
                        }
                      }
                    });
                  }
                }
              }
            }
            if (this.children) {
              for (var name in this.children) Gui.showtabpanelitem.call(this.children[name], this.elUl, level + 1);
            }
          }
        }
        return el;
      },
      showtabpanel: function () {
        if (this.item.opentab) return this.item.opentab();//style.display = '';
        Gui.showtabpanelitem.call(this.item, elPanel, 0);
        (this.item.opentab = function () {
          var c = this.tabpanel.parentElement.children;
          for (var i = 0, e; e = c[i]; i++) e.style.display = 'none';
          this.tabpanel.style.display = '';
        }).call(this.item);
      },
      menuitems: {},
    },
  });

  // console.log(auth.getAccessToken(), auth);
  console.log('START');
  // console.log($.ws);

  $()
  .on('load', async event => {
    const auth = $().authProvider({});
    const accessToken = auth.getAccessToken();
    if (document.location.port>8000) {

      console.log('LOCAL');

      await $.script('data.js');
      console.log('LOCAL2', $().body);
      return;
      $().extend($().body);
      // $('script').parent(document.head).src('data.js')
      $().extend({
        ws: {
          url: "wss://localhost:9001"
        },
        client: {
          servers: [
            {
              url: "http://localhost:9001/api"
            }
          ]
        }
      })
    } else {
      $().extend({
        ws: {
          url: "wss://aliconnect.nl:444"
        },
        client: {
          servers: [
            {
              url: "https://rws.aliconnect.nl/api"
            }
          ]
        }
      })
    }

  })
  .on('ready', async event => {
    console.log('READY');
    // await $().api('/').get().then(event => $().extend(event.body));
    const vmsOptions = {wall:'1', control:1};
    // var vmsOptions = {wall:'1'};
    // var vmsOptions = get;
    // console.log('vmsOptions', vmsOptions);
    // webcam = new Webcam(vmsOptions);
    // webcam.startChat(vmsOptions);
    // var st = new Date().valueOf(),i=0;
    const menu = {
      Buis: {
        children: {
          Ventilatie: {
            title: "Ventilatie",
          },
          Verlichting: {
            title: "Verlichting",
          },
          CCTV: {
            title: "CCTV",
          },
          BeeldHVD: {
            title: "Beeld HVD",
          },
        },
      },
      Vluchtroute: {
        children: {
          Indicatie_Geluidsbakens: {
            title: "Indicatie/geluidsbakens",
          },
          Vergrendeling: {
            title: "",
          },
          Vluchtdeuren: {
            title: "",
          },
          Kopdeur: {
            title: "",
          },
          Dynamische_Vluchtroute: {
            title: "Dyn. Vluchtroute",
          },
          Overdruk: {
            title: "",
          },
          Licht: {
            title: "",
          },
        },
      },
      Tunnel: {
        children: {
          Blusvoorziening: {
            title: "",
          },
          Vloeistofafvoer: {
            title: "",
          },
          Omroep_HF: {
            title: "",
          },
          Intercom: {
            title: "",
          },
          Bediening: {
            title: "",
          },
          CCTV: {
            title: "",
          },
          Brandmelding_Dienstruimten: {
            title: "",
          },
          Waarschuwing_Dienstruimten: {
            title: "",
          },
        },
      },
      Verkeer: {
        children: {
          VRI_Afsluitboom: {
            title: "VRI Afsluitboom",
          },
          Cado_Hekken: {
            title: "Cado Hekken",
          },
          Veva_Beba: {
            title: "Veva Beba",
          },
          Tunnelbuis_Wi: {
            title: "Tunnelbuis Wi",
          },
        },
      },
      Detecties: {
        children: {
          Hoogte: {},
          SOS: {
            children: {
              Snelheid_laag: {},
              Stilstand: {},
              Spookrijder: {},
            },
          },
          Zicht: {},
          Hulppost: {
            children: {
              Deur: {},
              Blusser: {},
              Haspel: {},
              Noodtelefoon: {},
            },
          },
        }
      },
      Overig: {
        children: {
          C2000: {},
          Telefoon: {},
          GMK_Beelden: {},
        },
      },
      DGB: {
        children: {
          CCTV: {},
        },
      }
    }
    const alarmTypes = 'verkeerskundig,deelsysteem_alarm,deelsysteem_storing,statusmelding,onderdrukte_melding'.split(',');
    function tabSelect(el) {
      aim.elSignalsBevCont.elem.style.display = 'none';
      [...el.parentElement.children].forEach(el => el.removeAttribute('selected'));
      el.setAttribute('selected','')
      if (el = document.getElementById(el.innerText)) {
        [...el.parentElement.children].forEach(el => el.style.display = 'none');
        el.style.display = '';
      }
      // if (elTabSystem) {
      //   for (var i = 0, e, c = elTabSystem.children; e = c[i]; i++) {
      //     if (e.elTabsBottomControlWeg) {
      //       e.style.display = e.elTabsBottomControlWeg === this ? '' : 'none';
      //     }
      //   }
      // }
    }
    $(document.documentElement).class('gui');
    $(document.body).class('col gui').append(
      $('div').class("row bartop").id("elBartop").append(
        $('div').id('btnbar'),
        aim.elemTitle = $('span'),
        aim.timeElem = $('span').style('margin-left:auto'),
        // $('span').text($().access.name, { style: 'margin-left:auto;margin-right:5px;'}),
        $('span').class('close'),
      ),
      $('div').class("row paneltop").append(
        elButtonpanel = $('ul').class("col").id("elButtonpanel"),
        elOverview = $('ul').class("aco overview").id("elOverview").append(
          $('img').src("img/bg_detail.png"),
          viewpanel = $('div').class("viewpanel").id("viewpanel"),
          targetpanel = $('div').class("viewpanel").id("targetpanel"),
        ),
      ),
      $('div').class("row aco").append(
        aim.elTabsLeftControl = $('div').class("row tabsControl").id("elTabsLeftControl"),
        $('div').class("row aco tabsleft").append(
          aim.elPanelTree = $('ul').class("col panel").id("elPanelTree"),
          aim.elPanel = $('ul').class("col panel aco").id("elPanel"),
        ),
        $('div').class("col panelright").append(
          $('div').class("col aco signals").append(
            $('div').class("row").append(
              $('span').text('Onbevestigde meldingen'),
              $('a').class('button gray check l'),
              $('a').class('button gray checkCam'),
              $('a').class('button gray checkAll r'),
              $('a').class('button gray ond l r '),
              $('a').class('button gray toon l r '),
              $('a').class('button gray notitie l r '),
              $('a').class('button gray showOnd l r '),
            ),
            $('ul').class("col signalrows").append(
              $('li').class("row").append(
                $('span').text('Type'),
                $('span').text('Cam'),
                $('span').text('Tijdstip'),
                $('span').text('Locatie'),
                $('span').text('Melding'),
                $('span').text('Ond'),
                $('span').text('Notitie'),
              ),
            ),
            $('ul').class("col signalrows aco").id("elSignals"),
            aim.elSignalsBevCont = $('div').id("elSignalsBevCont").class("col aco").append(
              $('div').style("line-height:31px;").text('Bevestigde meldingen'),
              $('ul').class("col signalrows aco").id("elSignalsBev"),
              $('div').class('row check').style("line-height:30px;").append(
                [].concat(...alarmTypes.map(name => [
                  $('input').type('checkbox').id(name),
                  $('label').class(name).text(name.replace(/_/g, ' ')).for(name),
                ]))
              )
            ),
          ),
          aim.tabsBottom = $('div').id("elTabsBottom").class("col").append(
            $('div').id('Meldingen').class('row').style('display:none;'),
            $('div').id('Verkeer').class('row tab verkeer').style('display:none;').append(
              $('div').class('baaninfo col').append(
                $('div').class('row aco').append(
                  $('div').class('col').append(
                    $('div').text('Re'),
                  ),
                  $('div').class('col').append(
                    elReFlow = $('div').class('flow').text('25'),
                    elReLight = $('div').class('light').text('7'),
                    elReSound = $('div').class('sound'),
                    elReRDS = $('div').class('rds'),
                  ),
                ),
                $('div').class('row aco ').append(
                  $('div').class('col').append(
                    $('div').text('MTK'),
                  ),
                  $('div').class('col').append(
                    elMtkStuur = $('div').class('stuur'),
                    elMtkLight = $('div').class('light'),
                    elMtkSound = $('div').class('sound'),
                  ),
                ),
                $('div').class('row aco').append(
                  $('div').class('col').append(
                    $('div').class('', 'Wi')
                  ),
                  $('div').class('').append(
                    elLiFlow = $('div').class('flow').text('25'),
                    elLiLight = $('div').class('light').text('0'),
                    elLiSound = $('div').class('sound'),
                    elLiRDS = $('div').class('rds'),
                  ),
                ),
              ),
              elDetailContainer = $('div').class('aco detail').on('scroll', event => {
                var scaleHeight = elDetailContainerChild.offsetHeight / elOverview.offsetHeight;
                var scaleWidth = elDetailContainerChild.clientWidth / elOverview.clientWidth;
                viewpanel.style.top = (elDetailContainer.scrollTop / (elDetailContainer.scrollHeight - elDetailContainer.offsetHeight) * (elOverview.offsetHeight - viewpanel.offsetHeight)) + 'px';
                viewpanel.style.left = (elDetailContainer.scrollLeft / (elDetailContainer.scrollWidth - elDetailContainer.offsetWidth) * (elOverview.offsetWidth - viewpanel.offsetWidth)) + 'px';

                if (elDetailContainer.scrollTop < 200) {
                  weg = 'N2';
                  kmsl = Math.round(((elDetailContainer.scrollLeft / 118) + 63) * 10) / 10;
                  kmsr = kmsl - 0.6;
                }
                else {
                  weg = 'A2';
                  kmsl = Math.round(((elDetailContainer.scrollLeft / 118) + 110) * 10) / 10;
                  kmsr = kmsl + 0.6;
                }

                function writekm(naam, weg, kms) {
                  with (document.getElementById(naam)) {
                    children[0].innerText = weg;
                    children[1].innerText = kms;
                  }
                }
                writekm('kmblb', weg + ' Li', (kmsl).toFixed(1));
                writekm('kmbrb', weg + ' Li', (kmsr).toFixed(1));
                writekm('kmblo', weg + ' Re', (kmsl).toFixed(1));
                writekm('kmbro', weg + ' Re', (kmsr).toFixed(1));

                elReFlow.innerText = Math.round(Math.random() * 3);
                elReLight.innerText = Math.round(Math.random() * 3);
                elReSound.innerText = Math.round(Math.random() * 3);
                elReRDS.innerText = Math.round(Math.random() * 3);
                elMtkStuur.innerText = Math.round(Math.random() * 3);
                elMtkLight.innerText = Math.round(Math.random() * 3);
                elMtkSound.innerText = Math.round(Math.random() * 3);
                elLiFlow.innerText = Math.round(Math.random() * 3);
                elLiLight.innerText = Math.round(Math.random() * 3);
                elLiSound.innerText = Math.round(Math.random() * 3);
                elLiRDS.innerText = Math.round(Math.random() * 3);
              }).append(
                elDetailContainerChild = $('div').class('col').style('height:800px;width:' + (840 * 8) + 'px;').append(
                  $('img').src("img/bg_detail.png"),
                )
              ),
              $('div').class('kmb col').id('kmblb').append(
                $('span').text('A2 m'),
                $('span').text('30,2'),
              ),
              $('div').class('kmb col').id('kmbrb').append(
                $('span').text('A2 Re'),
                $('span').text('30,2'),
              ),
              $('div').class('kmb col').id('kmblo').append(
                $('span').text('A2 m'),
                $('span').text('30,2'),
              ),
              $('div').class('kmb col').id('kmbro').append(
                $('span').text('A2 Li'),
                $('span').text('30,2'),
              ),
              $('div').class('btndetailnav').id('btnup').on('click', event => elDetailContainer.scrollTop = 0),
              $('div').class('btndetailnav').id('btndown').on('click', event => elDetailContainer.scrollTop = 10000),
              $('div').class('btndetailnav').id('btnright').on('click', event => elDetailContainer.scrollLeft += elDetailContainer.clientWidth/2),
              $('div').class('btndetailnav').id('btnleft').on('click', event => elDetailContainer.scrollLeft -= elDetailContainer.clientWidth/2),
            ),
            aim.elTabSystem = $('ul').class('col tab system').style('display:none;'),
          ),
          aim.tabsBottom.control = $('div').class("row tabsControl").id("elTabsBottomControl").append(
            $('a').text('Meldingen').attr('selected','').on('click', function(event) {
              tabSelect(this);
              aim.elSignalsBevCont.elem.style.display = '';
            }),
            aim.buttonVerkeer = $('a').class('verkeer').text('Verkeer').attr('selected','').on('click', function(event) {
              tabSelect(this);
            }),
          ),
        ),
      ),
      $('div').id("popupselect")
    )


    if ($().body) {
      var topId = $().body.sub;
      $().value = $().body.value.map(item => $(item));
    } else {
      aim.elemTitle.text('LOADING CONFIGURATION DATA');
      var topId = $().authProvider().sub;// 2804342;
      // await $().login();
      if (!topId) return;
      await $().api('/').query('request_type', 'build_data').query('id', topId).get().then(event => $().extend(event.body));
    }

    // console.log('topId', $().body, topId);

    let items = $().value;
    items.forEach(item => item.data.children = items.filter(child => child.data.MasterID === item.data.ID && child.data.ID !== item.data.ID))



    // let item = aim.get($().authProvider().sub);
    const item = items.find(item => item.ID == topId);
    console.log('ITEM', item);



    const itemTunnel = item;

    aim.elemTitle.text($().info ? $().info.title + ' ' + $().info.description : '');

    aim.buttonVerkeer.elem.click()
    Object.entries(menu).forEach(([name1,topmenuitem]) => $('li').parent(aim.elPanelTree).append(
      topmenuitem.elLI = $('div').class('row sumitems').open(0).append(
        $('span').text(topmenuitem.title || name1),
        $('i').class('icon sum deelsysteem_alarm'),
        $('i').class('icon sum verkeerskundig'),
        $('i').class('icon sum hand'),
      ),
      $('ul').class('col').append(
        Object.entries(topmenuitem.children).map(([name2,menuitem]) => {
          menuitem.parent = topmenuitem;
          function onopen() {
            console.log(this.items);
            with (this.tabpanel = elPanel.createElement('LI', this.id, { bedieningswijze: this.values && this.values.bedieningswijze ? this.values.bedieningswijze.title || this.values.bedieningswijze || '' : '' } )) {
              with (createElement('DIV', 'row', { open: 1 })) {
                createElement('SPAN', '', this.menuitem.title || this.menuitem.name);
                with (createElement('DIV', 'btns')) {
                  createElement('A', 'btn_auto', { item: this, onclick: function (event) {
                    event.stopPropagation();
                    Gui.msgSend({ id: this.item.id, method: { SetOpAutobediening: [] } });
                  }});
                  createElement('A', 'btn_hand', { item: this, onclick: function (event) {
                    event.stopPropagation();
                    Gui.msgSend({ id: this.item.id, method: { SetOpHandbediening: [] } });
                  }});
                }
                //if (!level) createElement('A', { className: 'close' });
              }
              with (this.elUl = createElement('ul')) {
                //if (this.control) {
                //	var variabelen = this.control.variabelen;
                //	for (var name in variabelen) {
                //		var prop = variabelen[name];
                //		if (prop.gui) with (createElement('DIV', { className: 'row' })) {
                //			if (name in this.values) this.tabpanel.setAttribute(name, getvalue(this, name));
                //			createElement('SPAN', { className: 'aco', innerText: prop.title });
                //			createElement('SPAN', {
                //				className: 'selectpo ' + this.id + '_' + name, innerText: String(getvalue(this, name)).replace(/_/g, ' ').capitalize(), item: this, enum: variabelen[prop.Gui.selectvariabele].enum, bediening: prop.Gui.bediening,
                //				onclick: function () {
                //					var options = this.enum.split('|');
                //					var rect = this.getBoundingClientRect();
                //					var span = this;
                //					with (popupselect) {
                //						options.forEach(function (option) {
                //							//console.log(span, span.item, span.bediening);
                //							createElement('DIV', {
                //								value: option, innerText: String(option.replace(/_/g, ' ')).capitalize(), span: span, onclick: function () {
                //									Gui.msgSend({ id: this.span.item.id, method: { [this.span.bediening]: [this.value] } });
                //									popupselect.innerText = '';
                //								}
                //							});
                //						});
                //						style.left = (rect.right - popupselect.offsetWidth) + 'px';
                //						style.top = rect.top + 'px';
                //					}
                //				}
                //			});
                //		}
                //	}
                //}
                if (this.items) this.items.forEach(function (item) {
                  with (item.elLI = createElement('LI')) {
                    with (createElement('DIV', 'row sumitems', { items: [item], open: 0 })) {
                      createElement('SPAN', '', item.title || item.name);
                      createElement('icon', 'icon sum deelsysteem_alarm');
                      createElement('icon', 'icon sum verkeerskundig');
                      createElement('icon', 'icon sum hand');
                    }
                    (addchildren = function (item) {
                      if (!item.children) return;
                      with (item.elLI.createElement('ul')) {
                        item.children.forEach(function (child) {
                          with (child.elLI = createElement('LI')) {
                            with (createElement('DIV', 'row sumitems', { items: [child], open: 0 })) {
                              createElement('SPAN', '', child.title || child.name);
                              createElement('icon', 'icon sum deelsysteem_alarm');
                              createElement('icon', 'icon sum verkeerskundig');
                              createElement('icon', 'icon sum hand');
                            }
                            addchildren(child);
                          }
                        });
                      }
                    })(item);
                  }
                });
              }
            }
            Gui.sumSignals();
          }
          menuitem.name = name2;
          menuitem.elUL = $('ul').parent(aim.elPanel).class('col');
          return $('li').append(
            menuitem.elLI = $('div').class('row sumitems').open(0).on('open', onopen).append(
              $('i').class('icon sum bb'),
              $('i').class('icon sum deelsysteem_alarm'),
              $('i').class('icon sum verkeerskundig'),
              $('i').class('icon sum hand'),
              $('span').text(menuitem.title || name2),
            ),
          )
        })
      )
    ))
    const schemas = $().get('schemas');
    items.forEach(item => {
      // waarom dit
      return;
      item.name = [item.schema, item.schema, item.id].join('_');
      item.className = [item.schema, item.schema, item.id].join(' ');
      if (em.definitions[item.schema]) {
        (api.components.schemas[item.schema] = api.components.schemas[item.schema] || {}).control = em.definitions[item.schema];
      }
      //if (Gui.definitions[item.schema]) (api.components.schemas[item.schema] = api.components.schemas[item.schema] || {}).gui = Gui.definitions[item.schema];
      // console.log($().get('schemas'))
      if (schemas.get(item.schema)) {
        // Object.assign(item, $().components.schemas[item.schema]);
        if (item.gui) {
          // console.log(item);
          Gui.itemids[item.id] = item;
          //if (item.gui.construct) item.gui.construct.call(item);
        }
      }
      // $().ref[item.id] = item;
      return item;
    });
    items.forEach(item => {
      // waarom dit
      return;
      if (item.masterID && $().ref[item.masterID]) {
        item.master = $().ref[item.masterID];
        if (Object.prototype.toString.call(item.master[item.schema]) === '[object Array]') item.master[item.schema].push($().ref[item.id]);
        else item.master[item.schema] = $().ref[item.id];
      }
    });



    function sumSignals() {
      (sumsignals = function (item) {
        item.signals = {
          deelsysteem_alarm: 0,
          deelsysteem_alarm_active: 0,
          deelsysteem_storing: 0,
          deelsysteem_storing_active: 0,
          status_melding: 0,
          status_melding_active: 0,
        }
        for (var name in item.properties) {
          var prop = item.properties[name];
          if (prop.stereotype === "signalering") {
            if (item[name]) {
              item.signals[prop.type]++;
              if (item[name].value) item.signals[prop.type + '_active']++;
            }
          }
        }
        if (item.children) item.children.forEach(sumsignals);
        if (item.master && item.master.signals) for (var name in item.signals) item.master.signals[name] += item.signals[name];
        //console.log(item.title, item.signals);
      })(itemTunnel);

      for (var i = 0, el, c = document.getElementsByClassName('sumitems') ; el = c[i]; i++) {
        if (!el.items) continue;
        var signals = {
          deelsysteem_alarm: 0,
          deelsysteem_alarm_active: 0,
          deelsysteem_storing: 0,
          deelsysteem_storing_active: 0,
          status_melding: 0,
          status_melding_active: 0,
        };
        el.items.forEach(function (item) {
          for (var name in item.signals) signals[name] += item.signals[name];
        });
        for (var name in signals) el.setAttribute(name, signals[name]);
      }
    }

    setInterval(event => $(document.body).attr('blink', aim.blink^= 1), 1000);
    setInterval(event => aim.timeElem.text(new Date().toLocaleTimeString()), 1000);

    item.elDetail = elDetailContainerChild;
    item.elOverview = elOverview;

    const tabsLeft = [];
    items.filter(item => item.schemaName === 'Verkeersbuis').forEach(item => {
      // (aim.elTabsLeftControlBuis.items = aim.elTabsLeftControlBuis.items || []).push(item);
        //Gui.createPanelTreeItem('Buis');
        //Gui.createPanelTreeItem('Verkeer');
        //Gui.elementSignalCount.push(Gui.elTabsLeftControlBuis);


      var treeitems = [];
      tabsLeft.push({
        name: item.data.Tag.Value,
        treeitems: 'Buis,Vluchtroute,Tunnel,Verkeer,Detecties,Overig'.split(','),
        filter: 'HLi,Tunnel'.split(','),
      })
      var pdRoodUit = function () { }
      let kanaalID = 0;
      function setCam(camID) {
        const cam = webcam.cams[camID];
        console.log(camID, webcam.cams, cam);
        webcam.send('SETWALL', {target: channels[kanaalID].id, cam: cam.cam } );
      }
      function camNext () {
        setCam(channels[kanaalID].camID = Math.min(webcam.cams.length-1, 'camID' in channels[kanaalID] ? channels[kanaalID].camID + 1 : 0));
        // return;
        // // $().messenger.send({ to: [$().client.domain.id], kanaal: this.kanaalID, cam: CCTV.kanalen[this.kanaalID].cameraID = Math.min(CCTV.cameras.length - 1, CCTV.kanalen[this.kanaalID].cameraID + 1) });
        // $().ws.request({
        // 	from:'gui',
        // 	method:'POST',
        // 	path: `/kanaal(${this.kanaalID})/camera(${$().kanalen[this.kanaalID].cameraID = Math.min($().cameras.length - 1, $().kanalen[this.kanaalID].cameraID + 1)})`
        // });
      };
      function camPrior () {
        setCam(channels[kanaalID].camID = Math.max(0, 'camID' in channels[kanaalID] ? channels[kanaalID].camID - 1 : 0));
        // const camID = channels[kanaalID].camID = channels[kanaalID].camID ? channels[kanaalID].camID - 1 : 0;
        // webcam.send('SETWALL', {target: channels[kanaalID].id, cam: cams[camID].cam } );
        // return;
        // // $().messenger.send({ to: [$().client.domain.id], kanaal: this.kanaalID, cam: CCTV.kanalen[this.kanaalID].cameraID = Math.max(0, CCTV.kanalen[this.kanaalID].cameraID - 1) });
        // $().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})/camera(${$().kanalen[this.kanaalID].cameraID = Math.max(0, $().kanalen[this.kanaalID].cameraID - 1)})` });
      }
      function kanaalNext () {
        kanaalID = Math.min(channels.length, kanaalID + 1);
        console.debug(kanaalID);
        // $().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})` });
      };
      function kanaalPrior () {
        kanaalID = Math.max(0, kanaalID - 1);
        console.debug(kanaalID);
        // $().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})` });
      }
      function presetSet (presetID) {
        // $().messenger.send({ to: [$().client.domain.id], kanaal: this.kanaalID, cam: CCTV.kanalen[this.kanaalID].cameraID, preset: presetID });
        $().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})/camera(${$().kanalen[this.kanaalID].cameraID})/preset(${presetID})` });
      }
      function btnKeydown (event) {
        switch (event.key) {
          case 'ArrowUp': this.camNext(); break;
          case 'ArrowDown': this.camPrior(); break;
          case 'ArrowRight': this.kanaalNext(); break;
          case 'ArrowLeft': this.kanaalPrior(); break;
          case '1': this.presetSet(0); break;
          case '2': this.presetSet(1); break;
          case '3': this.presetSet(2); break;
          case '4': this.presetSet(3); break;
          case '5': this.presetSet(4); break;
          case '6': this.presetSet(5); break;
          default: return;
        }
        event.preventDefault();
      };
      elButtonpanel.append(
        $('div').class('row', this.id).attr('state', this.state).attr('opendicht', this.open).append(
          $('span').class('title').text(this.title),
          $('button').class('button c l r'),
          $('span').class('status'),
          $('span').class('pd'),
          $('span').class('opendicht'),
          $('button').class('button rood l'),
          $('button').class('button down s r').append(
            $('ul').class('popupselect').append(
              $('li').text('Rood').on('click', event => {
                event.stopPropagation();
                this.elPU.parentElement.removeChild(this.elPU);
                $().messenger.send({
                  to: [$().client.domain.id], value: [
                    { id: 3318023, operations: { Hand_VerkeerslichtenRood: [] } },

                    //{ id: 3375427, operations: { SetStand: ['rood'] } }, // lfv_verkeerslichten_1
                    //{ id: 3375446, operations: { SetStand: ['rood'] } }, // lfv_verkeerslichten_2
                    //{ id: 3375454, operations: { SetStand: ['rood'] } }, // lfv_verkeerslichten_3
                  ]
                });
              }),
              $('li').text('Gedoofd').on('click', event => {
                event.stopPropagation();
                this.elPU.parentElement.removeChild(this.elPU);
                $().messenger.send({
                  to: [$().client.domain.id], value: [
                    { id: 3318023, operations: { Hand_VerkeerslichtenGedoofd: [] } },
                  ]
                });
              }),
            )
          ),
          $('button').class('button sluit l').append(
            $('ul').class('popupselect').append(
              $('li').text('Sluit').on('click', event => {
                event.stopPropagation();
                item.setVerkeerslichtenHandStandRood();
                this.elPU.remove();
              }),
              $('li').text('Gedoofd').on('click', event => {
                event.stopPropagation();
                item.setVerkeerslichtenHandStandGroen();
                this.elPU.remove();
              }),
            )
          ),
          $('button').class('button open r').on('click', event => {
            item.setVerkeerslichtenHandStandGroen();
            // VerkeersbuisAfsluiter().Hand_VerkeerslichtenGedoofd();
          }),
          $('button').class('button kijk l'),
          $('button').class('button down s r'),
          $('button').class('button links l').on('click', camPrior).on('keydown', btnKeydown),
          $('button').class('button rechts r').on('click', camNext).on('keydown', btnKeydown),
        )
      )

      elOverview.append(
        $('li').class('buis').append(
          $('div'),
          $('ul').append(
            item.data.children.map(item => $('li').class(item.schemaName).append(
              $('div')
            ))
          )
        )
      )
      elDetailContainerChild.append(
        $('li').class('buis').append(
          $('div'),
          $('ul').append(
            item.data.children.map(item => $('li').class(item.schemaName).append(
              $('div')
            ))
          )
        )
      )
    });


    console.log($().schemas());

    (function build(item, level) {
      // if (item.ID === 10) return;
      // console.log(new Date().valueOf()-st, `step${i++} ${level}`);
      console.log('build', level, item.tag, item.data.schemaPath);
      if (item.schemaName === 'Weg') {
        //Gui.createPanelTreeItem('Vluchtroute');
        Gui.elTabsBottomControlWeg = elTabsBottomControl.createElement('A', '', item.name, { onclick: tabclick, elTab: elTabSystem });
      }

      if (item.mnu) {
        var menuitem = $().Gui.menuitems[item.mnu];
        if (menuitem && menuitem.elLI) {
          (menuitem.elLI.items = menuitem.elLI.items || []).push(item);
          //console.log('>>>>>>>>>>', menuitem.parent);
          if (menuitem.parent && menuitem.parent.elLI) (menuitem.parent.elLI.items = menuitem.parent.elLI.items || []).push(item);
          //Gui.sumSignals();
          //return;

        }
      }

      var systemRow = $().Gui.systemRows[item.schema];
      if (systemRow) {
        if (item.schema === 'Dienstgebouw') systemRow.elTabsBottomControlWeg = elTabsBottomControlDGB;
        with (systemRow.elLI = elTabSystem.createElement('LI', 'row', { elTabsBottomControlWeg: systemRow.elTabsBottomControlWeg || Gui.elTabsBottomControlWeg })) {
          createElement('DIV', '', item.name);
          with (elRowSystem = createElement('DIV', 'row a aco')) {
            for (var i in systemRow.items) {
              with (elRowSystem = createElement('DIV', 'col')) {
                for (var name in systemRow.items[i]) {
                  createElement('A', '', name );
                }
              }
            }
          }
        }
      }

      function createGuiElement(element, params, child) {
        const childElement = element.createElement(params);
        [...element.attributes].forEach(attribute => {
          const key = attribute.name[0].toUpperCase() + attribute.name.substr(1);
          if (key in child) {
            const value = String(child[key]);
            if (value) {
              childElement.setAttribute(attribute.name, value);
              // console.log(attribute.name, value);
            }
          }
        });
      }

      const children = item.data.children;
      // console.log(item, item.data.children, children);
      // console.log('children', children);
      if (children) {
        item.elDetailUL = $('ul').parent(item.elDetail);
        // console.log(item.Children);
        children.forEach(child => {
          if ('selected' in child && child.selected === 0) return;
          // console.log(level, child.idx, child.id, child.schema, child.title);
          child.elDetail = $('li').parent(item.elDetailUL);//, child.$id, {item: child, onmouseup: Gui.showpanel, });
          child.elOverview = $('li').parent(item.elOverview);//.createElement('LI', child.$id, {item: child, onmouseup: Gui.showpanel });
          if (child.gui) {
            if (child.gui.detail) {
              createGuiElement(child.elDetail, child.gui.detail, child);
            }
            if (child.gui.global) {
              createGuiElement(child.elOverview, child.gui.global, child);
            }
            if (child.gui.mnu && menu[child.gui.mnu]) {
              with (menu[child.gui.mnu].elUL.createElement('LI')) {
                createElement('DIV', 'row', child.title);
              }
            }
          }
          build(child, level + 1);
        });
      }
    })(item, 0);

    tabsLeft.push({
      name: 'DGB',
      treeitems: 'Tunnel,Detecties,Overig,DGB'.split(','),
      filter: 'DGB,Tunnel'.split(','),
    })

    // treeitems zijn de ietems die bij de tab selectie getoont moeten worden.
    aim.elTabsLeftControl.append(
      tabsLeft.map(tab =>
        $('a')
        .class('row sumitems')
        .attr('selected', this.selected ? 1 : null)
        .append(
          $('div').class('row aco').append(
            //verkeerskundig, deelsysteem_alarm, deelsysteem_storing, statusmelding
            $('i').class('icon sum hand'),
            $('i').class('icon sum verkeerskundig'),
            $('i').class('icon sum deelsysteem_alarm'),
            $('span').class(this.dir || '').text(tab.name),
          )
        )
        .on('click', event => {
          [...elTabsLeftControl.children].forEach(e => e.removeAttribute('selected'));
          this.setAttribute('selected', '');
          for (var name1 in menu) {
            menu[name1].elLI.style.display = 'none';
          }
          for (var i = 0, name1; name1 = this.treeitems[i]; i++) {
            menu[name1].elLI.style.display = '';
          }
          sumSignals();
        })
      )
    )

    return;
    console.error("Verkeerslicht", Verkeerslicht[0].properties.Stand.setValue);

    item.elDetail = elDetailContainerChild;
    item.elOverview = elOverview;
    elMenu = {};
    var tabsLeftClick = function () {
      [...elTabsLeftControl.children].forEach(e => e.removeAttribute('selected'));
      this.setAttribute('selected', '');
      for (var name1 in menu) {
        menu[name1].elLI.style.display = 'none';
      }
      for (var i = 0, name1; name1 = this.treeitems[i]; i++) {
        menu[name1].elLI.style.display = '';
      }
      Gui.sumSignals();
    }
    with (elTabsLeftControlDGB = elTabsLeftControl.createElement('A', 'row sumitems', { selected: this.selected ? 1 : null, treeitems: 'Tunnel,Detecties,Overig,DGB'.split(','), onclick: tabsLeftClick })) {
      with (createElement('DIV', 'row aco')) {
        //verkeerskundig, deelsysteem_alarm, deelsysteem_storing, statusmelding
        createElement('icon', 'icon sum hand');
        createElement('icon', 'icon sum verkeerskundig');
        createElement('icon', 'icon sum deelsysteem_alarm');
        createElement('SPAN', this.dir || '', 'DGB');
      }
    }
    //var treeitems = [];
    elTabsBottomControlDGB = elTabsBottomControl.createElement('A', '', 'DGB', { onclick: tabclick, elTab: aim.elTabSystem });

    //Gui.createPanelTreeItem('Tunnel');
    //Gui.createPanelTreeItem('Overig');
    //Gui.createPanelTreeItem('Detecties');
    // console.log(new Date().valueOf()-st, `step${i++}`);


    (function build(item, level) {
      // console.log(new Date().valueOf()-st, `step${i++} ${level}`);


      // console.log(item.schema);
      if (item.schema === 'Weg') {
        //Gui.createPanelTreeItem('Vluchtroute');
        Gui.elTabsBottomControlWeg = elTabsBottomControl.createElement('A', '', item.name, { onclick: tabclick, elTab: elTabSystem });
      }

      if (item.schema === 'Verkeersbuis') {
        //Gui.createPanelTreeItem('Buis');
        //Gui.createPanelTreeItem('Verkeer');
        elBuisButtonPanel = GUI.addButtonPanel.call({ title: item.name });
        var treeitems = [];
        with (Gui.elTabsLeftControlBuis = elTabsLeftControl.createElement('A', 'row sumitems', { selected: this.selected ? 1 : null, treeitems: 'Buis,Vluchtroute,Tunnel,Verkeer,Detecties,Overig'.split(','), onclick: tabsLeftClick })) {
          with (createElement('DIV', 'row aco')) {
            //verkeerskundig, deelsysteem_alarm, deelsysteem_storing, statusmelding
            createElement('icon', 'icon sum hand');
            createElement('icon', 'icon sum verkeerskundig');
            createElement('icon', 'icon sum deelsysteem_alarm');
            createElement('SPAN', this.dir || '', item.title.substr(0, 3));
          }
        }
        //Gui.elementSignalCount.push(Gui.elTabsLeftControlBuis);
      }
      if (Gui.elTabsLeftControlBuis) {
        (Gui.elTabsLeftControlBuis.items = Gui.elTabsLeftControlBuis.items || []).push(item);
      }

      if (item.mnu) {
        var menuitem = $().Gui.menuitems[item.mnu];
        if (menuitem && menuitem.elLI) {
          (menuitem.elLI.items = menuitem.elLI.items || []).push(item);
          //console.log('>>>>>>>>>>', menuitem.parent);
          if (menuitem.parent && menuitem.parent.elLI) (menuitem.parent.elLI.items = menuitem.parent.elLI.items || []).push(item);
          //Gui.sumSignals();
          //return;

        }
      }

      var systemRow = $().Gui.systemRows[item.schema];
      if (systemRow) {
        if (item.schema === 'Dienstgebouw') systemRow.elTabsBottomControlWeg = elTabsBottomControlDGB;
        with (systemRow.elLI = elTabSystem.createElement('LI', 'row', { elTabsBottomControlWeg: systemRow.elTabsBottomControlWeg || Gui.elTabsBottomControlWeg })) {
          createElement('DIV', '', item.name);
          with (elRowSystem = createElement('DIV', 'row a aco')) {
            for (var i in systemRow.items) {
              with (elRowSystem = createElement('DIV', 'col')) {
                for (var name in systemRow.items[i]) {
                  createElement('A', '', name );
                }
              }
            }
          }
        }
      }

      function createGuiElement(element, params, child) {
        const childElement = element.createElement(params);
        [...element.attributes].forEach(attribute => {
          const key = attribute.name[0].toUpperCase() + attribute.name.substr(1);
          if (key in child) {
            const value = String(child[key]);
            if (value) {
              childElement.setAttribute(attribute.name, value);
              // console.log(attribute.name, value);
            }
          }
        });
      }

      const children = item.children;
      // console.log('children', children);
      if (children) {
        item.elDetailUL = item.elDetail.createElement('ul');
        // console.log(item.Children);
        children.forEach(child => {
          if ('selected' in child && child.selected === 0) return;
          // console.log(level, child.idx, child.id, child.schema, child.title);
          child.elDetail = item.elDetailUL.createElement('LI', child.$id, {item: child, onmouseup: Gui.showpanel, });
          child.elOverview = item.elOverview.createElement('LI', child.$id, {item: child, onmouseup: Gui.showpanel });
          if (child.gui) {
            if (child.gui.detail) {
              createGuiElement(child.elDetail, child.gui.detail, child);
            }
            if (child.gui.global) {
              createGuiElement(child.elOverview, child.gui.global, child);
            }
            if (child.gui.mnu && menu[child.gui.mnu]) {
              with (menu[child.gui.mnu].elUL.createElement('LI')) {
                createElement('DIV', 'row', child.title);
              }
            }
          }
          build(child, level + 1);
        });
      }
    })(item, 0);

    elTabsLeftControlDGB.parentElement.appendChild(elTabsLeftControlDGB);
    elTabsBottomControlDGB.parentElement.appendChild(elTabsBottomControlDGB);
    console.log($().Gui.systemRows);
    // $().Gui.systemRows.Tunnel.elLI.parentElement.appendChild($().Gui.systemRows.Tunnel.elLI);
    // $().Gui.systemRows.Tunnel.elLI.style.marginTop = 'auto';

    console.log(new Date().valueOf()-st, `step${i++}`);

    elTabsLeftControl.firstChild.click();
    //setInterval(function () {
    //	document.body.setAttribute('blink1',Gui.blibk^=1);
    //}, 500);
    Gui.loaded = true;
    Gui.sumSignals();
    console.log($().Gui.menuitems);
    //console.log(item.Verkeersbuis[0].Verkeerslicht[0].sf_Verkeerslicht_Verkeersbuis.Alarm_VerkeersbuisVerkeerslichtStoringGroen);3375440;

    console.log(new Date().valueOf()-st, `step${i++}`);

    //GUI.addButtonPanel.call({ title: 'H Re' });
    //GUI.addButtonPanel.call({ title: 'H Li' });
    //GUI.addButtonPanel.call({ title: 'P Re' });
    //GUI.addButtonPanel.call({ title: 'P Li' });


    // $(document.body).text('').class('col gui').append(
    //   $('div').class('row bartop').id('elBartop').append(
    //     $('div').id('btnbar')
    //   ),
    //   $('div').class('row paneltop').append(
    //     $('ul').class("col").id("elButtonpanel"),
    //   )
    // )
    // console.error("Verkeerslicht", Verkeerslicht[0].properties.Stand.setValue);
  })
})();
