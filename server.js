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

app.listen(3000,function(){
  console.log('Server listening ..');
})
