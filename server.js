var express=require('express'),
    path=require('path'),
    logger=require('morgan'),
    docker=require('./lib/docker'),
    app=express();

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
  docker.details(req.params.id,function(err,data){
      res.send(data);
  });
});

app.get('/api/v1/logs/:id',function(req,res){
  var container = docker.getID(req.params.id);
  docker.containerLogs(container,function(logs){
    res.send(logs);
  });
});

app.get('/api/v1/info',function(req,res){
  docker.dockerInfo(function(err,data){
    res.send(data);
  });
});


app.get('/api/v1/usage/:id',function(req,res){
  res.header('Content-Type', 'text/event-stream');
  docker.usage(req.params.id,function(err,data){
  	var usage=[];
  	data.on('data', function(u){
  		usage.push(u);
    });
  	var interval_id = setInterval(function() {res.write(""+usage);}, 50);
  });
});

app.get('/api/v1/version',function(req,res){
 	docker.version(function(err,data){
		res.send(data);
	});
});

app.listen(3000,function(){
  console.log('Server listening ..');
})
