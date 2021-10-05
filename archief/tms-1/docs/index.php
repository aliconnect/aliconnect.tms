<?php
// $path = $_SERVER['DOCUMENT_ROOT'].'/../node_modules/@aliconnect/sdk/api/tms';
$path = "..";

$files = array_values(array_filter(scandir($path.'/lib'), function($file){return $file[0]!=='.';}));
$tms = yaml_parse_file("../../config.source.yaml");
foreach($files as $name) {
  $root = $path."/lib/".$name;
  $data = yaml_parse_file($root."/config.local.yaml");
  $tms = array_merge_recursive($tms ?: [], $data);
}
$tms = json_encode($tms);
readfile('index.html');
echo "<script>data=$tms;</script>";
die();

$tms = json_decode($tms);

// yaml_emit_file("../../config.tms.yaml", json_decode(json_encode($tms), true));

foreach ($tms->components->schemas as $schemaName => $schema) {
  foreach ([$schema->properties, $schema->operations] as $properties) {
    foreach ($properties as $propertyName => $property) {
      unset($property->ltsRef);
      unset($property->ltsName);
      unset($property->ltsComment);
      unset($property->js);
      unset($property->rules);
    }
  }
}

// yaml_emit_file("../../config.local.yaml", json_decode(json_encode($tms), true));
die();

$replace = [];

function replace($s) {
  global $replace;
  return str_replace(array_keys($replace),array_values($replace),$s);
}

function makerule($s) {
  // $s = 'JAAA' . mb_convert_encoding($s, "UTF-8") . iconv(mb_detect_encoding($s), "UTF-8", $s);//str_replace("\u2265",">=",$s);
  $s = str_replace(['≥','≤'],['>=','<='],$s);
  return preg_replace_callback(
    '/(^|\s|\()([a-z_]+)(\s|\)|$)/',
    function ($word) {return $word[1].strtoupper($word[2]).$word[3];},
    // '$1',
    trim(ltrim(rtrim(trim($s),';'),':'))
  );
}


