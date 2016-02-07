var Docker=require('dockerode'),
    docker = new Docker();

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

module.exports={
  listContainers:listContainers,
  listImages:listImages,
  infos:infos
}
