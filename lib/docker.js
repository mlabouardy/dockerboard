var Docker=require('dockerode'),
    docker = new Docker(),
    stream = require('stream');

var listContainers=function(callback){
  docker.listContainers(function (err, containers) {
    callback(err,containers);
  });
}

var listImages=function(callback){
  docker.listImages(function (err, images) {
    callback(err,images);
  });
}

var getContainer=function(id, callback){
  var container = docker.getContainer(id);
  container.inspect(function (err, data) {
    callback(err,data);
  });
}

var containerLogs=function(id, callback){
  var container = docker.getContainer(id);
  var logStream = new stream.PassThrough();
  var logs=[];

  logStream.on('data', function(data){
    logs.push(data);
  });

  container.logs({
    follow: false,
    stdout: true,
    stderr: true
  },function(err, stream){
    if(err) {
      return logger.error(err.message);
    }
    container.modem.demuxStream(stream, logStream, logStream);
    stream.on('end', function(){
      callback(logs);
    });
  });
}

var dockerInfo=function(callback){
  docker.info(function(err,data){
    docker.listContainers({all: false}, function(err, containers) {
      if(err)
        callback(err,null);
      else{
        data.running=containers.length;
        docker.listImages(function (err, images) {
          data.images=images.length;
          callback(err,data);
        });
      }
    });
  });
}

var dockerVersion=function(callback){
  docker.version(function(err,data){
    callback(err,data);
  });
}

var resourceUsage=function(id, callback){
  var container = docker.getContainer(id);
  container.stats(function (err, data) {
    callback(err,data);
  });
}

module.exports={
  listContainers:listContainers,
  listImages:listImages,
  dockerInfo:dockerInfo,
  getContainer:getContainer,
  containerLogs:containerLogs,
  dockerVersion:dockerVersion,
  resourceUsage:resourceUsage
}
