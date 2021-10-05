<?php
header('Access-Control-Allow-Methods: GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH');
ini_set('display_errors', 0);
function make_array($input) {
	return json_decode(json_encode($input),true);
}
function make_object($arr) {
	return json_decode(json_encode($arr));
}
function debug() {
	$t = microtime(true)*1000-__startTime;
	$arg_list = func_get_args();
	$bt = debug_backtrace();
	array_unshift ($arg_list, str_replace('\\', '/', (!isset($bt[1]) ? '' : ($bt[1]['file']).' '.(isset($bt[1]['class'])?$bt[1]['class']:'').'.'.$bt[1]['function'].':')).$bt[0]['line'].' '.$t.'ms');
	header('Content-Type: application/json');
	die(json_encode($arg_list,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING & ~E_STRICT & ~E_DEPRECATED);
function code_line($line) {
	global $schemaName,$const;
	$line = trim($line);
	$line = preg_replace('/#(\w+)/ms', "$1", $line);
	$line = preg_replace_callback('/(\s)([\w\.\[\]]+)/s', function($matches) {
		global $schemaName,$const;
		$word = $matches[2];
		if (is_numeric($word)) return ' '.$word;
		if (preg_match('/^[A-Z0-9_]+$/', $word)) return ' '.$word;

		if ($const[$word]) return ' '.$const[$word];
		return " $schemaName.$word";
	}, ' '.$line);
	$line = preg_replace('/\._/ms', ".", $line);
	return trim($line);
}
function state_line($line) {
	$line = preg_replace('/overige situaties|\*/ms', "1", $line);
	$line = preg_replace('/\|\|\s*/ms', "||\n  ", $line);
	$line = code_line($line);
	// return $line;
	$line = preg_replace('/(\w+)\[\]\.([\w\s!=<>#]+)/', '$1.every($1=>$1.$2 ) ', $line);
	$line = preg_replace('/(\w+)\[[i|j]\]\.([\w\s!=<>#]+)/', '$1.some($1=>$1.$2 ) ', $line);
	$line = preg_replace('/(\w+)\[[i|j]\][\s|=]+([\w\s=]+)/', '$1.some($2) ', $line);
	// $line = preg_replace('/(\w+)\[j\]\.([\w\s!=<>#]+)/', '$1.some($1 => $1$2) ', $line);


	$line = preg_replace_callback('/([\w\.]+)\s=\s\((.*?)\)/ms', function($matches) {
		$matches[2] = str_replace("|",",",$matches[2]);
		return "[ $matches[2] ].includes( $matches[1] )";
	}, $line);
	$line = preg_replace('/\s=\s/ms', " === ", $line);
	$line = preg_replace('/\s!=\s/ms', " !== ", $line);
	$line = preg_replace('/\s<>\s/ms', " !== ", $line);
	return $line;
}
function action_line($line) {
	$line = preg_replace('/([\w\.]+\(.*?\))/ms', "\n$1\n", $line);
	$line = preg_replace('/:=/s', "=", $line);
	// return $line;
	return code_line($line).';';
}
$lang = [
	'js'=> [
		'if'=> "if (",
		'endif'=> "",
		'then'=> ") {",
		'endthen'=> "\n}",
		'value'=> "\nreturn \n",
		'endvalue'=> "\n\n",
		'split'=> " else ",
		'close'=> "",
		'and'=> "&&",
	],
	'st'=> [
		'if'=> "IF",
		'endif'=> "",
		'then'=> "THEN",
		'endthen'=> "",
		'value'=> "\n\n",
		'endvalue'=> "\nRETURN \n",
		'split'=> "\nELS",
		'and'=> "AND",
		'close'=> "\nEND_IF",
	]
];

// function make_operation_code($operation, $schemaName, $lang) {
// 	global $ln;
// 	$ln = (object)$GLOBALS['lang'][$lang];
// 	$code = array_map(function($actie) {
// 		global $schemaName,$ln;
// 		$state = implode(" ".$ln->and."\n  ",array_map(state_line,$actie['state']));
// 		if ($actie['operation']) {
// 			$content = $ln->if."\n  ".$state.$ln->endif;
// 			$line = array_map(action_line,$actie['operation']);
// 			$line = implode("\n  ",$line);
// 			$content .= "\n".$ln->then."\n  ".$line.$ln->endthen;
// 		}
// 		else if ($actie['value']) {
// 			$content = $ln->if."\n  ".$state.$ln->endif;
// 			$line = action_line($actie['value']);
// 			$content .= "\n".$ln->then."\n  return ".$line.$ln->endthen;
// 			// $content .= $ln->value.$line.$ln->endvalue;
// 		}
// 		else {
// 			$content = "return ".$state;
// 		}
// 		return $content;
// 	}, $operation['control']);
// 	$code = implode($ln->split,$code).$ln->close;
// 	$code = implode("\n",array_map(function($line){
// 		global $ln;
// 		if (strstr($line,trim($ln->close))) return $line;
// 		if (strstr($line,trim($ln->if))) return "/* state */ ".$line;
// 		if (strstr($line,trim($ln->then))) return "/* operation */ ".$line;
// 		return $line;
// 	},explode("\n", $code)));
// 	return $code;
// }

function make_js($config) {
	global $const;
	foreach ($config['components']['schemas'] as $schemaName => $schema) {
		foreach ($schema['properties'] as $propertyName => $property) {
			if ($property['enum']) {
				foreach($property['enum'] as $key) {
					$key = str_replace(' ','_',$key);
					$const[strtoupper($key)] = "'$key'";//"const ".strtoupper($key)."='$key';";
				}
			}
		}
	}
	ksort($const);
	foreach ($const as $key => $value) {
		$content[] = "const $key=$value;";
	}
	foreach ($config['components']['schemas'] as $schemaName => $schema) {
		$content[] = "function $schemaName(id) {}";
		// $content[] = "  AIM.setSchema.call(this);";
		// $content[] = "}";
		foreach ($schema['operations'] as $operationName => $operation) {
			if ($operation['code']) {
				// $code[] = "";
				$operationName = str_replace(['*'],'',$operationName);
				$content[] = "/** @function $schemaName.$operationName";
				$content[] = "  * ".wordwrap(str_replace("\n"," ",$operation['description']),80,"\n  *   ");
				$content[] = "  */";
				$content[] = "$schemaName.prototype.$operationName = function () {";
				$content[] = "  ".str_replace("\n","\n  ",$operation['code']);
				$content[] = "};";
			}
		}
		// if (!empty($code)) {
		// 	$content[] = "function $schemaName(id) {}";
		// 	$content[] = "  const $schemaName = AIM.ref[id];";
		// 	$content[] = "  return {";
		// 	$content[] = implode("\n",$code);
		// 	$content[] = "  }";
		// }
	}
	file_put_contents('js/operations.js', implode("\n",$content));
}

if ($_GET['name']) {
  $input = file_get_contents('php://input');
  if ($_GET['ext'] === 'yaml') {
    if ($input) {
      yaml_emit_file($_GET['name'] . '.yaml', json_decode($input,true));
    } else {
      header('Content-Type: application/json');
      echo json_encode(yaml_parse_file($_GET['name'] . '.yaml'));
      die();
    }
  }
  else if ($input) {
    file_put_contents($_GET['name'], $input);
  }
}



if ($input = file_get_contents('php://input')) {
	if ($_GET['yaml']) {
		$input = json_decode(file_get_contents('php://input'), true);
		$resp->config = yaml_emit($input['config']);
		if ($_GET['yaml'] === 'config') {
			$config = yaml_parse_file('config.yaml');
			$config = array_replace_recursive($config ?: [], $input['config'] ?: []);
			yaml_emit_file('config.yaml', $config);
			file_put_contents('config.json', json_encode($config));
			// $resp->js .= 'sfshadlfjaskldfh';
			// make_js($config);
			function check_for_code () {
				global $input,$config;
				foreach ($input['config']['components']['schemas'] as $schemaName => $schema) {
					foreach ($schema['operations'] as $operationName => $operation) {
						if ($operation['code']) {
							make_js($config);
							return;
						}
					}
					foreach ($schema['properties'] as $operationName => $operation) {
						// $resp->js .= make_operation_code($operation, $schemaName, 'js');
						// $resp->st .= make_operation_code($operation, $schemaName, 'st');
					}
				}
			}
			check_for_code();

			unset($input['config']);
			$eisen = json_decode(file_get_contents('lfv_eisen_src.json'), true);
			$eis = [$input['nr'] => $input];
			$eisen = array_replace_recursive($eisen, $eis);
			file_put_contents('lfv_eisen_src.json',json_encode($eisen));
			// yaml_emit_file('data_get.yaml',$input);
			// $resp->st = yaml_emit($config['row']);
		}
		header('Content-Type: application/json');
		die(json_encode($resp));
	}
  // if ($_GET['name']) {
  //   file_put_contents($_GET['name'], $input);
  // }
  if ($_GET['ext'] === 'yaml') {
    yaml_emit_file($_GET['name'] . '.yaml', json_decode($input,true));
  } else {
    file_put_contents('bstti.'.$_GET['ext'], $input);
  }
}
else if ($_GET['make'] === 'html') {
  $doc = yaml_parse_file('bstti.pdf.yaml');
  function write ($doc,$level) {
    foreach ($doc as $key => $chapter) {
      if (is_array($chapter)) {
        if (!is_numeric($key)) {
          echo "<H$level>$key</H$level>".PHP_EOL;
        }
        write ($chapter,$level+1);
      } else {
        echo "<p>$chapter</p>".PHP_EOL;
      }
    }
  }
  write($doc['document'], 1);
  die();
}
else if ($_GET['make'] === 'eisen') {
	$doc = yaml_parse_file('bstti.pdf.yaml');
	$doc = json_encode($doc);
  $doc = str_replace('*BewaakAlarmenSchouwlijst','*BewaakAlarmenSchouwlijst()',$doc);
  $doc = str_replace('*HerhaalGeluidsbakenBoodschap','*HerhaalGeluidsbakenBoodschap()',$doc);
  $doc = json_decode($doc);
	$path = [];
	function modify($doc, $level) {
    global $path,$type,$schema,$eisen;
		$path = array_slice($path, 0, $level-1);
		if (is_array($doc)) {
			$lines = '  '.implode('  ',array_filter($doc, function($row){return is_string($row);}));
			$plit = preg_split('/\s\sBSTTI#/s', $lines);
			array_shift($plit);
			if(!empty($plit)) {
				foreach($plit as $line) {
					if (preg_match('/(^[0-9]+)\s(.*)/s', $line, $match)) {
						$id = "BSTTI#" . $match[1];
						$eisen[$id] = (object)[
							'nr'=> $id,
							'line'=> $match[2],
							'path'=> $path,
						];
					}
				}
			}
		}
    foreach ($doc as $key => $chapter) {
      if (is_object($doc)) {
        $path[$level] = $key;
      }
      if (is_object($chapter)) {
        modify($chapter,$level);
      } else if (is_array($chapter)) {
        $doc->{$key} = modify($chapter,$level+1);
      }
    }
    return $doc;
  }
  modify($doc->document, 1);
	// debug($eisen);
	function array_intersect_all($arr,$match) {
		return count($match) === count(array_intersect($arr,$match));
	}
	$lfv = array_filter($eisen, function($eis) {
		if (array_intersect_all($eis->path,["Besturing","LFV's van een Verkeersbuis"])) return true;
		if (array_intersect_all($eis->path,["Besturing","LFV's van een Dienstgebouw"])) return true;
		if (array_intersect_all($eis->path,["Besturing","LFV's van een Veilige Ruimte"])) return true;
		if (array_intersect_all($eis->path,["Besturing","LFV's op Tunnel niveau"])) return true;
		if (array_intersect_all($eis->path,["Functies van een Verkeersbuis"])) return true;
		if (array_intersect_all($eis->path,["Functies van een Dienstgebouw"])) return true;
		if (array_intersect_all($eis->path,["Functies van een Veilige Ruimte"])) return true;
		if (array_intersect_all($eis->path,["Functies op Tunnel-niveau"])) return true;
	});
	$content = json_encode($lfv);
	file_put_contents('lfv_eisen.json',$content);
	// file_put_contents('lfv_eisen_src.json',$content);
	// file_put_contents('lfv_eisen_src.json',array_replace_recursive(json_decode(file_get_contents('lfv_eisen.json'), true),$content));
	header('Content-Type: application/json');
	die($content);
} else if ($_GET['make'] === 'config') {

	// $bstti = file_get_contents('bstti.pdf.yaml');
	// $bstti = preg_replace_callback(['/(#)([a-z]\w+)/s','/(\b_)([a-z]\w+)/s','/(\b\*)([a-z]\w+)/s'], function($match){
	// 	global $replacestr;
	// 	$replacestr[$match[0]] = $match[2];
	// 	return $match[2];
	// }, $bstti);
	// ksort($replacestr);
	// debug($replacestr);
	// die($bstti);

	$doc = yaml_parse_file('bstti.pdf.yaml');

  $doc = json_encode($doc);
  $doc = str_replace('*BewaakAlarmenSchouwlijst','*BewaakAlarmenSchouwlijst()',$doc);
  $doc = str_replace('*HerhaalGeluidsbakenBoodschap','*HerhaalGeluidsbakenBoodschap()',$doc);
  $doc = json_decode($doc);

  $path = [];
  function trimpar ($val) {
    return ltrim(ltrim(trim($val),':'));
  }
  function make_commando($matches_all) {
    foreach ($matches_all[1] as $i => $key) {
      $param =
      $commandos[$key] = [
        'param'=> array_map(trimpar,explode(',',$matches_all[2][$i])),
        'description'=> trimpar($matches_all[3][$i]),
      ];
    }
    return $commandos;
  }
  function make_var($matches_all) {
    foreach ($matches_all[1] as $i => $key) {
      $par = [
        'name'=> trimpar($matches_all[1][$i])
      ];
      $text = trimpar($matches_all[2][$i]);

      if (preg_match('/(.*\s\|\s\w+)\s?(\w+.*)/', $text, $matches)) {
        // die(json_encode([$text, $matches]));
        $par['enum'] = explode(' | ',$matches[1]);
        $text = $matches[2];
      };
      $par['description'] = $text;
      $content[] = $par;
    }
    return $content;
  }
  $schemas = (object)[];
  $rules = [];
  $rename = [
    'ja'=> 'JA',
    'nee'=> 'NEE',
  ];

  function renameName($name,$lc = false) {
    global $rename;
    $newname = $name;
    $newname = str_replace(['#','!'],'',$newname);
    $newname = implode('',array_map(ucfirst,(explode(' ',$newname))));
    $newname = implode('',array_map(ucfirst,(explode('_',$newname))));
    $newname = implode('',array_map(ucfirst,(explode('-',$newname))));
    if ($lc) $newname = lcfirst($newname);
    if ($name && $newname && $name !== $newname) {
      $rename[$name] = $newname;
    }
    return $newname;
  }
	function schemaName($path){
		$exclude = [
      "Besturing",
      "Variabelen",
      "Bedieningen",
      "Besturingen",
      "Configuratie",
      "Beeldcontrast",
      "Uitvoering",
      "UKVC",
      "Deelkoppelvlakken",
      "Autonome",
      "processen",
      "elementen",
      "LFV's",
      "van",
      "tot",
      "of",
      "en",
      "in",
      "een",
      "op",
      "niveau",
      "Functies",
      "functies"
    ];
		$path = array_values(array_filter($path));
		$namePath = array_values(array_filter(array_unique(array_diff(preg_split('/_| |-|,|\(|\)|UKVC[0-9]/',implode('_',array_map(function($name){return str_replace(['ö'],['o'],$name);},$path))),$exclude))));
		return implode('/',$namePath);
	}
  function setSchema($path,$level,$levelBij=2) {
    global $schemas, $schema, $parents;

    $exclude = [
      "Besturing",
      "Variabelen",
      "Bedieningen",
      "Besturingen",
      "Configuratie",
      "Beeldcontrast",
      "Uitvoering",
      "UKVC",
      "Deelkoppelvlakken",
      "Autonome",
      "processen",
      "elementen",
      "LFV's",
      "van",
      "tot",
      "of",
      "en",
      "in",
      "een",
      "op",
      "niveau",
      "Functies",
      "functies"
    ];
    $schema = (object)[];
    $path = array_values(array_filter($path));
    $schema->bsttiPath = array_slice($path, 0, $level);
    $namePath = array_values(array_filter(array_unique(array_diff(preg_split('/_| |-|,|\(|\)|UKVC[0-9]/',implode('_',array_map(function($name){return str_replace(['ö'],['o'],$name);},$path))),$exclude))));
    $schema->parent = str_replace('Veilige','VeiligeRuimte',$namePath[0]);
    $name = implode('',$namePath);

    // $name = $path[$level];
    // $name = str_replace(['ö','\xF6'],'o',$name);
    // $name = renameName($name);
    $schema->bsttiName = $path[$level];
    // $schema->bsttiLevel = $level;
    // if (strstr($name,'Verkeersbuis')) {
    //   $schema->parent = 'Verkeersbuis';
    // }

    // $name = $schema->parent.str_replace($schema->parent,'',$name);
    // $schema = $schemas->{$name} = $schemas->{$name} ?: $schema;
    // if (strstr($name,'VerlichtingVerkeersbuisBesturing')) {
    //   debug($name,$schema);
    // }


    return $parents->{$schema->parent}->components->schemas->{$name} = $schemas->{$name} = $schemas->{$name} ?: $schema;
  }
  function clean($line) {
    $line = str_replace(["\r"]," ",$line);
    $line = str_replace(["\n"]," ",$line);
    $line = str_replace(["  "]," ",$line);
    $line = str_replace(["  "]," ",$line);
    $line = str_replace(["  "]," ",$line);
    $line = str_replace(["  "]," ",$line);
    $line = str_replace(["  "]," ",$line);
    // $property->description = str_replace(["; ="]," =",$property->description);
    // $property->description = str_replace(["; <"]," <",$property->description);
    // $property->description = str_replace(["; >"]," >",$property->description);
    // $property->description = str_replace(["; |"]," |",$property->description);
    // $property->description = str_replace(["; &"]," &",$property->description);
    // $property->description = str_replace(["; ("]," (",$property->description);
    // $property->description = str_replace(["  ",""],"",$property->description);
    return trim($line);
  }
  function code($line) {
    // $line = '_lfv_camera.SetDiafragma(diafragma) huidige_preset := leeg';
    $line = clean($line);
    $line = preg_replace("/(\)\s)(\w)/", "$1; $2", $line);
    // die($line);
    return $line;
  }
	function then ($then) {
		$then = trim($then);
		$then = trim(preg_replace('/\}$/s','',$then));

		$then = trim(preg_replace('/^\{(.*)\}$/s','$1',$then));
		$then = preg_replace('/(\+|:|=|,|\(|\.)\s/s','$1',$then);
		$then = preg_replace('/\s(\+|:|=|\))/s','$1',$then);

		$then = array_values(array_filter(preg_split('/\ben\b|;| /',$then)));
		$then = array_map(function($then){
			return preg_replace(array_keys($GLOBALS['repl_then']),array_values($GLOBALS['repl_then']), $then);// .' // bstti '. $then;
		}, $then);
		return $then;
	}

	$docrules = (object)[];
	function makerule ($schema,$line,$level) {
		global $path,$type,$schema,$docrules;
		$docpath = array_values(array_slice($path, 0, $level-1));
		$repl = [
			"/\bals\b/"=> "}if(",
			"/\bdan\b/"=> ")then{",
			"/\bConditie:\s/"=> "}if(",
			"/\bActies:\s/"=> ")then{",
			"/\bWaarde:\s/"=> ")then{",
			"/\r|\n/"=> " ",
		];
		$GLOBALS['repl_if'] = [
			// '/=/s' => ' is ',
			// '/=/s' => ' === ',
			'/\s\s/s'=> ' ',
			// '/\s\|\s|\s\|\|\s/s'=> ' of ',
			// '/\s\|\s|\s\|\|\s/s'=> ' || ',
			// '/\s\&&\s/s'=> ' en ',
			// '/\s\<>\s/s'=> ' ongelijk ',
			'/\s<>\s/s'=> ' != ',
		];

		$GLOBALS['repl_then'] = [
			'/:=/s' => ' = ',
			'/<>/s'=> ' != ',
			'/\s\s/s'=> ' ',
		];


		$line = camelCase($line);
		if ($index = array_search('Configuratie-elementen', $docpath) && preg_match('/\s_[\w_]+:/',$line)) {
			if (preg_match('/(^BSTTI#\d+)\s(.*)/',$line,$match)) {
				$schemaname = renameName($docpath[$index - 1]);
				$docrules->components->schemas->$schemaname->bsttiName = $docpath[$index - 1];
				$docrule = $docrules->components->schemas->$schemaname->properties = $docrules->components->schemas->$schemaname->properties ?: (object)[];
				$rule->bstti->nr = $match[1];
				$line = trim($match[2]);
				$line = str_replace('  ',' ',$line);
				$rule->bstti->tekst = $line;
				preg_match('/(.*?)_([\w_]+):(.*)/',$line,$match);
				if (trim($match[1])) $rule->prefix = trim($match[1]);
				$name = $match[2];
				$rule->label = 'Configuratie';
				$rule->title = $rule->bstti->name = '_'.$name;
				$name = camelCase($name);
				$line = camelCase($line);
				$rule->tekst = $line;
				// $name = renameName($name);
				$docrule->$name = $rule;
				// $rule->stereotype = 'configuratie';
				$line = camelCase(trim($match[3]));
				if (preg_match('/(.*\s\|\s\w+)\s(?=[A-Z])(\w+.*)/', $line, $match)) {
					$rule->enum = explode(' | ',$match[1]);
					$line = trim($match[2]);
				};
				if (preg_match('/(.*?)(Conditie:.*)/', $line, $match)) {
					$rule->description = trim($match[1]);
					$line = trim($match[2]);
					$repl = [
						"/\bals\b/"=> "}if(",
						"/\bdan\b/"=> ")then{",
						"/\bConditie:\s/"=> "}if(",
						"/\bActies:\s/"=> ")then{",
						"/\bWaarde:\s/"=> ")then{",
						"/\r|\n/"=> " ",
					];
					$line = preg_replace(array_keys($repl),array_values($repl),$line).'}';
					if (preg_match("/(.*?)\}(if\(.*)/s",$line,$match)) {
						$lines = explode("}if(", $line);
						array_shift($lines);
						$rule->waarde = array_map(function($line){
							$line = explode(')then{', $line);
							$if = trim($line[0]);
							$if = trim(preg_replace('/^\((.*)\)$/s','$1',$if));
							$if = preg_replace([
								'/=/s',
								'/\s\s/s',
								'/\s\|\s|\s\|\|\s/s',
								'/\s\&&\s/s',
							], [
								' is ',
								' ',
								' of ',
								' en ',
							], $if);
							$then = trim($line[1]);
							$then = trim(preg_replace('/\}$/s','',$then));
							return ['als'=>$if, 'dan'=>$then];
						}, $lines);
						// $rule->js = trim(implode(" else ",array_map(function($block){
					  //   $if = $block['als'];
					  //   $if = preg_replace('/\sis\s/', ' === ', $if);
					  //   $if = preg_replace('/\sen\s/', " && ", $if);
					  //   $if = preg_replace('/\sof\s/', " || ", $if);
					  //   $if = preg_replace('/\s([a-z]+)(\s|$)/', " '$1' ", $if);
						//
						// 	$then = $block['dan'];
					  //   // $then = implode(";",$then);
					  //   // $then = preg_replace('/\b(\w+)\[\]\(/', '$1.foreach($1=>$1.', $then);
					  //   // $then = preg_replace('/(\(|,)([a-z]+)(,|\))/', "$1'$2'$3", $then);
					  //   // $then = preg_replace('/(\(|,)([a-z]+)(,|\))/', "$1'$2'$3", $then);
					  //   return "if ($if) { return $then; }";
					  // }, $rule->waarde)));
					}
				}
				$rule->description = $line;
				// debug($docpath,$line,$schemaname,$rule);
			}
		}
		else if ($index = array_search('Variabelen', $docpath) && preg_match('/Waarde/',$line)) {
			if (preg_match('/(^BSTTI#\d+)\s(.*)/',$line,$match)) {
				$schemaname = renameName($docpath[$index - 1]);
				$docrules->components->schemas->$schemaname->bsttiName = $docpath[$index - 1];
				$docrule = $docrules->components->schemas->$schemaname->properties = $docrules->components->schemas->$schemaname->properties ?: (object)[];
				$rule->bstti = $match[1];
				$line = trim($match[2]);
				$line = str_replace('  ',' ',$line);
				$rule->bsttiTekst = $line;
				preg_match('/#([\w_]+):(.*)/',$line,$match);
				$name = $match[1];
				$rule->bsttiName = '#'.$name;
				$name = renameName($name);
				$docrule->$name = $rule;
				$rule->stereotype = 'variabele';
				$line = trim($match[2]);
				if (preg_match('/(.*\s\|\s\w+)\s(?=[A-Z])(\w+.*)/', $line, $match)) {
					$rule->enum = explode(' | ',$match[1]);
					$line = trim($match[2]);
				};
				if (preg_match('/(.*?)(Conditie:.*)/', $line, $match)) {
					$rule->description = trim($match[1]);
					$line = trim($match[2]);
					$line = preg_replace(array_keys($repl),array_values($repl),$line).'}';
					if (preg_match("/(.*?)\}(if\(.*)/s",$line,$match)) {
						$lines = explode("}if(", $line);
						array_shift($lines);
						$rule->waarde = array_map(function($line){
							$line = explode(')then{', $line);
							$if = trim($line[0]);
							$if = trim(preg_replace('/^\((.*)\)$/s','$1',$if));
							$if = preg_replace(array_keys($GLOBALS['repl_if']),array_values($GLOBALS['repl_if']), $if);
							$then = trim($line[1]);
							$then = trim(preg_replace('/\}$/s','',$then));
							return ['als'=>$if, 'dan'=>$then];
						}, $lines);
					}
				}
			}
		}
		else if ($index = array_search('Besturingen', $docpath) || array_search('Bedieningen', $docpath) ) {
			if (preg_match('/(^BSTTI#\d+)\s(.*)/',$line,$match)) {
				$schemaname = renameName($docpath[$index - 1]);
				$docrules->components->schemas->$schemaname->bsttiName = $docpath[$index - 1];
				$docrule = $docrules->components->schemas->$schemaname->operations = $docrules->components->schemas->$schemaname->operations ?: (object)[];
				$rule->bstti = $match[1];
				$line = trim($match[2]);
				$line = str_replace('  ',' ',$line);
				$rule->bsttiTekst = $line;
				preg_match('/([\w_]+)\((.*?)\)(.*)/',$line,$match);
				$name = $match[1];
				$rule->label = 'Besturing';
				$rule->title = $name;
				$name = renameName($name, true);
				$docrule->$name = $rule;
				if ($match[2]) {
					$rule->param = trim($match[2]);
					$rule->param = explode(',',$rule->param);
					$rule->param = array_map(function($param){
						$param = explode(': ', $param);
						$ret->name = array_shift($param);
						$ret->type = 'string';
						$enum = array_shift($param);
						if ($enum) $ret->enum = explode(' | ',$enum);
						return $ret;
					}, $rule->param);
				}
				$line = trim($match[3]);
				if (preg_match('/(.*?)(Conditie:.*)/', $line, $match)) {
					$rule->description = trim($match[1]);
					$line = trim($match[2]);
					$line = preg_replace(array_keys($repl),array_values($repl),$line).'}';
					if (preg_match("/(.*?)\}(if\(.*)/s",$line,$match)) {
						$lines = explode("}if(", $line);
						array_shift($lines);
						$rule->acties = array_map(function($line){
							$line = explode(')then{', $line);
							$if = trim($line[0]);
							$if = trim(preg_replace('/^\((.*)\)$/s','$1',$if));
							$if = preg_replace(array_keys($GLOBALS['repl_if']),array_values($GLOBALS['repl_if']), $if);
							$then = then($line[1]);
							return ['als'=>$if, 'dan'=>$then];
						}, $lines);
					}
				}
			}
		}
		else if ($index = array_search('Autonome processen', $docpath)) {
			if (preg_match('/(^BSTTI#\d+)\s(.*)/',$line,$match)) {
				$schemaname = renameName($docpath[$index - 1]);
				$docrules->components->schemas->$schemaname->bsttiName = $docpath[$index - 1];
				$docrule = $docrules->components->schemas->$schemaname->operations = $docrules->components->schemas->$schemaname->operations ?: (object)[];
				$rule->bstti = $match[1];
				$line = trim($match[2]);
				$line = str_replace('  ',' ',$line);
				$rule->bsttiTekst = $line;
				preg_match('/\*([\w_]+)\s(.*)/',$line,$match);
				$name = $match[1];
				$rule->label = 'proces';
				$rule->title = '*'.$name;
				$name = renameName($name, true);
				$docrule->$name = $rule;
				$line = trim($match[2]);

				if (preg_match('/(.*?)(Conditie:.*)/', $line, $match)) {
					$rule->description = trim($match[1]);
					$line = trim($match[2]);
					$line = preg_replace(array_keys($repl),array_values($repl),$line).'}';
					if (preg_match("/(.*?)\}(if\(.*)/s",$line,$match)) {
						$lines = explode("}if(", $line);
						array_shift($lines);
						$rule->acties = array_map(function($line){
							$line = explode(')then{', $line);
							$if = trim($line[0]);
							$if = trim(preg_replace('/^\((.*)\)$/s','$1',$if));
							$if = preg_replace(array_keys($GLOBALS['repl_if']),array_values($GLOBALS['repl_if']), $if);

							$then = then($line[1]);
							return ['als'=>$if, 'dan'=>$then];
						}, $lines);
					}
				}
			}
		}
	}
  function makeProperty ($property, $type, $description) {
    global $rules;
    $property->type = $type;
    $property->description = clean($description);
    $property->description = trimpar($description);

    $split = preg_split('/Init:\s/', $property->description);
    if ($split[1]) {
      $property->description = array_shift($split);
      $property->init = array_shift($split);
    }
    $split = preg_split('/Conditie:\s/', ' ' . $property->description);
    if ($split[1]) {
      $property->description = array_shift($split);
      foreach ($split as $i => $conditieregel) {
        $arr = preg_split('/Acties:\s/', $conditieregel);
        if ($arr[1]) {
          $rules[] = $property->rules[] = $rule = (object)[
            'conditie'=> clean(array_shift($arr)),
            'acties'=> array_map(trim,explode(';',code(array_shift($arr))))
          ];
        } else {
          $arr = preg_split('/Waarde:\s/', $conditieregel);
          if ($arr[1]) {
            $rules[] = $property->rules[] = $rule = (object)[
              'conditie'=> code(array_shift($arr)),
              'waarde'=> code(array_shift($arr)),
            ];
          } else {
            $rules[] = $property->rules[] = $rule = (object)[
              'conditie'=> code(array_shift($arr)),
            ];
          }
        }
      }
    }
    if (preg_match('/(.*\s\|\s\w+)\s?(\w+.*)/', $property->description, $matches)) {
      $property->enum = explode(' | ',$matches[1]);
      $property->description = trimpar($matches[2]);
    };
  }
  function modify($doc, $level) {
    global $path,$type,$schema,$eisen;
		$path = array_slice($path, 0, $level-1);
		if (is_array($doc)) {
			$lines = '  '.implode('  ',array_filter($doc, function($row){return is_string($row);}));
			// if ($index = array_search("De LFV's van een Verkeersbuis", $path)) {
			$plit = preg_split('/\s\sBSTTI#/s', $lines);
			array_shift($plit);
			if(!empty($plit)) {
				foreach($plit as $line) {
					if (preg_match('/(^[0-9]+)\s(.*)/s', $line, $match)) {
						$eisen[] = (object)[
							'nr'=> $match[1],
							'line'=> $match[2],
							// 'lines'=> $lines,
							'path'=> $path,
						];
					}
				}
			}
				// if ($plit = preg_split('/BSTTI#/s', $lines)) {
					// (object)[
					// 	'nr'=> $match_nr[1],
					// 	'tekst'=> $match_nr[2],
					// 	// 'doc'=> $doc,
					// 	'path'=> array_slice($path, 0, $level-1),
					// ];
					// debug(1, $match);
				// }
				// debug(1, $lines);
			// }
		}

    foreach ($doc as $key => $chapter) {
      if (is_object($doc)) {
        $path[$level] = $key;
        // if ($key==='Configuratie-elementen') {
        //   $type='configuratie';
        //   setSchema($path,$level-1);
        // } else if ($key==='Variabelen') {
        //   $type='variabele';
        //   setSchema($path,$level-1);
        // } else if ($key==='Bedieningen') {
        //   $type='bediening';
        //   setSchema($path,$level-1);
        // } else if ($key==='Besturingen') {
        //   $type='besturing';
        //   setSchema($path,$level-1);
        // } else if ($key==='Autonome processen') {
        //   $type='proces';
        //   setSchema($path,$level-1);
        // }
      }
      if (is_object($chapter)) {
        modify($chapter,$level);
      } else if (is_array($chapter)) {
        $doc->{$key} = modify($chapter,$level+1);
      } else {
				continue;
        if (preg_match('/^(BSTTI#[0-9]+)\s(.*)/s', $chapter, $match_nr)) {
					// $path = array_values(array_filter($path));
					// $schema->bsttiPath = array_slice($path, 0, $level);

					$eisen[] = (object)[
						'nr'=> $match_nr[1],
						'tekst'=> $match_nr[2],
						// 'doc'=> $doc,
						'path'=> array_slice($path, 0, $level-1),
					];
					continue;
					makerule($schema,$chapter,$level);

          $bsttiEisNr = $match_nr[1];
          $eisTekst = $match_nr[2];
          $eisTekst = str_replace('  ',' ',$eisTekst);
          $doc[$key] = $eis = (object)[ 'eisNr'=> $match_nr[1], 'eisTekst'=> $eisTekst, 'type'=>$type ];
          if ($type==='variabele' && preg_match('/^#(\w+)?:\s(.*)/', $eisTekst, $match)) {
            $bsttiName = "#".$match[1];
            $propertyName = renameName($match[1]);
            $schema->properties->{$propertyName}->bsttiName = $bsttiName;
            $schema->properties->{$propertyName}->bsttiEisNr = $bsttiEisNr;
            $schema->properties->{$propertyName}->bsttiEisTekst = $chapter;
            makeProperty($schema->properties->{$propertyName}, $type, $match[2]);
          } else if ($type==='configuratie' && preg_match('/^_(\w+)?:\s(.*)/', $eisTekst, $match)) {
            $bsttiName = "_".$match[1];
            $propertyName = renameName($match[1]);
            $schema->properties->{$propertyName}->bsttiName = $bsttiName;
            $schema->properties->{$propertyName}->bsttiEisNr = $bsttiEisNr;
            $schema->properties->{$propertyName}->bsttiEisTekst = $chapter;
            makeProperty($schema->properties->{$propertyName}, $type, $match[2]);
          } else if (in_array($type, ['bediening','besturing','proces']) && preg_match('/([a-zA-Z_]+)\((.*?)\)\s(.*)/', $chapter, $match)) {
            $newname = renameName($bsttiName = $match[1], true);
            // if ($newname === 'herhaalGeluidsbakenBoodschap1') {
            //   $isp = preg_match('/([a-zA-Z_]+)\((.*?)\)\s(.*)/', $chapter, $t);
            //   die(json_encode([$chapter,$match,$isp,$t]));
            // }
            $property = $schema->operations->{$newname} = (object)[];
            $property->bsttiName = $bsttiName;
            $property->bsttiEisNr = $bsttiEisNr;
            $property->bsttiEisTekst = $chapter;
            if ($match[2]) {
              $property->params = trimpar($match[2]);
            }
            makeProperty($property, $type, $match[3]);
          } else if (preg_match('/commando.*ondersteunen/', $chapter)) {
            $chapter = strstr($chapter, ':');
            if (preg_match_all('/([a-zA-Z_]+)?\((.*?)\)(.*)/', $chapter, $match)) {
              $newname = renameName($bsttiName = $match[1][0], true);
              setSchema($path,$level-2,1);

              $type='commando';
              $property = $schema->operations->{$newname} = (object)[];
              $property->bsttiName = $bsttiName;
              $property->bsttiEisNr = $bsttiEisNr;
              $property->bsttiEisTekst = $chapter;
              $property->commandos = make_commando($match);
            }
          } else if (preg_match_all('/(#[a-zA-Z_]+):([^#]*)/', $chapter, $matches)) {
            if ($path[$level-2] === 'Besturing') {
              // debug($path, $path[$level-2]);
              setSchema($path,$level-1,2);
              // debug($schema);
            } else {
              setSchema($path,$level-2,1);
            }
            foreach ($matches[1] as $i => $key) {
              $property = (object)[];
              $property->type='toestand';
              $property->bsttiName = $matches[1][$i];
              $property->bsttiEisNr = $bsttiEisNr;
              $property->bsttiEisTekst = $chapter;
              $newname = renameName($property->bsttiName);
              $property->description = trimpar($matches[2][$i]);
              if (preg_match('/(.*\s\|\s\w+)\s?(\w+.*)/', $property->description, $match)) {
                $property->enum = explode(' | ',$match[1]);
                $property->description = $match[2];
                $arr = array_map(trim,explode('.', $property->description));
                foreach($arr as $regel) {
                  foreach($property->enum as $key) {
                    if (preg_match("/^$key\s(.*)/", $regel, $matchregel)) {
                      $property->options->$key->description = ucfirst($matchregel[1]);
                      $property->description = str_replace($matchregel[0].'.','',$property->description);
                    }
                  }
                }
              };
              $schema->properties->{$newname} = $property;
            }
            // if (strstr($chapter,'#hulppost_type')) {
            //   debug($chapter,$schema->properties,$matches);
            // }
            // debug($schema->properties, $matches);
          }
        } else {
          // echo "<p>$chapter</p>".PHP_EOL;
        }
      }
    }
    return $doc;
  }

  modify($doc->document, 1);

	// file_put_contents($eisen);
	// die();

	$lfv = array_filter($eisen, function($eis){
		return in_array("LFV's van een Verkeersbuis",$eis->path) && in_array("Besturing",$eis->path);
	});

	file_put_contents('lfv_eisen.json',json_encode(array_values($lfv)));
	die();

	debug($lfv);



	foreach ($lfv as $eis) {
		$folderName = $eis->path[0];
		$folderName = 'Verkeersbuis';
		$schemaname = $eis->path[1];
		$schemaname = $folderName.'_'.str_replace(' ','_',trim(str_replace($folderName,'',$schemaname)));
		if (isset($eis->path[3])) $schemaname .= $eis->path[3];
		$schema = $schemas->$schemaname = $schemas->$schemaname ?: (object)[];
		if (preg_match('/specifieke storingen/',$eis->line)) {
			$line = $eis->line;
			$line = preg_replace('/(\.|:)\s/',"$1\n",$line);
			if (preg_match_all('/(^[A-Z_]+)\s+(.*)/m',$line,$match)) {
				$schema->properties->storing->enum = array_combine($match[1],array_map(function($val){return [
					'description'=> $val,
				];},$match[2]));
			}
		} else if (preg_match("/toestandsvariabelen te hebben:(.*)/",$eis->line,$match)) {
			$line = $match[1];
			$line = preg_replace('/(#\w+:)/',"\n$1",$line);
			$schema->properties->line = $line;
			if (preg_match_all('/(^#\w+):\s+(.*)/m',$line,$match)) {
				foreach ($match[1] as $i => $key) {
					$property = $schema->properties->$key = (object)[];
					$property->stereotype= 'toestandsvariabele';
					$property->description = $match[2][$i];
					if (preg_match('/(.*\s\|\s\w+)\s?(\w+.*)/', $property->description, $matches)) {
						$property->enum = explode(' | ',$matches[1]);
						$property->description = trimpar($matches[2]);
					};
					$arr = array_map(trim,explode('.', $property->description));
					foreach($arr as $regel) {
						foreach($property->enum as $key) {
							if (preg_match("/^$key\s(.*)/", $regel, $matchregel)) {
								$property->options->$key->description = ucfirst($matchregel[1]);
								$property->description = str_replace($matchregel[0].'.','',$property->description);
							}
						}
					}
					$property->description = str_replace(["\n",'  ','  ','  ','  '],' ',$property->description);
				}
			}
			// debug($schemas);
		} else if (preg_match("/commando's te ondersteunen/",$eis->line)) {
			$line = $eis->line;
			$line = preg_replace('/(\.|:)\s/',"$1\n",$line);
			if (preg_match_all('/(^\w+)\((.*)\)\s+(.*)/m',$line,$match)) {
				foreach ($match[1] as $i => $key) {
					$schema->operations->$key = [
						'stereotype'=> 'commando',
						'description'=> $match[3][$i],
						'params'=> array_map(function($param){
							if (preg_match('/:/',$param)) {
								$param = explode(': ', $param);
								$par->name = array_shift($param);
								$par->enum = explode(' | ',array_shift($param));
							} else {
								$par->enum = explode(' | ',$param);
							}
							return $par;
						},explode(', ',$match[2][$i])),
					];
				}
			}
		} else {
			$schema->eisen[] = $eis;
		}
	}
	// debug(make_array($schemas));
	die(yaml_emit(make_array($schemas)));
	debug($lfv);


	debug($eisen);


	$srcrules = yaml_parse_file('rules.src.yaml')?:[];
	$srcrules = [];
	$docrules = array_replace_recursive(make_array($docrules), $srcrules);

	$js = "";
	foreach ($docrules['components']['schemas'] as $schemaName => $schema) {
		// debug($schema);
		$schemaName = $GLOBALS['schemaName'] = $schemaName;
		$js .= "\nfunction $schemaName(id) {";
		// $js .= "\n  const ".$schemaName." = ".$schemaName."[id];";
		$js .= "\n  const $schemaName = AIM.ref[id];";
		$js .= "\n  return {";
		foreach ($schema['operations'] as $operationName => $operation) {
			$js .= "\n    /** @function $operationName";
			$js .= "\n      * @description ".wordwrap($operation['description'],70,"\n      *   ");
			$js .= "\n      */ ";
			$js .= "\n    $operationName() {";
			$js .= "\n      ".trim(implode(" else ",array_map(function($block) {
				$schemaName = $GLOBALS['schemaName'];

			  $if = $block['als'];
				$if = preg_replace('/([#\w]+)\s=\s\((.*?)\)/s', " [$2].includes($schemaName.$1) ", $if);
				$if = preg_replace('/(\w+)\.([#\w]+)\[i\]\s=\s([\w]+)/s', " $1.some($1 => $1.$2 === '$3') ", $if);
				$if = preg_replace('/\s([\w]+)\[\]\.([#\w]+)\s=\s([\w]+)/s', " $1.every($1 => $1.$2 === '$3') ", $if);
				$if = preg_replace('/\s\|\s/s', ',', $if);
				// debug($f);
			  $if = preg_replace('/\s=\s/', ' === ', $if);
				$if = preg_replace('/\sen\s/', " && ", $if);
				$if = preg_replace('/\&&\s/', "\n        && ", $if);
			  $if = preg_replace('/\sof\s/', " || ", $if);
			  $if = preg_replace('/\s([a-z]+)(\s|$)/', " '$1' ", $if);

				$then = $block['dan'];
			  $then = implode(";\n        $schemaName.",$then);
			  $then = preg_replace('/\b(\w+)\[\]\(/', '$1.foreach($1=>$1.', $then);
			  $then = preg_replace('/(\(|,)([a-z]+)(,|\))/', "$1'$2'$3", $then);
			  $then = preg_replace('/(\(|,)([a-z]+)(,|\))/', "$1'$2'$3", $then);
			  return "if (\n        $schemaName.$if\n      ) {\n        $schemaName.$then;\n      }";
			}, $operation['acties'])));

			$js .= "\n    }";
		}
		$js .= "\n  }";
		$js .= "\n}";
	}

	yaml_emit_file('rules.src_new.yaml',$docrules);

	die(file_get_contents('rules.src_new.yaml'));
	die($js);





	debug($docrules);



  $doc = json_decode(json_encode($doc), true);
  yaml_emit_file('doc.yaml', $doc);

  // die(json_encode([$keys,$rename['auto_stand_contourverlichting']]));
  // $keys = ['auto_stand_contourverlichting'];
  // $vals = ['autoStandContourverlichting'];

  // $rename = ['auto_stand_contourverlichting'=>'autoStandContourverlichting'];
  ksort($rename);
  yaml_emit_file('rename.yaml', $rename);
  // $keys = array_keys($rename);
  // $vals = array_values($rename);
  //
  function rewrited ($str) {
    global $rename;
    foreach ($rename as $old => $new) {
      $str = preg_replace("/\b$old\b/", $new, $str);
    }
    $str = str_replace(['#','!'], '', $str);
    return $str;
  }
  // die (json_encode([$rename['daadwerkelijk_in_gebruik'], str_replace($keys, $vals, '#daadwerkelijk_in_gebruik := hand')]));
  foreach ($rules as $rule) {
    $rule->conditie = rewrited($rule->conditie);
    $rule->conditie = str_replace(' = ',' === ',$rule->conditie);
    foreach ($rule->acties as $i => $actie) {
      $rule->acties[$i] = rewrited($rule->acties[$i]);
    }
  }

  $libpath = realpath('../..').'/lib/';

  foreach ($parents as $parentName => $config) {
    echo PHP_EOL.$parentName.PHP_EOL;
    $parentpath = $libpath.$parentName;
    if (!file_exists($parentpath)) mkdir($parentpath, 0777, true);
    // $config = array_replace_recursive(object_array($config), yaml_parse_file($parentpath.'/config.src.yaml'));
    // debug($parentpath.'/config.local.yaml',array_replace_recursive(object_array($config), yaml_parse_file($parentpath.'/config.src.yaml')?:[]));
    // debug($parentpath.'/config.local.yaml');
    yaml_emit_file($parentpath.'/config.local.yaml', array_replace_recursive(make_array($config), yaml_parse_file($parentpath.'/config.src.yaml')?:[]));

    foreach ($config->components->schemas as $schemaName => $schema) {
      echo $schemaName.PHP_EOL;
      if (strstr($schemaName, 'LFV')) {
        $path = $libpath.'/'.$parentName.'/'.str_replace(['LFV',$parentName],'',$schemaName);
        // $path = $rootpath.'/'.$schemaName;
        // echo $path.PHP_EOL;
        if (!file_exists($path)) mkdir($path, 0777, true);
        if ($schema->operations) {
          foreach ($schema->operations as $operationName => $operation) {
            $api->paths->{"/$schemaName(id)/$operationName()"}->post= [
              "operationId"=> "$schemaName(id).$operationName()",
            ];
          }
        }
        if ($schema->properties) {
          foreach ($schema->properties as $propertyName => $property) {
            $api->components->schema->properties->{$propertyName} = $property;
          }
        }
        if (isset($api)) {
          file_put_contents($path.'/api.json', $api = json_encode($api));
          yaml_emit_file($path.'/api.yaml', json_decode($api, true));
          $api = null;
        }
      }
    }

    // $rootpath = $libpath.$parentName;
    // if (!file_exists($rootpath)) mkdir($rootpath, 0777, true);
    //   // debug($schema);
    //   if (strstr($schemaName, 'LFV')) {
    //     $path = $rootpath.'/'.str_replace(['LFV',$parentName],'',$schemaName);
    //     // $path = $rootpath.'/'.$schemaName;
    //     echo $path.PHP_EOL;
    //     if (!file_exists($path)) mkdir($path, 0777, true);
    //   }
    // }
    // yaml_emit_file($rootpath.'/config.local.bstti.yaml', $parentConfig);
    // continue;
    // die($rootpath);

    // continue;
    // $configSchema = ['components'=>['schemas'=>[$schemaName=>$schema]]];
    // yaml_emit_file($rootpath.'/config.local.bstti.yaml', $configSchema);
    // if (file_exists($fname = $rootpath.'/config.local.src.yaml')) {
    //   $configSchema = array_replace_recursive($configSchema, yaml_parse_file($fname));
    // }
    // yaml_emit_file($rootpath.'/config.local.yaml', $configSchema);
  }
  die();

  $schemas = json_decode(json_encode($schemas), true);







  $config = ['components'=>['schemas'=>$schemas]];
  yaml_emit_file('config.local.bstti.yaml', $config);

  $config = array_replace_recursive($config, yaml_parse_file('config.local.src.yaml'));
  yaml_emit_file('config.local.yaml', $config);
  die();
  echo json_encode($doc);
} else {
  readfile('index.html');
}