function import_schemas1() {
  global $path;
  $tms = yaml_parse_file($path."/tms1.yaml");
  $bij = yaml_parse_file($path."/hoortbij.yaml");

  function newname($name,$hoortbij='') {
    $name = str_replace("Verkeerbuis","Verkeersbuis",$name);
    $name = str_replace("Veilige ruimte","VeiligeRuimte",$name);
    $name = str_replace("Veilige Ruimte","VeiligeRuimte",$name);
    $name = str_replace(["cf_","bf_","sf_"],"",$name);
    $name = str_replace(["_$hoortbij","$hoortbij_",$hoortbij],"",$name);
    return $name;
  }

  function newschema($schema, $schemaName) {
    if ($schemaName[0]==='c') {
      $schema['type'] = "coordinatie_functie";
    } else if ($schemaName[0]==='b') {
      $schema['type'] = "basis_functie";
    } else if ($schemaName[0]==='s') {
      $schema['type'] = "sub_functie";
    }
    return $schema;
  }
  //
  //
  $schemas = [];
  foreach ($bij['components']['schemas'] as $schemaName => $schema) {
    $schemas[newname($schemaName)] = newschema($schema, $schemaName);
  }
  foreach ($tms['components']['schemas'] as $schemaName => $schema) {
    $schemas[$newschemaName] = array_merge($schemas[$newschemaName] ?: [], newschema($schema, $schemaName));
  }

  foreach ($schemas as $schemaName => $schema) {
    $schema['bstti_name'] = $schemaName;
    $hoortbij = newname($schema['hoortbij'] ?: "Tunnel");
    $schemaName = newname($schemaName,$hoortbij);
    $newschemaName = $hoortbij."_".$schemaName;

    $replace[$schema['bstti_name']] = $newschemaName;
    // die(json_encode([$newschemaName, $schemaName,$hoortbij]));
    $properties = $schema['properties'];
    if ($properties) {
      $schema['properties'] = [];
      foreach ($properties as $propertyName => $property) {
        if ($property['class']) {
          $property['schema'] = $property['class'];
          unset($property['class']);
        }
        $property['bstti_name'] = $propertyName;
        $propertyName = newname($propertyName,$hoortbij);
        $propertyName = ucfirst($propertyName);
        $propertyName = implode('', array_map(function($key){return ucfirst($key); }, explode('_', $propertyName)));
        $replace[$property['bstti_name']] = $propertyName;

        if ($property['comment']) {
          // $property['rules'] = [];
          $rules = explode('Init', $property['comment']);
          if ($rules[1]) {
            $property['initvalue'] = makerule($rules[1]);
          }
          $rules = explode('Conditie', $property['comment']);
          // $operation['comments'] = $comments;
          array_shift($rules);
          foreach($rules as $rule) {
            $rule_split = explode('Waarde', $rule);
            if ($rule_split[1]) {
              $rule = ['conditie'=> makerule($rule_split[0]), 'waarde'=>makerule($rule_split[1])];
            } else {
              $rule = ['conditie'=> makerule($rule_split[0])];
            }
            $property['rules'][] = $rule;
          }
          foreach ($property['rules'] as $rule) {
            $property['js'] .= "if (".$rule['conditie'].") {\n  return ".$rule['waarde']."\n}\n";
          }
          // unset($property['comment']);
        }
        unset($property['conditie']);
        unset($property['initdefaultvalue']);
        unset($property['em']);
        unset($property['get']);
        if ($schema['type'] === "coordinatie_functie") {
          $property['label'] = $newschemaName;
          $files["$hoortbij/$hoortbij"]['components']['schemas'][$hoortbij]['properties'][$propertyName] = $property;
        } else {
          $schema['properties'][$propertyName] = $property;
          $files["$hoortbij/$hoortbij"]['components']['schemas'][$newschemaName] = $schema;
        }
      }
    }
    $operations = $schema['operations'];
    if ($operations) {
      $schema['operations'] = [];
      foreach ($operations as $operationsName => $operation) {
        $operation['bstti_name'] = $operationsName;
        // $operationsName = newname($operationsName,$hoortbij);
        $operationsName = implode('', array_map(function($key){return ucfirst($key); }, explode('_', $operationsName)));
        $operationsName = lcfirst($operationsName);
        $replace[$operation['bstti_name']] = $operationsName;

        if ($operation['comment']) {
          $operation['rules'] = [];
          $rules = explode('Conditie', $operation['comment']);
          // $operation['comments'] = $comments;
          array_shift($rules);
          foreach($rules as $rule) {
            $rule_split = explode('Acties', $rule);
            if ($rule_split[1]) {
              $rule = ['conditie'=> makerule($rule_split[0]), 'actie'=>array_map(function($s){return trim($s);}, explode(';', makerule($rule_split[1])))];
            } else {
              $rule = ['conditie'=> makerule($rule_split[0])];
            }
            $operation['rules'][] = $rule;
          }
          $operation['js'] = '';
          foreach ($operation['rules'] as $rule) {
            $operation['js'] .= "if (".str_replace('*','true',$rule['conditie']).") {\n  ".implode(";\n  ",array_filter($rule['actie'])).";\n}\n";
          }
          $operation['js'] = str_replace([' _bf_',' _sf_']," $schemaName.",$operation['js']);
          $operation['js'] = replace($operation['js']);
          // unset($operation['comment']);
        }
        unset($operation['conditie']);
        unset($operation['em']);



        // die($operationsName);
        if ($schema['type'] === "coordinatie_functie") {
          $operation['label'] = $newschemaName;
          $files["$hoortbij/$hoortbij"]['components']['schemas'][$hoortbij]['operations'][$operationsName] = $operation;
        } else {
          $schema['operations'][$operationsName] = $operation;
          $files["$hoortbij/$hoortbij"]['components']['schemas'][$newschemaName] = $schema;
        }
      }
    }
    // die(json_encode($schema, JSON_PRETTY_PRINT));
    // if ($schema['type'] === "coordinatie_functie") {
    //   // $files["$hoortbij/$hoortbij"]['components']['schemas'][$newschemaName] = $schema;
    // } else {
    //   // $files["$hoortbij/$newschemaName"]['components']['schemas'][$newschemaName] = $schema;
    // }
  }



  // die($path."/hoortbij.yaml");
  // die(json_encode($bij));
  //
  // die(json_encode($files));
  // die(json_encode($files, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
  ini_set('display_errors', 1);
  foreach ($files as $name => $data) {
    $name = $path."/lib/$name.yaml";
    echo $name.PHP_EOL;
    // $data = yaml_emit($data);
    // $data = str_replace(array_keys($replace),array_values($replace),$data);
    // file_put_contents($name, $data);
    yaml_emit_file($name, $data);
  }
  ksort($replace);
  yaml_emit_file($path."/replace.yaml", $replace);
  die();
}

