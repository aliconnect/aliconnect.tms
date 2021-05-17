(function() {
	AIM.extend({
		docs:{
			vraagspecificatie_eisen_reht: function() {
				content.innerText = '';
				AIM.httpRequest('/eht/docs/Vraagspecificatie Eisen REHT.json', (event) => {
					console.log(event.body);
					var eisen = event.body;
					var top = {
						titel: 'Systeem eisen',
						eisnr: 'SYS',
						eisonder : [],
					};
					for (var eisID in eisen) {
						var eis = eisen[eisID];
						if (!eis) continue;
						eis.titel = String(eis.titel && eis.titel.trim() ? eis.titel.trim() : eis.eisnr).replace(/\n|\r/g,'');
						if ('eisboven' in eis) continue;
						top.eisonder.push(eisID);
					}
					content.createElement('H1', 'Index');
					var elIndex = content.createElement('OL').createElement('LI');
					content.createElement('H1', 'Eisen');
					elEisen = content.createElement('DIV');
					content.createElement('H1', 'V&V');
					elVV = content.createElement('DIV');
					content.createElement('H1', 'Stakeholders');
					elStakeholders = content.createElement('DIV');

					(eislist = function(eis, el, level) {
						el.createElement('A', {href: '#' + eis.eisnr, innerText : eis.eisnr + ' ' + eis.titel });
						// document.body.createElement('H'+level, {innerText: el.innerText })
						elEisen.createElement('A', {name: eis.eisnr });
						elEisen.createElement('H2', {innerText: eis.titel });
						if (eis.description) elEisen.createElement('P', {innerText: eis.description.trim().replace(/\n|\r/g,'') });
						var elUlIndex = elEisen.createElement('UL', {className:'table'});
						elUlIndex.createElement('LI', ['LABEL','EisID'],['SPAN',eis.eisnr]);
						if (eis.eisboven) {
							var elPath = elUlIndex.createElement('LI', ['LABEL','Eisen structuur boven']).createElement('OL');
							for (var eisbovenID = eis.eisboven, eisboven; eisboven = eisen[eisbovenID]; eisbovenID = eisboven.eisboven) {
								if (!eisboven) break;
								elPath.createElement('LI').createElement('A', {href: '#' + eisbovenID, innerText: eisboven.titel });
							}
						}
						if (eis.eisonder) {
							var elBodyUL = elUlIndex.createElement('LI', ['LABEL','Onderliggende eisen']).createElement('OL');
							var elUL = el.createElement('OL');
							for (var i=0, eisonderID; eisonderID = eis.eisonder[i]; i++) {
								var eisonder = eisen[eisonderID];
								if (eisonder) {
									elBodyUL.createElement('LI').createElement('A', {href: '#' + eisonderID, innerText: eisonder.titel });
									eislist(eisonder,elUL.createElement('LI'), level+1);
								}
								else {
									elBodyUL.createElement('LI').createElement('A', {innerText: eisonderID + ' DETAILS NIET BESCHIKBAAR' });
									elUL.createElement('LI', {innerText: eisonderID + ' DETAILS NIET BESCHIKBAAR'})
								}
							}
						}
						if (eis.voorwaarden) {
							var elOL = elUlIndex.createElement('LI', ['LABEL','Voorwaarden']).createElement('UL');
							for (var i=0,voorwaarde;voorwaarde=eis.voorwaarden[i];i++) {
								var elUL = elOL.createElement('LI').createElement('UL');
								for (var attributeName in voorwaarde) {
									var attributeValue = voorwaarde[attributeName].trim().replace(/\n|\r/g,'').replace(/  /g,' ');
									if (attributeName.includes('moment')) {
										if (!elVV[attributeValue]) {
											elVV.createElement('A',{name:attributeValue });
											elVV.createElement('H2',{innerText:attributeValue });
											elVV[attributeValue] = elVV.createElement('UL');
										}
										elVV[attributeValue].createElement(
											'LI',
											['A', {href: '#' + eis.eisnr, innerHTML: eis.titel }],
											['DIV', voorwaarde['Type V&V-methode'] || ''],
											['DIV', voorwaarde['Criterium'] || ''],
											['DIV', voorwaarde['Toelichting op aanpak V&V'] || ''],
										);
										elUL.createElement('LI',{innerText: attributeName + ': '}).createElement('A', {href: '#' + attributeValue, innerText: attributeValue });
									}
									else {
										elUL.createElement('LI',{innerText: attributeName + ': ' + attributeValue });
									}
								}
							}
						}
						if (eis.brondocument) elUlIndex.createElement('LI', ['LABEL','Brondocument'], ['SPAN',eis.brondocument] );
						if (eis.stakeholders) {
							if (!elStakeholders[eis.stakeholders]) {
								elStakeholders.createElement('A',{name:eis.stakeholders });
								elStakeholders.createElement('H2',{innerText:eis.stakeholders });
								elStakeholders[eis.stakeholders] = elStakeholders.createElement('UL');
							}
							elStakeholders[eis.stakeholders].createElement('LI',['A', {href: '#' + eis.eisnr, innerText: eis.titel }]);
							elUlIndex.createElement('LI',['LABEL','Stakeholder']).createElement('A', {href: '#' + eis.stakeholders, innerText: eis.stakeholders });
						}
					})(top, elIndex, 1);
					// setTimeout(AIM.createIndex,0);
				});
			},
			vraagspecificatie_eisen_reht_create: function() {
				AIM.httpRequest('/docs/rws/Vraagspecificatie Eisen REHT.htm', (event) => {
					var parser = new DOMParser();
					var content = parser.parseFromString(event.target.responseText, 'text/html').body;
					// content.innerHTML = event.target.responseText;
					data = (addnode = function(node) {
						nodeData = [];
						[...node.getElementsByTagName('TABLE')].forEach(function(el) {
							var rows = [];
							[...el.getElementsByTagName('TR')].forEach(function(el) {
								var cols = [];
								[...el.getElementsByTagName('TD')].forEach(function(el) {
									cols.push(el.innerText.trim());
								});
								rows.push(cols);
							});
							rows.el = el;
							nodeData.push(rows);
						});
						return nodeData;
					})(content);
					var eisenRows = {}, eisen={}, eis;
					data.forEach(function(table){
						table.forEach(function(row) {
							var eisnr = '';
							if (!row[0]) row.shift();
							if (row.includes('Geldigheids-')) eisnr = row[0];
							if (eisnr) eis = eisenRows[eisnr] = eisenRows[eisnr] || [];
							if (eis) eis.push(row);
						});
					});
					console.log(eisenRows);
					function maketext(s) {
						// s = s.replace(/[^\n]- /g,'\n- ');
						// s = s.replace(/[^\n]([0-9]+). /g,'\n$1. ');
						return s.trim();
					}

					for (var eisnr in eisenRows) {
						// if (eisnr != 'SYS-0334') continue;
						var eis = eisenRows[eisnr];
						var eisObj = eis.obj = eisen[eisnr]= {};
						eisObj.eisnr = eisnr;
						var row = eis.shift();
						row.shift();
						eisObj.geldig = row.pop() || row.pop() || row.pop();
						eisObj.titel = row.shift() || row.shift() || row.shift() || row.shift() || row.shift() || row.shift();
						var row = eis.shift();

						eisObj.titel += ' ' + (row.shift() || row.shift() || row.shift() || row.shift() || row.shift() || row.shift() || row.shift() || row.shift() || row.shift() || row.shift());
						eisObj.description = '';
						var attribute = 'description';
						for (var i=0, row = ''; row = eis[i]; i++) {
							if (row[0] === 'Bovenliggende') {attribute = 'boven';}
							if (row[0] === 'V&V-voorwaarden:') {attribute = 'voorwaarden'; vvAttr=''; vv = {}; eisObj.voorwaarden = [vv]; }
							if (row[0] === 'Stakeholder(s):') {attribute = 'stakeholders'; row.shift();}
							if (row[0] === 'Brondocument:') {attribute = 'brondocument'; row.shift();}
							if (attribute === 'boven') {
								var eisonder = row.pop();
								row.shift();
								var eisboven = row.shift() || row.shift();
								// if (eisid) (eisObj.eisboven = eisObj.eisboven || []).push(eisid.replace(/,/g,''));
								if (eisboven && !eisObj.eisboven && !eisboven.includes('Onder') && !eisboven.includes('eis')) eisObj.eisboven = eisboven.replace(/,/g,'');
								if (eisonder) (eisObj.eisonder = eisObj.eisonder || []).push(eisonder.replace(/,/g,''));
							}
							else {
								// var val = String(row.pop() || '').trim() || String(row.pop() || '').trim() || String(row.pop() || '').trim() || String(row.pop() || '').trim() || String(row.pop() || '').trim() || String(row.pop() || '').trim() || String(row.pop() || '').trim();
								var val = row.pop() || row.pop() || row.pop() || row.pop() || row.pop() || row.pop() || row.pop() || row.pop() || row.pop();
								if (!val) continue;
								if (attribute === 'description') {
									eisObj.description = (eisObj.description ? eisObj.description + ' ' : '') + val;
								}
								else if (attribute === 'voorwaarden') {
									var attributeName = row.pop() || row.pop() || row.pop() || row.pop() || row.pop();
									if (attributeName) {
										attributeName = attributeName.replace(/:/,'');
										if (vv[attributeName]) eisObj.voorwaarden.push(vv = {});
										vv[attributeName] = '';
										var attrName = attributeName;
									}
									vv[attrName] = (vv[attrName] ? vv[attrName] + ' ' : '') + val;
								}
								else {
									eisObj[attribute]  = (eisObj[attribute] ? eisObj[attribute] + ' ' : '') + val; //maketext((eisObj[attribute] ? eisObj[attribute] + ' ' : '') + val.trim().replace(/\r|\n/g,'').replace(/  /g,' '));
								}
							}
						}
					}

					AIM.httpRequest('/eht/docs/docimport.php', {
						query: { fname: 'Vraagspecificatie Eisen REHT' },
						post: eisen
					}, (event) => {
						console.log(event.responseText);
					});
				});
			},
			ea:{
				createSSS: function() {
					AIM.http.request('/eht/docs/ea/ea.php', (event) => {
						console.log(this, event);
						let data = this.data = event.body;
						Object.values(data.connector).forEach(function(connector){
							var start_Object = data.object[connector.Start_Object_ID];
							(start_Object.connector = start_Object.connector || []).push(connector);
						});
						content.createElement('H1', 'Package');
						Object.values(data.package).forEach(function(package){
							content.createElement('H2', package.Name);
						});
						content.createElement('H1', 'Diagram');
						elDiagramDIV = content.createElement('DIV');
						Object.values(data.diagram).forEach(function(diagram){
							elDiagramDIV.createElement('H2', diagram.Name);
							// var elUL = content.createElement('UL');
							if (diagram.object) {
								var elDiagram = elDiagramDIV.createElement('DIV',{
									style: `width:100%;background-color:#eee;`,
									go: (elDiagram) => {
										var height = 0;
										var nodedata = [], linkdata = [];
										var $ = go.GraphObject.make;  // for conciseness in defining templates
										myDiagram = $(go.Diagram, elDiagram, {
											"undoManager.isEnabled": true,  // enable undo & redo
											"animationManager.isEnabled": false,
										});

										// define a simple Node template

										figure = {
											Action: {
												fill: $(go.Brush, "Linear", { start: go.Spot.Left, end: go.Spot.Right, 0.0: "#FCF0D8", 1.0: "#F9DEA7" }),
												figure: "RoundedRectangle",
											},
											StateNode:{
												fill: "#ccc",
												figure: "Circle",
												width: 30,
												height: 30,
											}
										}

										myDiagram.nodeTemplate =
										$(
											go.Node,
											// "Auto",
											new go.Binding("location", "loc"),  // get the Node.location from the data.loc value
											$(
												go.Shape,
												{
													strokeWidth: 1,
													stroke: '#999',
													row: 1,
													// fill: $(go.Brush, "Linear", { start: go.Spot.Left, end: go.Spot.Right, 0.0: "#FCF0D8", 1.0: "#F9DEA7" }),
												},
												// new go.Binding("width", "width"),
												new go.Binding("height", "height"),
												new go.Binding("figure", "figure"),
												new go.Binding("width", "width"),
												new go.Binding("fill", "fill"),
											),
											$(
												go.TextBlock,
												// "Vertical",
												{
													// margin: 5,
													font: "10px sans-serif",
													// font: "bold 14px sans-serif",
													stroke: '#333',
													// background: "lightgreen",
													// margin: 2,
													// textAlign: "right",
													textAlign: "center",
													// alignment: go.Spot.Center,
													verticalAlignment: go.Spot.Center,
													// isMultiline: true,
													// wrap: go.TextBlock.WrapFit,
													// width: 100,
												},
												new go.Binding("height", "height"),
												new go.Binding("width", "width"),
												new go.Binding("text", "Name"),
												// new go.Binding("fill", "fill"),
											)
										);
										diagram.object.forEach(function(diagramobject) {
											// console.log(diagramobject);
											var object = data.object[diagramobject.Object_ID];
											var objectdata = Object.assign({
												key: object.Object_ID,
												Name: object.Name,
												loc: new go.Point(diagramobject.RectLeft, -diagramobject.RectTop),
												// top : -diagramobject.RectTop,
												width : diagramobject.RectRight - diagramobject.RectLeft,
												height : diagramobject.RectTop - diagramobject.RectBottom,

												// left : diagramobject.RectLeft,
												// fill: $(go.Brush, "Linear", { start: go.Spot.Left, end: go.Spot.Right, 0.0: "#FCF0D8", 1.0: "#F9DEA7" }),
												// fill: $(go.Brush, "Linear", { start: go.Spot.Left, end: go.Spot.Right, 0.0: "#FCF0D8", 1.0: "#F9DEA7" }),
												// figure: "RoundedRectangle",
												// figure: "Circle",
											},figure[object.Object_Type]);
											// var elObject = elDiagram.createElement('DIV', {className:'Object ' + object.Object_Type, innerText: object.Name, style:`margin:auto;top:${diagramobject.top}px;left:${diagramobject.left}px;width:${diagramobject.width}px;height:${diagramobject.height}px;`});
											nodedata.push(objectdata);
											height = Math.max(height,-diagramobject.RectTop);
											// console.log(objectdata);
											if (object.connector) {
												object.connector.forEach(function(connector) {
													linkdata.push({
														from: connector.Start_Object_ID,
														to: connector.End_Object_ID,
														// routing: go.Link.Normal,
														// routing: go.Link.Orthogonal,
													});
												});
											}
											elDiagramDIV.createElement('A', {name: 'object' + object.Object_ID});
											elDiagramDIV.createElement('H3', object.Name);
											var elTABLE = elDiagramDIV.createElement('TABLE', {style: 'table-layout: fixed;'});
											['CreatedDate','ModifiedDate','Status','Author','Stereotype'].forEach(function(attributeName){
												if (object[attributeName]) {
													elTABLE.createElement('TR', ['TH', attributeName], ['TD', object[attributeName] ]);
												}
											});
											if (object.Note) {
												if (object.Note.includes('{alf}')) {
													var st = AIM.convert.alf2st(object.Note);
													var st = AIM.markdown.st(st);
													console.log(st);
													elTABLE.createElement('TR', ['TD', {colspan:2, className:'pre'}, ['DIV', 'ALF', {className:'code-header'}], ['CODE', AIM.markdown.alf(object.Note) ]]);
													elTABLE.createElement('TR', ['TD', {colspan:2, className:'pre'}, ['DIV', 'ST', {className:'code-header'}], ['CODE', AIM.markdown.st(AIM.convert.alf2st(object.Note)) ]]);
												}
												else elTABLE.createElement('TR', ['TH', 'Notitie'], ['TD', object.Note ]);
											}

											if (object.requires) {
												elDiagramDIV.createElement('H4', 'Eisen');
												var elRequiresUL = elDiagramDIV.createElement('UL');

												object.requires.forEach(function(requires){
													elRequiresUL.createElement('LI', ['A', 'Eis' + requires.ReqID + ': ' + requires.Requirement, {href: '#requirement' + requires.ReqID} ]);

													if (!elRequirmentsDIV[requires.Status]) {
														elRequirmentsDIV.createElement('H2', requires.Status);
														elRequirmentsDIV[requires.Status] = elRequirmentsDIV.createElement('DIV');
													}
													elRequirmentsDIV[requires.Status].createElement('H3', requires.Requirement)
													var elRequiresTABLE = elRequirmentsDIV[requires.Status].createElement('TABLE');
													elRequiresTABLE.createElement('TR', ['TH', ['A', {name: 'requirement' + requires.ReqID}], ['SPAN', 'Eis' + requires.ReqID]], ['TD', requires.Requirement, {colspan:3} ]);
													elRequiresTABLE.createElement('TR', ['TH', 'Object'], ['TD', {colspan:3}, ['A', object.Name, {href: '#object' + object.Object_ID }] ]);
													elRequiresTABLE.createElement('TR', ['TH', 'ReqType'], ['TD', requires.ReqType ], ['TH', 'Status'], ['TD', requires.Status ]);
													elRequiresTABLE.createElement('TR', ['TH', 'Stability'], ['TD', requires.Stability ], ['TH', 'Difficulty'], ['TD', requires.Difficulty ]);
													elRequiresTABLE.createElement('TR', ['TH', 'Priority'], ['TD', requires.Priority ], ['TH', 'LastUpdate'], ['TD', requires.LastUpdate ]);
													if (requires.Notes) {
														elRequiresTABLE.createElement('TR', ['TH', 'Notes'], ['TD', requires.Notes, {colspan:3} ]);
													}
													//
													// ['Requirement','ReqType','Status','Notes','Stability','Difficulty','Priority','LastUpdate'].forEach(function(attributeName){
													//   if (requires[attributeName]) {
													//     elRequires.createElement('TR', ['TH', attributeName], ['TD', requires[attributeName] ]);
													//   }
													// });
												});
											}


											// console.log(elObject);
											// if (object.connector) {
											//   object.connector.forEach(function(connector){
											//     content.createElement('LI', connector.Direction, ['A', data.object[connector.End_Object_ID].Name ] );
											//   });
											// }
										});
										elDiagram.style.height = (height+10)+'px';


										// but use the default Link template, by not setting Diagram.linkTemplate

										// create the model data that will be represented by Nodes and Links
										// myDiagram.model = new go.GraphLinksModel(
										//   [
										//     { key: "Alpha", color: "lightblue" },
										//     { key: "Beta", color: "orange" },
										//     { key: "Gamma", color: "lightgreen" },
										//     { key: "Delta", color: "pink" }
										//   ],
										//   [
										//     { from: "Alpha", to: "Beta" },
										//     { from: "Alpha", to: "Gamma" },
										//     { from: "Beta", to: "Beta" },
										//     { from: "Gamma", to: "Delta" },
										//     { from: "Delta", to: "Alpha" }
										//   ]
										// );

										// var nodedata =   [
										//     { key: "Alpha", color: "lightblue" },
										//     { key: "Beta", color: "orange" },
										//     { key: "Gamma", color: "lightgreen" },
										//     { key: "Delta", color: "pink" }
										//   ],
										//   linkdata =
										//   [
										//     { from: "Alpha", to: "Beta" },
										//     { from: "Alpha", to: "Gamma" },
										//     { from: "Beta", to: "Beta" },
										//     { from: "Gamma", to: "Delta" },
										//     { from: "Delta", to: "Alpha" }
										//   ];

										myDiagram.model = new go.GraphLinksModel(nodedata,linkdata);
									}

								});

							}

						});
						// content.createElement('DIV', {
						// 	style: `width:100%;background-color:#eee;`,
						// 	go:(elDiagramDIV) => {
						// 		console.log('GO', el, data);
						//
						// 	}
						// });
						content.createElement('H1', 'Eisen');
						elRequirmentsDIV = content.createElement('DIV');
						AIM.Doc.createIndex();
						return;


					})
				}
			}
		}
	})
})();
