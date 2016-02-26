var registries=[],
    mime=require('mime'),
    fs=require('fs'),
    path=require('path'),
    docker=require('./docker')
    config=require('../config/config'),
    registry=require('./registry'),
    util=require('./util');

module.exports=function(app){
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
      if(err)
        res.status(401).send();
      else
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

  app.post('/api/v1/registry',function(req,res){
    registry.create(registries, req.body);
    res.status(200).send();
  });

  app.get('/api/v1/registry',function(req,res){
    res.send(registries);
  });

  app.delete('/api/v1/registry/:id',function(req,res){
    registry.remove(registries, req.params.id);
    res.status(200).send();
  });


  app.get('/api/v1/registry/v1/:id/tags',function(req,res){
    registry.searchV1(registries, req,res);
  });

  app.get('/api/v1/registry/v2/:id/tags',function(req,res){
    registry.searchV2(registries, req,res);
  });

  app.post('/api/v1/yaml',function(req,res){
    console.log(req.body);
    util.json2yaml(req.body, function(err,yml){
      res.send(yml);
    })
  });

  app.get('/api/v1/download', function(req, res){
    var file = __dirname + config.DOCKE_COMPOSE_DIR;
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  });
}