if ($_GET['lib']) {
  $name = $_GET['lib'];
  $root = $path."/lib/".$name;
  $data = yaml_parse_file($root."/config.local.yaml");
  $data['ref'] = ["/api/tms/lib/$name/config.local.yaml"];

  $code = '';
  foreach ($data['components']['schemas'] as $schemaName => $schema) {
    if ($schema['operations']) {
      $paths=[];
      $operations = "
      /** @function AIM.operations.$schemaName
      * @constructor
      * @summary $schemaName
      * @description $schemaName object bla bla bla
      * @param *required* id Identifier of $schemaName
      */\n\t\t$schemaName: function(id) {\n\t\t\tconst $schemaName = AIM.ref[id];\n\t\t\treturn {";
      foreach ($schema['operations'] as $operationName => $operation) {
        $operations.="\n\n\t\t\t\t/** @function AIM.operations.$schemaName.$operationName";
        foreach (['stereotype','summary','description','bsttiName','bsttiNr','bsttiPath'] as $key) {
          if (empty($operation[$key])) continue;
          $value = wordwrap ($operation[$key],70,"\n\t\t\t\t\t* \t");
          $operations .= "\n\t\t\t\t\t* @$key $value";
        }
        $parstring = [];
        if (isset($operation['parameters'])) {
          foreach ($operation['parameters'] as $parameter) {
            $parstring[] = $parameter['name'];
            $operations .= "\n\t\t\t\t\t* @param ".implode(' ',[$parameter['name'],$parameter['description']]);
          }
        }
        $parstring = str_replace('id,','',implode(',',$parstring));
        $code .= $operation["js()"];
        $operations .= "\n\t\t\t\t\t*/\n\n\t\t\t\t$operationName($parstring) {\n\t\t\t\t\t".str_replace("\n","\n\t\t\t\t\t",trim($operation["js()"]))."\n\t\t\t\t},";
        $paths["/$schemaName(id)/$operationName($parstring)"]=[
          "operationId"=>"$schemaName(id).$operationName($parstring)",
          "parameters"=>$operation['parameters'],
        ];
      }
      preg_match_all ('/\b[A-Z]+\b/', $code, $matches);
      $const = "";
      if ($matches[0]) {
        // var_dump(array_unique ($matches[0]));
        foreach (array_unique ($matches[0]) as $key) {
          $const .= "\nconst $key = '".strtolower($key)."';";
        }
      }
      // fprint($matches);
      $content .= "(function(){ $const\nAIM.extend({\n\toperations:{ $operations\n\t\t\t}\n\t\t}\n\t}\n})()";
      // $content = "(function(){ $const\nAIM.extend({\n\tpaths: ".str_replace("\n","\n  ",str_replace("    ","  ",json_encode($paths, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))).",\n\toperations:{ $operations\n\t\t\t}\n\t\t}\n\t}\n})()";

      // $md = "# $schemaName\n";
      // file_put_contents($_SERVER['DOCUMENT_ROOT']."/sites/aliconnect/docs/index/2-Learn/6-Libraries/TMS/$schemaName.md",$md);

      // echo "<a href='../lib/$schemaName.js' target='source'>$schemaName.js</a><br>";
    }
  }
  file_put_contents($root."/js/control.js",str_replace("\t","  ",$content));

  $refs = [
    'index.js',
    'js/control.js',
    'js/hmi.js',
    'css/hmi.css',
  ];
  foreach($refs as $filename) {
    if (is_file($fname = $root."/".$filename)) {
      $data['ref'][] = "/api/tms/lib/$name/$filename";//file_get_contents($fname);
    }
  }
} else {
  // import_schemas1();
  $files = array_values(array_filter(scandir($path.'/lib'), function($file){return $file[0]!=='.';}));
  $tms = yaml_parse_file("../../config.source.yaml");
  foreach($files as $name) {
    $root = $path."/lib/".$name;
    $data = yaml_parse_file($root."/config.local.yaml");
    $tms = array_merge_recursive($tms ?: [], $data);
  }
  $tms = json_encode($tms);
  readfile('index.html');
  echo "<script>data=$tms;</script>";

  $tms = json_decode($tms);

  yaml_emit_file("../../config.tms.yaml", json_decode(json_encode($tms), true));

  foreach ($tms->components->schemas as $schemaName => $schema) {
    foreach ([$schema->properties, $schema->operations] as $properties) {
      foreach ($properties as $propertyName => $property) {
        unset($property->ltsRef);
        unset($property->ltsName);
        unset($property->ltsComment);
        unset($property->js);
        unset($property->rules);
      }
    }
  }

  yaml_emit_file("../../config.local.yaml", json_decode(json_encode($tms), true));
}
