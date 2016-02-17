var fs=require('fs'),
    config=require('../config/config'),
    YAML=require('json2yaml');

var convert=function(data, callback){
  var yml=YAML.stringify(data);
  fs.writeFile(__dirname + config.DOCKE_COMPOSE_DIR, yml, function(err) {
      callback(err,yml)
  });
}
module.exports={
  convert:convert
}
