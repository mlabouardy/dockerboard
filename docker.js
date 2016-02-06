var Docker=require('dockerode');
    docker = new Docker();

module.exports={
  listContainers:function(callback){
    docker.listContainers(function (err, containers) {
      callback(err,containers);
    });
  },
  listImages:function(callback){
    docker.listImages(function (err, images) {
      callback(err,images);
    });
  }
}
