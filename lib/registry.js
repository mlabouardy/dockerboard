var request = require('request'),
    async=require('async');

function getRepositoryLink(registry, version, name){
  var uri="";
  if(version=="v1")
    uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v1/repositories/'+name+'/tags';
  else
    uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v2/'+name+'/tags/list';
  return uri;
}

function createLinks(version, repositories, registry){
  var lookup=[];
  for(var i=0;i<repositories.length;i++){
    if(version=='v1')
      var name=repositories[i].name;
    else
      var name=repositories[i];
    lookup.push(getRepositoryLink(registry, version, name));
  }
  return lookup;
}

var searchV1=function(registries, req,res){
  var registry=registries[req.params.id];
  var repositories=[];
  var uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v1/search';
  request({
    uri: uri,
    method: "GET"
  }, function(error, response, body) {
    var data=JSON.parse(body);
    repositories=data.results;
    var lookup=createLinks('v1', repositories, registry);

    async.map(lookup, function(url, callback) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var body = JSON.parse(body);
                var info={
                  repository:"",
                  images:body
                }
                callback(null, info);
            } else {
                callback(error || response.statusCode);
            }
        });
    }, function(err, results) {
        if (!err) {
          for(var i=0;i<results.length;i++){
            results[i].repository=repositories[i].name;
          }
          res.send(results);
        } else {
          res.status(401).send();
        }
    });
  });
}


var searchV2=function(registries, req, res){
  var registry=registries[req.params.id];
  var repositories=[];
  var uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v2/_catalog';
  request(uri, function (error, response, body) {
    var data=JSON.parse(body);
    var lookup=createLinks('v2',data.repositories, registry);

    async.map(lookup, function(url, callback) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var body = JSON.parse(body);
                var info={
                  repository:body.name,
                  images:body.tags
                }
                callback(null, info);
            } else {
                callback(error || response.statusCode);
            }
        });
    }, function(err, results) {
        if (!err) {
          res.send(results);
        } else {
          res.status(401).send();
        }
    });
  });
}

var create=function(registries, registry){
  registries.push(registry);
}

var remove=function(registries, id){
  registries.splice(id,1)
}

module.exports={
  create:create,
  remove:remove,
  searchV1:searchV1,
  searchV2:searchV2
}
