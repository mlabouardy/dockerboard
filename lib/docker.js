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

var infos=function(callback){
  var info={};
  listContainers(function(err,containers){
    info.running=containers.length;
    listImages(function(err,images){
      info.images=images.length;
      callback(err,info);
    });
  });
}

var details=function(id, callback){
  var container = docker.getContainer(id);
  container.inspect(function (err, data) {
    callback(err,data);
  });
}

var containerLogs=function(container, callback){
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

var getID=function(id){
  return docker.getContainer(id);
}

module.exports={
  listContainers:listContainers,
  listImages:listImages,
  infos:infos,
  details:details,
  containerLogs:containerLogs,
  getID:getID
}
