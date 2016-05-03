console.log("affichage.js chargé"); // affichage dans la console

// contient toutes les fonctions qui permettront la gestion de l affichage

function point(lat, lon, namePoint, fichier)
{ // il s agit d une fonction d affichage d une station au sol // elle ne s occupe que des parametres d affichage d une station
	if(fichier=='../data/Networks_Stations/Network_IDS_ell')
	{	
		var positions_GNSS = viewer.entities.add(
		{
			name : namePoint,
			show:true,
			description:'type: Station GNSS',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/GroundStation.png', // ajouter projet_developpement_2016/ avant Apps si EasyPHP
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20
			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(10, 10)
			}
		});
		
		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement)
		{
	        var pickedObject = scene.pick(movement.endPosition);
	        if(Cesium.defined(pickedObject) && (pickedObject.id === positions_GNSS))
			{
	            positions_GNSS.billboard.scale = 1.5;
	            positions_GNSS.billboard.color = Cesium.Color.YELLOW;
	            positions_GNSS.label.show = true;
	            positions_GNSS.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/GroundStation.png'.height); // ajouter projet_developpement_2016/ avant Apps si EasyPHP
	            positions_GNSS.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);         
	            positions_GNSS.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
	            positions_GNSS.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
	        }
			else
			{
	            positions_GNSS.billboard.scale = 1;
	            positions_GNSS.billboard.color = Cesium.Color.WHITE;
	            positions_GNSS.label.show = false;
	        }
    	},
    	Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	}
	else if(fichier=='../data/Networks_Stations/Network_ILRS_ell')
	{
		var positions_Laser = viewer.entities.add(
		{
			name : namePoint,
			show:true,
			description:'type: Station Laser',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/LaserStation.png', // ajouter projet_developpement_2016/ avant Apps si EasyPHP
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20
			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(10, 10)
			}
		});
		
		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement)
		{
	        var pickedObject = scene.pick(movement.endPosition);
	        if(Cesium.defined(pickedObject) && (pickedObject.id === positions_Laser))
			{
	            positions_Laser.billboard.scale = 1.5;
	            positions_Laser.billboard.color = Cesium.Color.YELLOW;
	            positions_Laser.label.show = true;
	            positions_Laser.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
	            positions_Laser.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
	            positions_Laser.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);
	            positions_Laser.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/GroundStation.png'.height); // ajouter projet_developpement_2016/ avant Apps si EasyPHP
	        }
			else
			{
	            positions_Laser.billboard.scale = 1;
	            positions_Laser.billboard.color = Cesium.Color.WHITE;
	            positions_Laser.label.show = false;
       		}
    	},
    	Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	}
	else if(fichier=='../data/Networks_Stations/Network_IVS_ell')
	{
		var positions_VLBI = viewer.entities.add(
		{
			name : namePoint,
			show:true,
			description:'type: Station VLBI',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/OpticalTrackingStation.png', // ajouter projet_developpement_2016/ avant Apps si EasyPHP
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20
			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(50, 50)
			}
		});
		
		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement)
		{
	        var pickedObject = scene.pick(movement.endPosition);
	        if(Cesium.defined(pickedObject) && (pickedObject.id === positions_VLBI))
			{
	            positions_VLBI.billboard.scale = 1.5;
	            positions_VLBI.billboard.color = Cesium.Color.YELLOW;
	            positions_VLBI.label.show = true;
	            positions_VLBI.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
	            positions_VLBI.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/GroundStation.png'.height); // ajouter projet_developpement_2016/ avant Apps si EasyPHP
	            positions_VLBI.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);
	            positions_VLBI.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
	        }
			else
			{
	            positions_VLBI.billboard.scale = 1;
	            positions_VLBI.billboard.color = Cesium.Color.WHITE;
	            positions_VLBI.label.show = false;
	        }
   		},
   		Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	}
	else if(fichier=='../data/Networks_Stations/Network_NEN_ell')
	{
		var positions_DORIS = viewer.entities.add(
		{
			name : namePoint,
			show:true,
			description:'type: Station DORIS',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/RadarStation.png', // ajouter projet_developpement_2016/ avant Apps si EasyPHP
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20
			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(10, 10)
			}
		});
		
		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement)
		{
	        var pickedObject = scene.pick(movement.endPosition);
	        if(Cesium.defined(pickedObject) && (pickedObject.id === positions_DORIS))
			{
	            positions_DORIS.billboard.scale = 1.5;
	            positions_DORIS.billboard.color = Cesium.Color.YELLOW;
	            positions_DORIS.label.show = true;
	            positions_DORIS.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
	            positions_DORIS.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
	            positions_DORIS.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);
	            positions_DORIS.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost/ProjetDeveloppement2016/Apps/SampleData/kml/facilities/GroundStation.png'.height); // ajouter projet_developpement_2016/ avant Apps si EasyPHP
	        }
			else
			{
	            positions_DORIS.billboard.scale = 1;
	            positions_DORIS.billboard.color = Cesium.Color.WHITE;
	            positions_DORIS.label.show = false;
	        }
    	},
    	Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	}
}



// l s agit de la fonction globale d affichage des stations au sol
function Affichage(fichier)
{ 
	var Contenu = Fichier(fichier); // function Fichier(fichier) juste en dessous
	var i;
	var ligne =  new Array;
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	for(var i=0;i<nombre_de_lignes_au_total;i++)
	{ // pour chaque ligne
		ligne[i]=Contenu.split(/\n/g)[i]; // on recupere la ligne
		var reg=new RegExp("[        ]+", "g"); // Le constructeur RegExp permet de créer un objet représentant une expression rationnelle permettant de reconnaître un motif (pattern en anglais) dans un texte. "g" : La correspondance est cherchée partout (sur plusieurs lignes).
		var a = ligne[i].split(reg); // on extrait le pattern de la ligne correspondante
		//if (fichier=='Networks_Stations/Network_IDS_ell'){
			// function point(lat, lon, namePoint, fichier) ligne 5
			point(a[2],a[1],a[0],fichier); // il s agit d une fonction d affichage d une station au sol // elle n s occupe que des parametres d affichage d une station
		//}
	}
}

var Fichier = function Fichier(fichier)
{
    if(window.XMLHttpRequest) obj = new XMLHttpRequest(); //Pour Firefox, Opera,...
    else if(window.ActiveXObject) obj = new ActiveXObject("Microsoft.XMLHTTP"); //Pour Internet Explorer
    else return(false);
    if (obj.overrideMimeType) obj.overrideMimeType("text/xml"); //Évite un bug de Safari
    obj.open("GET", fichier, false);
    obj.send(null);
    if(obj.readyState == 4) return(obj.responseText);
    else return(false);
}


// cette fonction est appelee dans le cas ou une station n est pas visible du satellite depuis la station
function AffichageFaux(lat,lon)
{ 
	var positions_VLBI = viewer.entities.add(
	{
		//name : StationInvisible,
		show:false,
		description:'type: Station pas visibles',
		position : Cesium.Cartesian3.fromDegrees(lon, lat)
	});
}
	
//Affichage('../data/Networks_Stations/Network_IDS_ell');
//Affichage('../data/Networks_Stations/Network_ILRS_ell');
//Affichage('../data/Networks_Stations/Network_IVS_ell');
//Affichage('../data/Networks_Stations/Network_NEN_ell');