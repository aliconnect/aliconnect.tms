var url = 'input/R1.2 SP2 B2-1.6 Basisspecificatie TTI RWS Tunnelsysteem.pdf';
let parent;
let stereotype;
let config = {};
const constvalues = {};
const js = [];
const mdlines=[];
constant_values = [];

function convert() {

  function getPages(url, callback) {
    let pages=[];
    let loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      progress.max = pdf.numPages;
      (function getPage(pageNumber) {
        // console.log(pageNumber);
        pdf.getPage(pageNumber).then(function(page) {
          page.getTextContent({
            normalizeWhitespace: true,
            disableCombineTextItems: false,
          }).then(item => {
            pages.push(...item.items);
            if (pageNumber < pdf.numPages) {
              setTimeout(() => getPage(progress.value = pageNumber+1),0);
            } else {
              callback(pages);
            }
          });
        });
      })(1);
    });
  }

  getPages(url, items => {
    const lines = [];
    const par = [];
    let args = {};
    let fonts = {};
    let str = '';
    let prevLeft = 0;
    // let line = '';
    console.log(items);

    function addstr(str) {
      if (str.match(/Basisspecificatie TTI RWS Tunnelsysteem \|/)) return;
      if (str.match(/Pagina.*van/)) return;

      // str = str.trim();
      // par.push({s:str});
      lines.push(str);
    }

    items.forEach(item => {
      const [p1,p2,p3,p4,left,top] = item.transform;
      if (prevLeft >= left) {
        addstr(str);
        str = '';
      }
      str += item.str;
      prevLeft=left;
    });
    addstr(str);
    let chapter = [0];
    let inhoud = true;
    let index = 0;
    let level = 0;
    let doc = [];
    let doclevel = [];
    let docitem = doc[index] = doclevel[level] = [];
    let match;
    let linestr;
    function updateDocitem() {
      if (docitem.lines) {
        docitem.lines = docitem.lines
        .map(line => line === ' ' ? '\n' : line)
        .join('')
        .split(/\n/)
        .map(line => line.trim()).filter(Boolean)
        ;
      }
    }
    lines.forEach((line,i) => {
      if (line.match(/Inhoud/)) inhoud = false;
      function setdocitem (newlevel) {
        level = newlevel;
        index = chapter[level] = chapter[level]+1;
        updateDocitem();

        doclevel[level+1] = doclevel[level][index] = docitem = [];
        docitem.title = line;
        chapter[level+1]=0;
      }
      const isBody = !inhoud && !line.match(/\.\.\./);
      if (isBody && (match = line.match(/^([0-9]+)\s+[0-9A-Z]/))) {
        if (match[1] == chapter[0]+1 && !lines[i-1].trim()) {
          setdocitem(0);
          lines[i] = line.replace(/^[0-9\.]+\s/,'# ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\s+[0-9A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1]+1) {
          setdocitem(1);
          lines[i] = line.replace(/^[0-9\.]+\s/,'## ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2]+1) {
          setdocitem(2);
          lines[i] = line.replace(/^[0-9\.]+\s/,'### ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3]+1) {
          setdocitem(3);
          lines[i] = line.replace(/^[0-9\.]+\s/,'#### ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3] && match[5] == chapter[4]+1) {
          setdocitem(4);
          lines[i] = line.replace(/^[0-9\.]+\s/,'##### ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3] && match[5] == chapter[4] && match[6] == chapter[5]+1) {
          setdocitem(5);
          lines[i] = line.replace(/^[0-9\.]+\s/,'##### ');
        }
      } else {
        docitem.lines = docitem.lines || [];
        docitem.lines.push(line);
      }
    });
    updateDocitem();
    // text = lines.join('\n');
    // AIM.HttpRequest('').query({ext: 'md'}).post(text).then(event => console.log('done'));
    let docdata = {document:[]};
    (makesub = function (doc, docu) {
      doc.forEach(doc => {
        let sub = {};
        const title = doc.title.trim().replace(/^[0-9\.]+\s/,'');
        doc.lines = doc.lines || [];
        // doc.lines = doc.lines.map(line => {
        //   let match = line.match(/^(BSTTI#[0-9]+)\s(.*)/);
        //   if (match) {
        //     var [str,eisNr,eisTekst] = match;
        //     let obj = {};
        //     obj[eisNr] = {
        //       type: title.toLowerCase(),
        //       eisTekst: eisTekst,
        //     };
        //     return obj;
        //   }
        //   return line;
        // });
        let subarray = sub[title] = doc.lines;
        docu.push(sub);
        makesub(doc, subarray);
      })
    })(doc[0], docdata.document);

    console.log(par);


    $().url('')
    .query('ext', 'yaml')
    .query('name', 'bstti.pdf')
    .post(JSON.stringify(docdata))
    .then(event => console.log('done'));
    console.log(docdata);
  })
}
function ucfirst(str) {
  return str ? str[0].toUpperCase() + str.substr(1) : '';
}
function setline(property,str) {
  // console.log('setline', property.description, str);
  return property.description = property.description.replace(str, '').split(/\n/).filter(Boolean).join('\n').trim();
}
function als_str(als,schemaName) {

  // console.log(als);
  if (als) {
    if (['*','overige situaties'].includes(als[0])) return 'if (1)';
    als = als.map(line => {
      line = line
      .replace(/≥/g,'>=')
      .replace(/≤/g,'<=')
      .replace(/([\w\.]+)\s=\s\((.*?)\)/,function(p0,p1,p2){
        return `[ ${p2.replace(/\|/g,',')} ].includes( ${p1} )`;
      })
      .replace(/(^|\s)(\w+)/gs, function(p0,p1,p2) {
        if (Number(p2)) return p1+p2;
        if (constant_values.includes(p2)) return p1+p2.toUpperCase();
        return p1+`${schemaName}.${p2}`;
      })
      .replace(/\s=\s/gs,' === ')
      .replace(/\s*<>\s*/gs,' != ')
      ;
      return line;
    })
    als = als.join(' &&\n  ');
    return `if (\n  ${als}\n)`;
  }
  return;
  if (['*','overige situaties'].includes(als)) als = 'OVERIG';//return dan.trim();
  als = als ? als.trim() : '';
  als = als.
  replace(/\n/gs,' ').
  replace(/\s\s/gs,' ').
  replace(/\s\s/gs,' ').
  replace(/\s\s/gs,' ').
  replace(/\|\|\s*/g,'||\n').
  // replace(/#/g,'').

  // als = als.replace(/([#\w]+\.[#\w]+)/gs,`${schemaName}.$1`);
  als = als.replace(/(\s)([#\w]+)/gs, function(p0,p1,p2) {
    if (Number(p2)) return p1+p2;
    if (constant_values.includes(p2)) return p1+p2.toUpperCase();
    return p1+`${schemaName}.${p2}`;
  });

  als = als.replace(/&&\s*/g,'&&\n');
  // als = { en: als.split(/&&/g).map(s => s.trim()) };
  // als = als.split(/&&/g).map(s => s.trim());
  return als;
}
function make_operation_code (property,schemaName) {

  function code_line(line) {
    return (' '+line)
    // .trim()
  	.replace(/#(\w+)/gms, "$1")
  	.replace(/(\s)([\w\.\[\]]+)/gs, (str,pre,word) => {
  		if (Number(word)) {
      } else if (constant_values[word]) {
        word = constant_values[word];
      } else if (property.params && property.params.map(par => par.name).includes(word)) {
      } else if (word.match(/^[A-Z0-9_]+$/)) {
      } else {
        // word = schemaName + '.' + word;
        word = 'this.' + word;
      }
  		return ' ' + word;
  	}, ' '.$line)
  	.replace(/\._/gms, ".")
  	.trim()
    ;
  }
  function state_line(line) {
    return code_line(line
      .replace(/(\w+)\[\]\.([\w\s!=<>#]+)/, '$1.every($1=>$1.$2 ) ')
      .replace(/(\w+)\[[i|j]\]\.([\w\s!=<>#]+)/, '$1.some($1=>$1.$2 ) ')
      .replace(/(\w+)\[[i|j]\][\s|=]+([\w\s=]+)/, '$1.some($1=>$1 = $2 ) ')
      .replace(/overige situaties|\*/msg, "1")
      .replace(/\|\|\s*/msg, "||\n  ")
    )

    // .replace(/(\w+)\[[i|j]\][\s|=]+([\w\s=]+)/, '$1.some1($2) ')

    // .replace(/(\w+)\[j\]\.([\w\s!=<>#]+)/', '$1.some($1 => $1$2) ')
    .replace(/([\w\.]+)\s=\s\((.*?)\)/msg, (str,m1,m2) => {
      m2 = m2.replace("|",",");
      return `[ ${m2} ].includes( ${m1} )`;
    })
    .replace(/\s=\s/msg, " === ")
    .replace(/\s!=\s/msg, " !== ")
    .replace(/\s<>\s/msg, " !== ")
    ;
  }
  function action_line(line) {
    return code_line(line
      .replace(/([\w\.]+\(.*?\))/msg, "\n$1\n")
      .replace(/:=/s, "=")
    )+';';
  }
  if (property.init) {
    var code = state_line(property.init);
    try {
      new Function(code);
      property.oninit = code;
    } catch (err) {
      // console.error(err);
    }
    // property.oninit = state_line(property.init);
  }

  if (property.control) {
    var code = property.control.map(rule => {
      let state = rule.state.map(state_line).join(' &&\n  ');
      let operation = '';
      if (rule.operation) operation = rule.operation.map(action_line).join('\n  ');
      if (rule.value) operation = 'return ' + state_line(rule.value)
      .replace(/ && /,' &&\n  ')
      .replace(/\(/,'(\n    ')
      .replace(/\s*\)/,'\n  )\n')
      ;
      return `if (\n  ${state}\n) {\n  ${operation}\n}`;
    }).join('\n');
    try {
      new Function(code);
      property.code = code;
    } catch (err) {
      // console.error(err);
    }
  }
}
function show_js_code(code) {
  AIM('js').bgColor = AIM('js').style.backgroundColor = '';
  if (code) {
    try {
      new Function(code);
      AIM('js').innerText = code;
    } catch (err) {
      const s = String(err).split(/\n/);
      AIM('js').error = AIM('js').innerText = s[0] + "\n" + s[1] + "\n" + code;
      AIM('js').bgColor = AIM('js').style.backgroundColor = 'rgba(255,0,0,0.1)';
    }
  }
}
function sendconfig(params) {
  if (params) {
    this.sendbuf = this.sendbuf || [];
    this.sendbuf.push(params);
    progress.max++;
    return sendconfig();
  }
  if (this.xhr) return;
  if (params = this.sendbuf.shift()) {
    this.xhr = new AIM.HttpRequest('index.php').query({yaml:params.name}).input(params.content).post().then(event => {
      progress.value++;
      if (params.callback) params.callback(event);
      this.xhr = null;
      sendconfig();
    });
  } else {
    progress.value = progress.max = 0;
  }
}
function camelCase(str) {
  return str.split(/!|#| |_|-/g).map(ucfirst).join('');
}
function line_to_params(line) {
  return line.split(',').map(line => {
    const [name,values] = line.split(':');
    if (values) return {
      name: name,
      enum: values.split(' | '),
    }
    return {
      name: name,
    };
  });
}
function get_config(row,save,callback){
  let config, schema;
  function line_to_control (line) {
    line = line
    .replace(/≤/gs,'<=')
    .replace(/≥/gs,'>=')
    .replace(new RegExp(String.fromCharCode(61472), 'gs'),'[ident]')
    .replace(new RegExp(String.fromCharCode(61662), 'gs'),'[tab]')
    .replace(new RegExp(String.fromCharCode(61476), 'gs'),'[some]')
    .replace(new RegExp(String.fromCharCode(61474), 'gs'),'[every]')
    .replace(new RegExp(String.fromCharCode(8704), 'gs'),'[every]')
    .replace(new RegExp(String.fromCharCode(61623), 'gs'),'-')
    ;
    // for (let i=0;i<line.length;i++) {
    //   var ord = line.charCodeAt(i);
    //   if (ord>1000) {
    //     console.log(i,line[i],ord,line);
    //   }
    // }

    function code_line(line) {
      return line
      // .replace(new RegExp(String.fromCharCode(61474), 'gs'),'<>')
      .split(/\n/gs).map(line => line.trim()).join(' ')
      .replace(/\s\s/gs,' ')
      .replace(/#/gs,'')
      .replace(/<>/gs,'!=')
      .replace(/:=/gs,'=')
      .trim()
      ;
    }

    function state_array(line) {
      return code_line(line)
      .split(/&&|\n/)
      .map(line => line.trim())
      ;
    }
    function operation_array(line) {
      return code_line(line)
      .replace(/\s(!=|=|<|>)\s/gs,'$1')
      .replace(/;/gs,'')
      .split(/\n|\s/gs)
      .map(line => line
        .replace(/(=|<|>|!=)/gs,' $1 ')
      )
      ;
    }
    var [state,operation] = line.split(/Waarde: /gs);
    if (operation) {
      return {state: state_array(state), value: operation_array(operation).join(' ') };
    }
    var [state,operation] = line.split(/Acties: /gs);
    if (operation) {
      return {state: state_array(state), operation: operation_array(operation) };
    }
    if (line && line.trim()) {
      return {state: state_array(line) };
    }
  }
  function description_to_property(property, schemaName) {
    if (property.description) {
      var match = property.description.split(/Preset:/gs);
      if (match.length>1) {
        property.description = match[0].trim();
        property.preset = match[1].trim();
      }
      var match = property.description.split(/Camera:/gs);
      if (match.length>1) {
        property.description = match[0].trim();
        property.camera = match[1].trim();
      }
      var match = property.description.split(/Conditie:/gs);
      if (match.length>1) {
        property.description = match.shift();
        property.control = match.map(line_to_control);
      }
      property.description = property.description.replace(/\n/gs,' ').replace(/  /g,' ').trim();
      var match = property.description.match(/(.*?)Init:\s*(.*)/);
      if (match) {
        property.description = match[1].trim();
        property.init = match[2];
      }
      var match = property.description.match(/(.*?)Status:\s*(.*)/);
      if (match) {
        property.description = match[1].trim();
        property.status = match[2];
      }
      var match = property.description.match(/(.*?)Type:\s*(.*)/);
      if (match) {
        property.description = match[1].trim();
        property.type = match[2];
      }

      make_operation_code(property, schemaName);

      if (property.code) {
        // console.log('START CODE');
        try {
          delete (property.err);
          // new Function(property.code);
        } catch (err) {
          property.err = err[0];
        }
      }
    }
  }

  function getProperty(schemaName,type,name,description) {
    row.config = config = config || {components:{schemas:{}}};
    var schemaName = camelCase(schemaName);
    schema = config.components.schemas[schemaName] = config.components.schemas[schemaName] || {};
    var type = schema[type] = schema[type] || {};
    var propertyName = camelCase(name);
    var property = type[propertyName] = type[propertyName] || {
      bstti: row.nr,
      bstti: row.path.join(),
    };
    property.titel = name;
    property.description = description.trim().replace(/^:/,'').trim();
    return [schemaName,propertyName,property,description];
  }
  var line = row.line;
  var js, api, match;
  // ['config','aim','js'].forEach(id => AIM(id).innerText = '');
  if (row.path.includes('Configuratie-elementen')) {
    var match = line.match(/^(_\w+)\s(.*)/);
    if (match) {
      var index = row.path.indexOf('Configuratie-elementen');
      // var name = match[1];
      // var schemaName = getSchemaName(row.path[index-1]);
      // var properties = schema.properties = schema.properties || {};
      // var property = properties[name] = properties[name] || {};
      var [str,name,description] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'properties', name, description);
      // property.description = match[2];
    }
  } else if (row.path.includes('Variabelen')) {
    var match = line.match(/^#([\w]+)([\[|\]|]*?):\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Variabelen');
      var [str,name,type,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'properties', name, line);
      if (type) property.type = type;
      // line = property.description = property.description.replace(/:/,':\n').trim();
      var match = line.match(/^\w+[\s\|\s\w]+$/gm);
      if (match) {
        property.enum = match[0].split('|');
        property.enum = property.enum.map(val => val.trim());
        line = setline(property, match[0]);
        property.enum.forEach(key => {
          constant_values[key] = key.toUpperCase();
          // if (!constant_values.includes(key)) constant_values.push(key);
          var regex = new RegExp(`^(${key})\\s(?=\\w)(.*)`,'m');
          var match = line.match(regex);
          if (match) {
            property.options = property.options || {};
            property.options[key] = {description: ucfirst(match[2])};
            line = setline(property, match[0]);
          }
        });
      }
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Bedieningen')) {
    var match = line.match(/^(\w+)\(([\w\s:\|]*)\)\s*(.*)/ms);
    // var match = line.match(/^(\w+)\(([\w\s]*)\)\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Bedieningen');
      var [str,name,par,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'operations', name, line);
      if (par) property.params = line_to_params(par);
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Besturingen')) {
    var match = line.match(/^(\w+)\(([\w\s:\|]*)\)\s*(.*)/ms);
    // console.log('Besturingen', match);
    if (match) {
      var index = row.path.indexOf('Besturingen');
      var [str,name,par,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'operations', name, line);
      if (par) property.params = line_to_params(par);
      // console.log('Besturingen', match);
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Autonome processen')) {
    var match = line.match(/^(\*\w+)\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Autonome processen');
      var [str,name,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'operations', name, line);
      if (par) property.params = par;
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Signaleringen')) {
    var match = line.match(/^!(\w+)\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Signaleringen');
      var [str,name,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'properties', name, line);
      description_to_property(property, schemaName);
    }
  } else if (row.line) {
    if (match = row.line.match(/(.*?):\s(.*)/s)) {
      var [line,pre,line] = match;
      if (pre.includes('toestandsvariabelen') && line) {
        line.split(/(?=#\w+:)/).forEach(line => {
          if (match = line.match(/(.+):\s*(.*)/)) {
            var [line,name,line] = match;
            var [schemaName, name, property, line] = getProperty(row.path[1], 'properties', name, line);
            if (match = line.match(/(^\w+.*\s\|\s\w+)($|\s(.*))/)) {
              [dummy,property.enum,dummy,property.description] = match;
              property.enum = property.enum.replace(/\s/g,'');
              property.enum = property.enum.split(/\|/);
              if (property.description) {
                if (match = property.description.match(new RegExp(`^(${property.enum.join(':\\s.*|')}:\\s.*)`,'gm'))) {
                  // console.log(match, property.description);
                  property.options = [...match];
                  // [dummy,property.par,dummy,property.description] = match;
                }
              }
            }
            // console.log(name,property);
          }
        });
      }
      if (pre.includes('commando') && line) {
        line = line.trim().split(/\n/).map(line => line.trim()).join('\n');
        var match = line.split(/(?=^\w+\()/ms);
        match.forEach(line => {
          var match = line.match(/(.*?)\((.*?)\)(.*)/s);
          if (!match) return console.error(row.line);
          var [input, name, par, line] = match;
          var [schemaName, name, property, line] = getProperty(row.path[1], 'operations', name, line);
          if (par) {
            property.params = par.split(',').map(par => {
              var [name, values] = par.split(':');
              if (values) {
                return {
                  name: name,
                  type: 'string',
                  enum: values.split(' | '),
                }
              }
              return {
                enum: name.split(' | '),
              }
            })
          }
        });
      }
      if (pre.includes('storingen') && line) {
        line = line.trim().split(/\n/).map(line => line.trim()).join('\n');
        var split = line.match(/(^[A-Z_]+\s.*)/gm);
        if (split && split.length) {
          var [schemaName, name, property, line] = getProperty(row.path[1], 'properties', 'storingen', line);
          schema.properties.storingen = split.map(storing => {
            var [str,name,description] = storing.match(/^([A-Z_]+)\s(.*)/s);
            return {
              name: name,
              description: description,
            }
          });
        }
      }
    }
  }
  // if (save && config) {
  //   // let data = {config: config, bstti: {}};
  //   // data.bstti[row.nr] = row;
  //   // sendconfig({name:'config',content:data, callback: callback});
  // } else

  if (callback) {
    callback();
  }
  if (config) {
    // console.log(config);
    AIM.extend(JSON.parse(JSON.stringify(config)));
  }

  // return config;
}

function yaml(obj) {
  return obj ? JSON.stringify(obj,null,2)
  .replace(/"/g,'')
  .replace(/,\n/gs,'\n')
  .replace(/ \[\n/gs,'\n')
  .split(/\n/).map(line => {
    if (['{','}','[',']'].includes(line.trim())) return '';
    line = line.substr(2);
    if (line.includes(':')) return line;
    return line.replace(/(\w)/,'- $1');
  }).filter(Boolean).join('\n')
  // .replace(/^.*\]\n/gms,'')
  : '' ;
}
function tojs(row) {
  console.log(row);
}
function get_eisen(save) {
  $().url('lfv_eisen_src.json').get().then(event => {
    // return console.log(event.body);
    Object.entries(event.body).forEach(([id, row])=>{
      row.line = pretty_print_eis(row.line);
      if (row.config) console.log(row.config);
      if (!row.line.includes('Conditie')) return;
      // console.log(row.line);
      $(document.body).append(
        $('div').text(row.path.join('/') + '/' + row.nr),
        $('pre').text(row.line),
        // $('pre').text(pretty_print_eis(row.line)),
        // $('pre').text(tojs(row)),
        // .style('display:inline-block;width:100%')
        // .contenteditable()
      );

      // , [
      //   ['div', '', row.path.join('/') + '/' + row.nr],
      // ]).createElement('pre', 'aco', row.line, {
      //   row: row,
      //   config: get_config(row),
      //   contenteditable: true,
      //   style: 'display:inline-block;width:100%',
      //   refresh() {
      //     AIM('js').innerText='';
      //     AIM('config').innerText='';
      //     this.style.backgroundColor = 'rgba(0,0,0,0.1)';
      //     if (this.row.config) {
      //       AIM('config').innerText = JSON.stringify(this.row.config,null,2);
      //       if (this.yaml) AIM('config').innerText = this.yaml;
      //       this.style.backgroundColor = 'rgba(0,255,255,0.1)';
      //       AIM('js').bgColor = AIM('js').style.backgroundColor = '';
      //       for (let [schemaName, schema] of Object.entries(this.row.config.components.schemas)) {
      //         ['properties','operations'].forEach(name => {
      //           if (schema[name]) {
      //             for (let [operationName, operation] of Object.entries(schema[name])) {
      //               if (operation.code) {
      //                 // let code = make_operation_code(operation, schemaName, operationName);
      //                 try {
      //                   this.style.backgroundColor = 'rgba(255,0,0,0.1)';
      //                   new Function(operation.code);
      //                   this.style.backgroundColor = 'rgba(0,255,0,0.1)';
      //                   AIM('js').innerText = operation.code;
      //                   if (AIM.components.schemas[schemaName][name][operationName].code !== operation.code) {
      //                     // this.load();
      //                   }
      //                 } catch (err) {
      //                   const s = String(err).split(/\n/);
      //                   AIM('js').bgColor = AIM('js').style.backgroundColor = 'rgba(255,0,0,0.1)';
      //                   AIM('js').error = AIM('js').innerText = s[0] + "\n" + s[1] + "\n" + operation.code;
      //                 }
      //                 if (AIM('js').bgColor) this.style.backgroundColor = AIM('js').bgColor;
      //               }
      //             }
      //           }
      //         });
      //       }
      //     }
      //   },
      //   load() {
      //     return sendconfig({name:'config',content:this.row, callback: event => {
      //       console.log('RESPONSE',event.body);
      //       this.yaml = AIM('config').innerText = event.body.config;
      //     }});
      //   },
      //   onfocus(event) {
      //     this.refresh();
      //     if (!this.yaml) {
      //       return this.load();
      //     }
      //   },
      //   onkeyup(event) {
      //     if (this.row.line != this.innerText) {
      //       this.modified = true;
      //       this.row.line = this.innerText;
      //       get_config(this.row);
      //       this.refresh();
      //     }
      //   },
      //   onblur(event) {
      //     if (this.modified) {
      //       this.row.line = this.innerText;
      //       this.load();
      //       this.modified = false;
      //     }
      //   },
      // }).refresh();
    })
    // constant_values = constant_values.sort();
    // for (let [name, value] of Object.entries(constant_values)) {
    //   window[value] = name;
    // }

    // console.log('constant_values',constant_values);
    // console.log('config',AIM.components);
    // start_operations();
    // AIM('js').innerText = make_js();
  });
}
function make_name(name) {
  return (name||'').replace(/-|\.| |'|"|\(|\)'/g,'_').replace(/ö/g,'o');
}


function pretty_print_eis(line) {
  // line = line.replace(/(\.|:)\s+/,'$1\n');
  return line
  .replace(/\n/gs,'\n  ')
  .replace(/\s\s/gs,' ')
  .replace(/\.\s/gs,'.\n')
  .replace(/\s([A-Z][a-z])/,'\n$1')
  .replace(/(IF|THEN|ELSIF)\s/gs,'\n$1 ')
  .replace(/(\w+\(.*?\))\s(?![A-Z])/gs,'$1\n  ')
  // line = line.replace(/(\.|\):)\s+/g,'$1\n');
  // line = line.replace(/(Conditie:|Waarde:|Acties:|Init:|Type:|Status:)/gs,'\n$1');
  .replace(/(Conditie:|Waarde:|Acties:|Init:|Type:|Status:|Camera:|Preset:)/gs,'\n$1')
  .trim().split(/\n/).map(line => line.trim()).join('\n')
  .replace(/Geeft/gs,'\nGeeft')
  .replace(/&&\s*/gs,'&&\n  ')
  .replace(/\u2018|\u2019/gs,'')

  // line = line.replace(/(\s\|\s\w+)\s(?=\w)/g,'$1\n');
  // line = line.replace(/(\w+\(.*\))\s/gs,'$1\n');
  ;
}
function replace_const(line) {
  return line.replace(new RegExp(`\\b(${[...Object.keys(constvalues)].join('|')})\\b`, 'gs'), `"$1"`)
  .replace(/""/g,`"`)
}

function trim(s) {
  return s.trim();
}

let allproperties = [];


function renamestring(s) {
  return (s||'').replace(/sf_|lfv_|bf_|cf_/g,'')
}
function namestring(s) {
  return renamestring(s).replace(/^\*|^_|^!|\[|\]/g,'')
}
function codestring(s) {
  return renamestring(s)
  .replace(/(\._|\.#|\.!|\.\*)([\w_]+)/g,'.$2')
  .replace(/(\[|\s|^|\()(_|#|!|\*)([\w_]+)/g,'$1this.$3')
}
function when(s) {
  return codestring(s)
  .split(/&&/)
  .map(trim)
  .map(replace_const)
}
function then(s, actie) {
  s = codestring(s)
  .replace(/\s([A-Z])/g,';$1')
  // .replace(/\sthis/g,';this')
  .replace(/=;/g,'= ')
  .replace(/\)\s/g,');')
  .split(/;/)
  .map(trim)
  // return s;
  return actie === true ? s.map(replace_const) : s;
}

function writedoc(doc, level, path) {
  const obj = {
    lines: [],
    chapters: [],
  };
  doc.forEach(row => {
    const schemaName = make_name(path[level-2]);
    if (schemaName.match(/Werkplekaansturing|Applicatiebediening|Camerabediening|Alarmen|Noodbediening|Algemeen|3B_basis|Signaleringen/)) {
      return;
    }

    const stereotype = make_name(path[level-1]).toLowerCase();
    if (typeof row === 'string') {
      obj.lines.push(row);
      if (row.includes('De waarde van het algemene configuratie-element ')) {
        // console.log(row);
        return;
      }

      if (
        row.match(/^BSTTI/) &&
        ["configuratie_elementen","variabelen","bedieningen","besturingen","autonome_processen"].includes(stereotype)
        // && path.includes("Functies van een Verkeersbuis")
      ) {
        var schema = config[schemaName] = config[schemaName] || {};
        var properties = schema.properties = schema.properties || {};
        row = row.replace(/'/g,'"').trim().replace(/≥/g,'>=').replace(/<>/g,'!==').replace(/:=/g,'=');
        var lts = {
          path: path.join().replace(/Functies\s|functies|van\s|een\s|\s-\s/g,''),
        };
        var property = {
          stereotype: make_name(path[level-1]).toLowerCase(),
          lts: lts,
        };
        var dummy;
        var match;

        [row, property.eis, lts.text] = row.match(/^(.*?)\s(.*)/)||[];
        lts.text = pretty_print_eis(lts.text);
        [property.description, lts.pre, property.description] = lts.text.match(/^\((.*?)\)\s(.*)/s)||[,,lts.text];
        property.description = property.description.replace(/:\n/g,':');


        if (match = property.description.match(/^([^\s]+?)\((.*?)\)\s(.*)/s)) {
          [property.description, lts.name, property.parameters, property.description] = match;
          property.parameters = property.parameters.split(',').map(v => v.trim()).map(v=>{
            var match = v.match(/([\w_]+):(.*)/);
            if (match) {
              if (match[2].match(/\|/)) {
                return {
                  name: match[1],
                  enum: match[2].split(/\|/).map(v => v.trim()),
                }
              }
              return {
                name: match[1],
                type: match[2].trim(),
              }
            }
            return {
              name: v,
            }
          });
          // console.log(lts.name);
        } else if (match = property.description.match(/^([^\s]+?)\[(.*?)\]\s(.*)/s)) {
          [property.description, lts.name, property.parameters, property.description] = match;
          property.parameters = property.parameters.split(',').map(v => v.trim()).map(v=>{
            var match = v.match(/([\w_]+):(.*)/);
            if (match) {
              if (match[2].match(/\|/)) {
                return {
                  name: match[1],
                  enum: match[2].split(/\|/).map(v => v.trim()),
                }
              }
              return {
                name: match[1],
                type: match[2].trim(),
              }
            }
            return {
              name: v,
            }
          });
        } else {
          [property.description, lts.name, property.description] = property.description.match(/^(.*?)[\s|\n]([A-Z].*)/s)||[,,property.description];
        }

        [property.description, lts.toelichting] = property.description.split(/\sToelichting:\s/s);
        [property.description, lts.init] = property.description.split(/\sInit:\s/s);
        if (lts.name) {
          lts.name = lts.name.replace(/^#|^!|^\*|^_/,'').trim();

          // console.log(lts.name);
          // var match = lts.name.replace(/\n/g,'').match(/([\w_]+?)\((.*?)\)/s);
          // if (match) {
          //   lts.name = match[1];
          //   if (match[2]) {
          //     property.parameters = match[2].split(',').map(v => v.trim()).map(v=>{
          //       var match = v.match(/([\w_]+):(.*)/);
          //       if (match) return {
          //         name: match[1],
          //         enum: match[2].split(/\|/).map(v => v.trim()),
          //       }
          //       return {
          //         name: v,
          //       }
          //     });
          //   }
          // }

          [lts.name, property.defaultValue] = lts.name.split(/\s=\s/s);
          if (property.defaultValue) {
            [property.defaultValue, property.unit] = property.defaultValue.split(/\s/s);
          }
          // console.log(lts.name, );
          [lts.name, property.type] = lts.name.split(/:(.*)/s);
          if (lts.name.match(/\[.*?\]$/s)) {
            property.type = 'array';
            [dummy, lts.name, property.range] = lts.name.match(/(.*?)\[(.*?)\]/s);
          }
          var name = namestring(lts.name);

          properties[name] = property;
          if (property.defaultValue) {
            property.defaultValue = Number(property.defaultValue) || property.defaultValue;
          }

          if (property.type) {
            property.type = property.type.trim().split(/\s\|\s/);
            if (property.type.length === 1) {
              property.type = property.type[0];
            } else {
              property.enum = property.type;
              property.type = typeof property.enum[0];
              property.enum.forEach(val => constvalues[val.replace(/\(|\)|\s/g,'')] = `'${val}'`);
            }
          }
          allproperties.push(property);
          // if (property.value) {
          //   rules.push(property.value = property.value.split(/Conditie:/));
          // }
        }

        // [property.description, lts.spec, lts.nr, property.description] = property.description.match(/^(\w+)\#(\d+)(.*)/)||[];
        // [property.description, lts.prefix, property.description] = property.description.match(/^\s(\(.*?\)(?=\s)|)(.*)/)||[];
        // [property.description, lts.name, property.description] = property.description.match(/^\s(.*?)\s([A-Z].*)/)||[];
        // if (lts.name) {
        //   [lts.name, lts.defaultValue] = lts.name.split(/ = /);
        // }
        // [property.description, property.description, lts.toelichting] = property.description.match(/^\s(.*?)\s([A-Z].*)/)||[];

        // console.log(path[level-2], stereotype, row);
      }
      // if (row.includes('Conditie:')) {
      //   // $('pre').parent(spec).text(pretty_print_eis(row));
      //   $('div').parent(js).append(
      //     $('div').text(path.replace(/ |-/g,'_')),
      //     $('div').text(pretty_print_eis(row)),
      //     // text(pretty_print_eis(row))
      //   );
      // }
      $('p').parent(spec).text(row);
      return;
    }
    if (Array.isArray(row)) return obj.chapters.push(writedoc(row));
    Object.entries(row).forEach(([name, rows]) => {
      path = path.slice(0, level);
      path[level] = name;
      $('h'+(level+1)).parent(spec).text(name);
      const sname = make_name(name);
      // if (['autonome_processen','variabelen','configuratie_elementen','bedieningen','besturingen'].includes(sname)) {
      //   parent = obj;
      //   stereotype = sname;
      //   // console.log();
      // }
      obj[make_name(name)] = writedoc(rows, level+1, path);
    })
    // stereotype = null;
  })
  return obj;
}
function writemd(doc, level, path) {
  // console.log(doc);
  doc.forEach(row => {
    if (typeof row === 'string') {
      return mdlines.push(row);
    }
    if (Array.isArray(row)) return writemd(row);
    Object.entries(row).forEach(([name, rows]) => {
      path = path.slice(0, level);
      path[level] = name;
      mdlines.push('#'.repeat(level) + ' ' + name);
      writemd(rows, level+1, path);
    })
  })
}
function make_eisen() {
  new AIM.HttpRequest('./?make=eisen').get().then(event => {
    get_eisen();
  });
}

function windoc() {
  const win = window.open(null, 'js',  'width=600, height=800');
  window.addEventListener('beforeunload', event => win.close());
  const doc = win.document;
  doc.open();
  doc.write('<link rel="stylesheet" href="/v1/src/css/web.css" /><link rel="stylesheet" href="/v1/src/css/icon.css" /><link rel="stylesheet" href="css/bstti.css" /><script src="/v1/src/js/aim.js"></script><script src="/v1/src/js/web.js"></script>');
  doc.close();
  return doc;
}

const fn_config = '../../../config.local';

const on = {
  pdf_to_pages() {
    function getPages(url, callback) {
      let pages=[];
      let loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then(pdf => {
        progress.max = pdf.numPages;
        (function getPage(pageNumber) {
          pdf.getPage(pageNumber).then(page => {
            page.getTextContent({
              normalizeWhitespace: true,
              disableCombineTextItems: false,
            }).then(item => {
              pages.push(...item.items);
              if (pageNumber < pdf.numPages) {
                setTimeout(() => getPage(progress.value = pageNumber + 1),0);
              } else {
                callback(pages);
              }
            });
          });
        })(1);
      });
    }
    getPages(url,
      pages => $().url('')
      .query('name', 'output/bstti.json')
      .post(JSON.stringify(pages))
      .then(on.make_bstti_yaml)
    );
  },
  make_bstti_yaml() {
    $().url('output/bstti.json').get().then(event => {
      const items = event.body;
      let lines = [];
      const par = [];
      let args = {};
      let fonts = {};
      let str = '';
      let prevLeft = 0;
      // let line = '';
      console.log(items);
      function addstr(str) {
        if (str.match(/Basisspecificatie TTI RWS Tunnelsysteem \|/)) return;
        if (str.match(/Pagina.*van/)) return;
        lines.push(str);
      }

      items.forEach(item => {
        const [p1,p2,p3,p4,left,top] = item.transform;
        if (prevLeft >= left) {
          addstr(str+' ');
          str = '';
        }
        str += item.str;
        prevLeft=left;
      });
      addstr(str);
      lines = lines
      .map(s => s.replace(/\s\s/g,' ').replace(/\s\s/g,' '))
      .join('\n')
      .replace(/\n\n\n/gs,'\n\n')
      .replace(/\n\n\n/gs,'\n\n')
      .replace(/\n\n\n/gs,'\n\n')
      .replace(/\n\n\n/gs,'\n\n')
      .replace(/\n\n\n/gs,'\n\n')
      .replace(/\n\n\n/gs,'\n\n')
      .replace(/\n\n\n/gs,'\n\n')
      .replace(/\n\n\n/gs,'\n\n')
      .trim()
      .split('\n')
      ;
      // $().url('').query('name', 'output/bstti.txt').post(lines.join('\n')).then(event => console.log('done'));

      const mdlines = [];

      let chapter = [0];
      let inhoud = true;
      let index = 0;
      let level = 0;
      let doc = [];
      let doclevel = [];
      let docitem = doc[index] = doclevel[level] = [];
      let match;
      let linestr;
      function updateDocitem() {
        if (docitem.lines) {
          docitem.lines = docitem.lines
          .map(line => line === ' ' ? '\n' : line)
          .join('')
          .split(/\n/)
          .map(line => line.trim()).filter(Boolean)
          ;
        }
      }
      lines.forEach((line,i) => {
        if (line.match(/Inhoud/)) inhoud = false;
        function setdocitem (newlevel) {
          level = newlevel;
          index = chapter[level] = chapter[level]+1;
          updateDocitem();

          doclevel[level+1] = doclevel[level][index] = docitem = [];
          docitem.title = line;
          chapter[level+1]=0;
        }
        const isBody = !inhoud && !line.match(/\.\.\./);
        if (isBody && (match = line.match(/^([0-9]+)\s+[0-9A-Z]/))) {
          if (match[1] == chapter[0]+1 && !lines[i-1].trim()) {
            setdocitem(0);
            mdlines.push(lines[i] = line.replace(/^[0-9\.]+\s/,'# '));
          }
        } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\s+[0-9A-Z]/))) {
          if (match[1] == chapter[0] && match[2] == chapter[1]+1) {
            setdocitem(1);
            mdlines.push(lines[i] = line.replace(/^[0-9\.]+\s/,'## '));
          }
        } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
          if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2]+1) {
            setdocitem(2);
            mdlines.push(lines[i] = line.replace(/^[0-9\.]+\s/,'### '));
          }
        } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
          if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3]+1) {
            setdocitem(3);
            mdlines.push(lines[i] = line.replace(/^[0-9\.]+\s/,'#### '));
          }
        } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
          if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3] && match[5] == chapter[4]+1) {
            setdocitem(4);
            mdlines.push(lines[i] = line.replace(/^[0-9\.]+\s/,'##### '));
          }
        } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
          if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3] && match[5] == chapter[4] && match[6] == chapter[5]+1) {
            setdocitem(5);
            mdlines.push(lines[i] = line.replace(/^[0-9\.]+\s/,'##### '));
          }
        } else {
          docitem.lines = docitem.lines || [];
          docitem.lines.push(line);
          mdlines.push(line);
        }
      });
      updateDocitem();
      // text = lines.join('\n');
      // AIM.HttpRequest('').query({ext: 'md'}).post(text).then(event => console.log('done'));
      let docdata = {document:[]};
      (makesub = function (doc, docu) {
        doc.forEach(doc => {
          let sub = {};
          const title = doc.title.trim().replace(/^[0-9\.]+\s/,'');
          doc.lines = doc.lines || [];
          // doc.lines = doc.lines.map(line => {
          //   let match = line.match(/^(BSTTI#[0-9]+)\s(.*)/);
          //   if (match) {
          //     var [str,eisNr,eisTekst] = match;
          //     let obj = {};
          //     obj[eisNr] = {
          //       type: title.toLowerCase(),
          //       eisTekst: eisTekst,
          //     };
          //     return obj;
          //   }
          //   return line;
          // });
          let subarray = sub[title] = doc.lines;
          docu.push(sub);
          makesub(doc, subarray);
        })
      })(doc[0], docdata.document);
      // $().url('').query('name', 'output/bstti.md').post(mdlines.join('\n')).then(event => console.log('done'));

      $().url('')
      .query('ext', 'yaml')
      .query('name', 'output/bstti')
      .post(JSON.stringify(docdata))
      .then(event => $('example').src('output/bstti.yaml'));
    });
  },
  make_bstti_config_yaml() {
    $().url('').query('name', fn_config).query('ext', 'yaml').get().then(event => {
      const configlocal = event.body;
      config = configlocal.components.schemas;
      $().url('').query('name', 'output/bstti').query('ext', 'yaml').get().then(event => {
        const pdf = JSON.parse(event.target.responseText);
        allproperties = [];
        example.document.body.innerHTML = '<link rel="stylesheet" href="/v1/src/css/web.css" />';
        spec = $('div').parent(example.document.body).class('doc-content counter');

        const obj = writedoc(pdf.document, 0, []);
        allproperties.forEach(property => {
          var arr = property.description.split(/Conditie:(.*)/s);
          property.description = arr[0].trim();
          if (arr[1]) {
            function whenthen(a, actie) {
              return ['*','overige situaties'].includes(a[0]) ? { then: then(a[1], actie)} : { when:when(a[0]), then: then(a[1], actie)};
            }
            var rule = arr[1].trim().split(/Conditie:/s).map(trim);
            if (arr[1].match(/Waarde:/s)) property.get = rule.map(s => s.split(/Waarde:/s).map(trim)).map(whenthen);
            else property.value = rule.map(s => s.split(/Acties:/).map(trim)).map(a => whenthen(a, true));
          }
        })
        $().url('')
        .query('name', fn_config)
        .query('ext', 'yaml')
        .post(JSON.stringify(configlocal))
        // .then(event => $('example').src('output/config.yaml'));
      });
    });
  },
  make_js() {
    example.document.body.innerHTML = '<link rel="stylesheet" href="/v1/src/css/web.css" />';
    const parent = $('pre').class('code').parent(example.document.body);
    function when(s) {
      return s.replace(/\s=\s/g,' === ')
    }
    function then(s) {
      return s.replace(/\[\]\.(.*)/g,'.forEach(i=>i.$1)')
    }
    function add(s, i){
      $('div').parent(parent).text(s.replace(/(^|\n)/gs, '$1'+'  '.repeat(i)));
    }
    $().url('').query('name', fn_config).query('ext', 'yaml').get().then(event => {
      Object.entries(event.body.components.schemas).forEach(([schemaName,schema]) => {
        var added = false;
        if (!schema.properties) return;
        Object.entries(schema.properties).forEach(([propertyName,property])=>{
          if (property.value) {
            if (!added) {
              added = true;
              add(`${schemaName} = function(){}`);
              add(`${schemaName}.prototype = {`);
            }
            add(`${propertyName}() {`, 1);
            delete property.error;
            const code = property.value.map(
              rule =>
              rule.when
              ? `if (\n  (${rule.when.map(when).join(') &&\n  (')})\n) {\n  ${rule.then.map(then).map(l => l+';').join('\n  ')}\n}`
              : `${rule.then.map(then).map(l => l+';').join('\n')}`
            ).join('\n');
            try {
              new Function(code);
              add(code,2);
            } catch (err) {
              property.error = String(err);
              add('// ERROR: '+String(err)+'\n'+code.split('\n').map(l=>'// '+l).join('\n'),2);
            }
            add(`},`, 1);
          }
        })
        if (added) {
          add(`};`);
        }
      })
      const code = parent.elem.innerText;
      $().url('')
      .query('name', '../js/config.control.js')
      .post(code)
      parent.text('').html($.String.js(code))

      $().url('')
      .query('name', fn_config)
      .query('ext', 'yaml')
      .post(JSON.stringify(event.body))
      // .then(event => $('example').src('src/config.js'));
    });
  },
}


$().on({
  load() {
    $('pdfsource').href(url);
  },
  ready() {

    return;

    $().url('config.json').get().then(event => {
      $().extend(event.body);
      // console.log(AIM.components);
      get_eisen();
    });
    // return test();
    // return make_eisen();
    // return get_eisen(true);
  }
});

// function start_operations () {
//   console.log('START =====');
//   Hoogtedetector[1] = new Hoogtedetector();
//   Hoogtedetector[1].lfv_hd = {
//     bestuurbaar: NEE,
//   };
//   Hoogtedetector[1].SetDisabled();
//   console.log('Hoogtedetector',Hoogtedetector[1]);
// }
// function make_js() {
//   code = '';
//   constant_values = constant_values.map(key => key.replace(/_| |-/g,'_').replace(/\n/g,'').toUpperCase());
//   code += constant_values.map(key => `const ${key} = '${key.toLowerCase()}'`).join('\n');
//
//
//   return code;
// }

// config = {
//   components: {
//     schemas: schemas = {
//
//     }
//   }
// };
