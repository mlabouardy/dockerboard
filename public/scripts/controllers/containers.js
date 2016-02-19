angular.module('dockerboard')
  .controller('ContainersCtrl',function($scope, DockerFactory){
    toastr.success('Manage docker containers', 'Containers Manager');

    DockerFactory.containers().then(function(containers){
      $scope.containers=containers.data;
      for(var i=0;i<$scope.containers.length;i++){
        var d = new Date(0);
			  d.setUTCSeconds($scope.containers[i].Created);
			  $scope.containers[i].Created=d.toLocaleString();

        var name=$scope.containers[i].Names[0];
 			  $scope.containers[i].Name=name;

      }



    containers=$scope.containers;
    var arr = [];
    for (var prop in containers) {
      arr.push(containers[prop]);
    }
    $scope.data={
      nodes:arr,
      links:[]
    };

    var graph=$scope.data;

    var width = document.getElementById('canvas').clientWidth;
    height = document.getElementById('canvas').clientHeight;

    var force = d3.layout.force()
    .charge(-200)
    .linkDistance(30)
    .size([width, height]);

    var svg = d3.select("#canvas").append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

    var main = svg.append("g")
    .attr("class", "graph");

    force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

    var link = main.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return 2 * d.strength; });

    var node = main.selectAll(".node_circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node_circle")
    .attr("r", function(d) { return 0.5 * Math.sqrt(1695); })
    .style("fill", function(d){ return "hsl(" + Math.random() * 360 + ",100%,50%)"; } )
    .call(force.drag);

    var label = main.selectAll(".node_label")
    .data(graph.nodes)
    .enter().append("text")
    .attr("class", "node_label")
    .attr("dx", function(d) { return 2 + 0.5 * Math.sqrt(1695); })
    .attr("dy", ".4em")
    .attr("font-family", "Verdana")
    .attr("font-size", 10)
    .style("fill", "#676A6C")
    .text(function(d) { return d.Name; });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

      label.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
    });

  },function(){
    toastr.error('Server is not responding', 'Dockerboard');
  });
  });
