var express=require('express'),
    path=require('path'),
    logger=require('morgan'),
    bodyParser=require('body-parser'),
    docker=require('./lib/docker'),
    request = require("request"),
    async=require('async'),
    YAML = require('json2yaml'),
    mime=require('mime'),
    fs=require('fs'),
    app=express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/api/v1/containers',function(req,res){
  docker.listContainers(function(err,containers){
      res.send(containers);
  });
});

app.get('/api/v1/images',function(req,res){
  docker.listImages(function(err,images){
      res.send(images);
  });
});

app.get('/api/v1/containers/:id',function(req,res){
  docker.getContainer(req.params.id,function(err,data){
      res.send(data);
  });
});

app.get('/api/v1/logs/:id',function(req,res){
  docker.containerLogs(req.params.id,function(logs){
    res.send(logs);
  });
});

app.get('/api/v1/info',function(req,res){
  docker.dockerInfo(function(err,data){
    res.send(data);
  });
});

app.get('/api/v1/usage/:id',function(req,res){
  docker.resourceUsage(req.params.id,function(err,data){
		res.send(data);
	});
});

app.get('/api/v1/version',function(req,res){
 	docker.dockerVersion(function(err,data){
		res.send(data);
	});
});


var registries=[];

app.post('/api/v1/registry',function(req,res){
  registries.push(req.body);
  res.status(200).send();
});

app.get('/api/v1/registry',function(req,res){
  res.send(registries);
});

app.delete('/api/v1/registry/:id',function(req,res){
  registries.splice(req.params.id,1)
  res.status(200).send();
});

app.post('/api/v1/registry/ping',function(req,res){

});

app.get('/api/v1/registry/v1/:id/tags',function(req,res){
  var registry=registries[req.params.id];
  var repositories=[];
  var uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v1/search';
  request({
    uri: uri,
    method: "GET"
  }, function(error, response, body) {
    var data=JSON.parse(body);
    repositories=data.results;
    var lookup=[];
    for(var i=0;i<repositories.length;i++){
      var r=repositories[i];
      var name=r.name;
      var uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v1/repositories/'+name+'/tags';
      lookup.push(uri);
    }

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
});

app.get('/api/v1/registry/v2/:id/tags',function(req,res){
  var registry=registries[req.params.id];
  var repositories=[];
  var uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v2/_catalog';
  request(uri, function (error, response, body) {
    var data=JSON.parse(body);
    var lookup=[];
    repositories=data.repositories;
    for(var i=0;i<repositories.length;i++){
      var name=repositories[i];
      var uri=registry.protocol+'://'+registry.hostname+':'+registry.port+'/v2/'+name+'/tags/list';
      lookup.push(uri);
    }
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
});

app.post('/api/v1/yaml',function(req,res){
  var yml=YAML.stringify(req.body);
  fs.writeFile(__dirname + '/save/docker-compose.yml', yml, function(err) {
      res.send(yml);
  });
});

app.get('/api/v1/download', function(req, res){
  var file = __dirname + '/save/docker-compose.yml';
  var filename = path.basename(file);
  var mimetype = mime.lookup(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

app.listen(3000,function(){
  console.log('Server listening ..');
})
