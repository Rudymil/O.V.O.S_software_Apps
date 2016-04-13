console.log("visibilite.js chargé"); // affichage dans la console

//var viewer = new Cesium.Viewer('cesiumContainer');

function include(fileName){ // fonction permettant d inclure un fichier javascript dans un autre fichier javascript
	document.write("<script type='text/javascript' src='"+fileName+"'></script>");
}

include('affichage.js');
	//console.log("include('affichage.js');");

var Fichier = function Fichier(fichier){ // il s agit d une fonction lisant un fichier texte et retournant son contenu dans une chaine de caracteres
    if(window.XMLHttpRequest) obj = new XMLHttpRequest(); //Pour Firefox, Opera,...
    else if(window.ActiveXObject) obj = new ActiveXObject("Microsoft.XMLHTTP"); //Pour Internet Explorer 
    else return(false);
    if(obj.overrideMimeType) obj.overrideMimeType("text/xml"); //Évite un bug de Safari
    obj.open("GET", fichier, false);
    obj.send(null);
    if(obj.readyState == 4) return(obj.responseText);
    else return(false);
}

/*function Affichage(fichier){
	var Contenu = Fichier(fichier);
	var i;
	var ligne =  new Array;
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	for(var i=0;i<nombre_de_lignes_au_total;i++){
		ligne[i]=Contenu.split(/\n/g)[i]
		var reg=new RegExp("[        ]+", "g");
		var a = ligne[i].split(reg);
		//if (fichier=='Networks_Stations/Network_IDS_ell'){
			point(a[2],a[1],a[0],fichier);
		//}
	}
}*/

function PositionSatellite(){ // fonction renvoyant la position approximative du satellite à chaque temps t de l horloge du viewer // cette fonction recupere les resultats de la function Fichier(fichier) et les affecte au viewer
	console.log("function PositionSatellite(){");
	var fichier ='../data/Networks_Stations/Satellite.txt'; // FICHIER INEXISTANT
	var Contenu = Fichier(fichier);	
	console.log(Contenu);
	var i;
	var a = new Array();
	var ligne =  new Array;
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	for( var i=0 ; i<nombre_de_lignes_au_total ; i++ ){
		ligne[i]=Contenu.split(/\n/g)[i]
		var reg=new RegExp("[,]+", "g");
		a[i] = ligne[i].split(reg);
	}
	//var answers = JSON.parse('Networks_Stations/Satellite.txt');
	//var widget = new Cesium.CesiumWidget('cesiumContainer');
	var seconds = viewer.clock.currentTime.secondsOfDay;
	var julianDay = viewer.clock.currentTime.dayNumber;
	//var Julian=Cesium.JulianDate(2441317, 43210.0, TimeStandard.TAI)
	//var julianDate = new Cesium.JulianDate();
	var dateViewer = new Cesium.JulianDate(julianDay, seconds, Cesium.TimeStandard.UTC);
	var julianDateBeginning = new Array();
	julianDateBeginning [0] = Cesium.JulianDate.fromIso8601('2012-03-15T10:00:00Z');
	var difference = [];
	var maxTemps=a[nombre_de_lignes_au_total-1][0];
	var pas=maxTemps/(nombre_de_lignes_au_total-3);
	for( var i=1 ; i<nombre_de_lignes_au_total+1 ; i++ ){
		julianDateBeginning[i] = Cesium.JulianDate.addSeconds(julianDateBeginning[i-1], pas, new Cesium.JulianDate());
		difference.push(Math.abs(Cesium.JulianDate.daysDifference(julianDateBeginning[i],dateViewer)));
	}
	var min = Math.min.apply(null, difference);
	var position = difference.indexOf(min);
	console.log(position);
	var ContenuStations = Fichier('../data/Networks_Stations/Network_NEN_ell');
	var i;
	var ligne =  new Array;
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	for( var i=0 ; i<nombre_de_lignes_au_total ; i++){
		ligne[i]=Contenu.split(/\n/g)[i]
		var reg=new RegExp("[        ]+", "g");
		var b = ligne[i].split(reg);
		elevation(b[2], b[1], b[3], a[position][1], a[position][2], a[position][3], 5);
		//point(a[2],a[1],a[0],fichier);
	}
	console.log(dateViewer);
	console.log("x: "+a[position][1],"y: "+a[position][2],"z: "+a[position][3]);
	var difference2 = Cesium.JulianDate.daysDifference(dateViewer,julianDateBeginning[1]);
}

window.setInterval(function(){
	//console.log("window.setInterval(function(){");
	//PositionSatellite();
}, 1000);

var req = new XMLHttpRequest();
req.open("GET", "SampleData/GPS.czml", true); 
req.onreadystatechange = myCode; // the handler 
req.send(null);

function myCode(){
	console.log("function myCode(){");
	if (req.readyState == 4){ 
		var doc = window[req.responseText];
			//alert (doc);
			console.log(doc);
			//alert ( req.responseTex);
			console.log(req.responseTex);
	}else{
		//alert("mauvaise req");
		console.log("mauvaise req");
	}
}

myCode();

function elevation(latStation,LonStation,hStation,X_GRASP,Y_GRASP,Z_GRASP,angleLim){ // fonction calculant l angle d elevation entre une station au sol et un satelitte dans le repere local de la station
	console.log("function elevation(latStation,LonStation,hStation,X_GRASP,Y_GRASP,Z_GRASP,angleLim){");
//function elevation(EstStation, NordStation, hStation, EstGRASP, NordGRASP, hGRASP, angleLim){

	deltaEst = X_GRASP - LonStation;
	deltaNord = Y_GRASP - latStation;
	deltah = Z_GRASP - hStation;


	/*deltaEst = EstGRASP - EstStation;
	deltaNord = NordGRASP - NordStation;
	deltah = hGRASP - hStation;*/

	var r = Math.sqrt(Math.pow(deltaEst,2)+Math.pow(deltaNord,2));

	angle = Math.atan(deltah/r);

	angle = angle*(180/Math.PI);

	console.log(angle);

	if(angle>angleLim){
		console.log(angle);
	}
	else{
		console.log("satellite pas visible");
		AffichageFaux(latStation,LonStation);
		//viewer.entities.removeAll();
	}
}

function ConversionStations(lat,lon,h){
	console.log("function ConversionStations(lat,lon,h){");
}

function ConversionGRASP(X,Y,Z){
	console.log("function ConversionGRASP(X,Y,Z){");
}

function ITRFtoPLAN(lat,lon){
	console.log("function ITRFtoPLAN(lat,lon){");
	var matrice= new Matrix3(-sin(lon),cos(lon),0,-sin(lat)*cos(lon),-sin(lat)*sin(lon),cos(lat),cos(lat)*cos(lon),cos(lat)*sin(lon),sin(lat));
	console.log(matrice);
}

//elevation(1000,1000,1000,1000,1000,1000,50);

/*var viewer = new Cesium.Viewer('cesiumContainer');
var scene = viewer.scene;
var camera = new Cesium.Camera(scene);
var time = new Cesium.JulianDate();
scene.preRender.addEventListener(function(scene, time){
	var now = new Cesium.JulianDate();
	var offset = Cesium.Matrix4.multiplyByPoint(camera.transform, camera.position, new Cesium.Cartesian3());
	var transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Transforms.computeTemeToPseudoFixedMatrix(now));
	var inverseTransform = Cesium.Matrix4.inverseTransformation(transform, new Cesium.Matrix4());
	Cesium.Matrix4.multiplyByPoint(inverseTransform, offset, offset);
	camera.lookAtTransform(transform, offset);
	//console.log(transform);
});*/