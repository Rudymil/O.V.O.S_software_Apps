Cesium.Math.setRandomNumberSeed(1234);

var viewer = new Cesium.Viewer('cesiumContainer', { infoBox : false });
var entities = viewer.entities;

var i;
var height;
var positions;

//afficher un point
var pointA = entities.add({
	position : Cesium.Cartesian3.fromDegrees(-102.0, 45.0, 1000000),
	point : {
		pixelSize : 10,		
	}
});

//re afficher le point a chaque fois
pos = 45;
function moveSatellite(){
	entities.remove(pointA);
	pos = pos + 5;
	pointA = entities.add({
		position : Cesium.Cartesian3.fromDegrees(-102.0, pos, 1000000),
		point : {
			pixelSize : 10,		
		}
	}); 
	window.setTimeout(
		function(){
			moveSatellite(); 
		}, 
		100
	);
}

moveSatellite();