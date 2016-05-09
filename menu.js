console.log("menu.js chargé"); // affichage dans la console

/*var scene = viewer.scene;
var clock = viewer.clock;*/

function include(fileName)
{
		//console.log("function include(fileName)");
	document.write("<script type='text/javascript' src='"+fileName+"'></script>" ); // Ecrire un texte directement au document HTML
}

include('visibilite_stations_3.0.js');

//////////////////////////////////// VIEW EVENTS ////////////////////////////////////

/*function base(scene,time){ // developpement 2016 // vue initiale
		console.log("function base(scene,time){");
    /*if(scene.mode !== Cesium.SceneMode.SCENE3D){
    		console.log("if(scene.mode !== Cesium.SceneMode.SCENE3D){return;}");
    		console.log("scene.mode = "+scene.mode+"; Cesium.SceneMode.SCENE3D ="+Cesium.SceneMode.SCENE3D);
		return;
    }
    var baseToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
    	console.log("var baseToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);");
    if(Cesium.defined(baseToFixed)){
    		console.log("if(Cesium.defined(baseToFixed)){");
        var camera = viewer.camera;
        	//console.log("camera = "+camera);
        var offset = Cesium.Cartesian3.clone(camera.position);
        	//console.log("offset = "+offset);
        var transform = Cesium.Matrix4.fromRotationTranslation(baseToFixed);
        	//console.log("transform = "+transform);
        camera.lookAtTransform(transform, offset);
        	//console.log("camera.lookAtTransform(transform, offset);");
        	//console.log("}");
    }
    	//console.log("}");
}*/

function icrf(scene,time)
{ // cette fonctione prepare une vue en ICRF en calculant les elements permettant de présenter une vue en ICRF
		//console.log("function icrf(scene,time){");
		//console.log(time);
    /*if(scene.mode === Cesium.SceneMode.SCENE2D){ // si affichage en 2D plan
    		console.log("if scene.mode = "+scene.mode+" === Cesium.SceneMode.SCENE2D ="+Cesium.SceneMode.SCENE2D);
    	var toWindowCoordinates = Cesium.Transforms.pointToWindowCoordinates(modelViewProjectionMatrix,viewportTransformation,point,result); // transforme un point des coordonnees modeles aux coordonnees de la fenetre
    		console.log("icrfToFixed = "+toWindowCoordinates);
		if(Cesium.defined(toWindowCoordinates)){
				console.log("if(Cesium.defined(icrfToFixed)){");
		    var camera = viewer.camera;
		    	console.log("camera = "+camera);
		    var offset = Cesium.Cartesian3.clone(camera.position);
		    	console.log("offset = "+offset);
		    var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
		    	console.log("transform = "+transform);
		    camera.lookAtTransform(transform, offset);
				console.log("camera.lookAtTransform(transform, offset);");
				console.log("}");
		}
	    	console.log("}");
	}*/
    if(scene.mode === Cesium.SceneMode.SCENE3D)
    { // si affichage en 3D globe
    		//console.log("if scene.mode = "+scene.mode+" === Cesium.SceneMode.SCENE3D = "+Cesium.SceneMode.SCENE3D);
	    var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time); // Calcule une matrice de rotation pour transformer un point ou vecteur du Repere international de référence celeste (FRGC / ITRF) cadre inertiel axes aux axes de chassis fixes terrestres (ITRF) a un moment donné. Cette fonction peut retourner undefined si les données nécessaires pour faire la transformation ne sont pas encore charges.
	    	//console.log("icrfToFixed = "+icrfToFixed);
	    if(Cesium.defined(icrfToFixed))
	    {
	    		//console.log("if(Cesium.defined(icrfToFixed)){");
	        var camera = viewer.camera;
	        	//console.log("camera = "+camera);
	        var offset = Cesium.Cartesian3.clone(camera.position);
	        	//console.log("offset = "+offset);
	        var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
	        	//console.log("transform = "+transform);
	        camera.lookAtTransform(transform, offset);
				//console.log("camera.lookAtTransform(transform, offset);");
				//console.log("}");
		}
	    	//console.log("}");
	}
		//console.log("} // icrf(scene,time)");
}

function itrf(scene,time)
{ // developpement 2016 // vue ITRF
		console.log("function itrf(scene,time){");
		//console.log(time);
    /*if(scene.mode === Cesium.SceneMode.SCENE2D){ // si affichage en 2D plan
    		console.log("if scene.mode = "+scene.mode+" === Cesium.SceneMode.SCENE2D ="+Cesium.SceneMode.SCENE2D);
    	var toWindowCoordinates = Cesium.Transforms.pointToWindowCoordinates(modelViewProjectionMatrix,viewportTransformation,point,result); // transforme un point des coordonnees modeles aux coordonnees de la fenetre
    		console.log("icrfToFixed = "+toWindowCoordinates);
		if(Cesium.defined(toWindowCoordinates)){
				console.log("if(Cesium.defined(icrfToFixed)){");
		    var camera = viewer.camera;
		    	console.log("camera = "+camera);
		    var offset = Cesium.Cartesian3.clone(camera.position);
		    	console.log("offset = "+offset);
		    var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
		    	console.log("transform = "+transform);
		    camera.lookAtTransform(transform, offset);
				console.log("camera.lookAtTransform(transform, offset);");
				console.log("}");
		}
	    	console.log("}");
	}*/
	if(scene.mode === Cesium.SceneMode.SCENE3D)
	{ // si affichage en 3D globe
			//console.log("scene.mode = "+scene.mode+"; Cesium.SceneMode.SCENE3D = "+Cesium.SceneMode.SCENE3D);
	    var fixedToIcrf = Cesium.Transforms.computeFixedToIcrfMatrix(time); // Calcule une matrice de rotation pour transformer un point ou vecteur des axes de chassis fixes terrestres (ITRF) au Cadre international de reference celeste (ICRF / ICRF) cadre inertiel axes a un moment donne. Cette fonction peut retourner undefined si les donnees necessaires pour faire la transformation ne sont pas encore charges.
	    	//console.log("fixedToIcrf = "+fixedToIcrf);
	    if(Cesium.defined(fixedToIcrf))
	    {
	    		//console.log("if(Cesium.defined(fixedToIcrf)){");
	        var camera = viewer.camera;
	        	//console.log("camera = "+camera);
	        var offset = Cesium.Cartesian3.clone(camera.position);
	        	//console.log("offset = "+offset);
	        var transform = Cesium.Matrix4.fromRotationTranslation(fixedToIcrf);
	        	//console.log("transform = "+transform);
	        camera.lookAtTransform(transform, offset);
	        	//console.log("camera.lookAtTransform(transform, offset);");
	        	//console.log("}");
	    }
	    	console.log("} // itrf(scene,time)");
	}
}

//////////////////////////////////// VIEW EVENTS ////////////////////////////////////
////////////////////////////////////// VIEWS //////////////////////////////////////

function view()
{ // developpement 2016 // vue initiale
		console.log("function view(){");
    Sandcastle.declare(view);
    	//console.log("Sandcastle.declare(view);");
    var vm = viewer.homeButton.viewModel;
    	console.log("vm = "+vm);
    vm.duration = 0.0;
		console.log("vm.duration = "+vm.duration);
    vm.command();
    	//console.log("vm.command();");
    vm.duration = 3.0;
    	console.log("vm.duration = "+vm.duration);
    clock.multiplier = 60; //3*60*60
    	console.log("clock.multiplier = "+clock.multiplier);
    //scene.preRender.addEventListener(base);
    scene.globe.enableLighting = false; // lumiere du soleil
    	console.log("scene.globe.enableLighting = "+scene.globe.enableLighting);
    	console.log("} // view()");
}

function viewInICRF()
{ // il s agit d une fonction recuperant les resultats de la function icrf(scene, time) et les effectant a la vue
		console.log("function viewInICRF(){");
    Sandcastle.declare(viewInICRF);
    	//console.log("Sandcastle.declare(viewInICRF);");
	var vm = viewer.homeButton.viewModel;
    	console.log("vm = "+vm);
    vm.duration = 0.0;
    	console.log("vm.duration = "+vm.duration);
    vm.command();
    	//console.log("vm.command();");
    vm.duration = 3.0;
    	console.log("vm.duration = "+vm.duration);
    clock.multiplier = 60; //3*60*60
    	console.log("clock.multiplier = "+clock.multiplier);
    scene.preRender.addEventListener(icrf); // function icrf(scene,time)
    	//console.log("scene.preRender.addEventListener(icrf);");
    scene.globe.enableLighting = true; // lumiere du soleil
    	console.log("scene.globe.enableLighting = "+scene.globe.enableLighting);
    	console.log("} // viewInICRF()");
}

function viewInITRF()
{ // developpement 2016 // vue ITRF
		console.log("function viewInITRF(){");
    Sandcastle.declare(viewInITRF);
    	//console.log("Sandcastle.declare(viewInITRF);");
    var vm = viewer.homeButton.viewModel;
    	console.log("vm = "+vm);
    vm.duration = 0.0;
    	console.log("vm.duration = "+vm.duration);
    vm.command();
    	//console.log("vm.command();");
    vm.duration = 3.0;
    	console.log("vm.duration = "+vm.duration);
    clock.multiplier = 60; //3*60*60
    	console.log("clock.multiplier = "+clock.multiplier);
    scene.preRender.addEventListener(itrf); // function itrf(scene,time)
    	//console.log("scene.preRender.addEventListener(itrf);");
    scene.globe.enableLighting = true; // lumiere du soleil
    	console.log("scene.globe.enableLighting = "+scene.globe.enableLighting);
    	console.log("} // viewInITRF()");
}

////////////////////////////////////// VIEWS //////////////////////////////////////
////////////////////////////////////// MENU //////////////////////////////////////

/*var options = [{ // liste des scenarii
    text : 'Choix du satellite'
}];*/

//function addsatellite(data){ // cette fonction recupere les titres des fichiers d orbites dans le repertoire des orbites des satellites GRASP et genere une liste deroulant permettant a l utilisateur de choisir son scenario pour GRASP
//    var lignes = data.split("|");
//    for( var i in lignes ){
//       console.log(lignes[i]);
//        var option1 = {
//            text : lignes[i],
//            onselect : function(){
//                viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GPS.czml'));
//                viewInICRF();
//                /*Affichage('../data/Networks_Stations/Network_IDS_ell');
//				  Affichage('../data/Networks_Stations/Network_ILRS_ell');
//                Affichage('../data/Networks_Stations/Network_IVS_ell');*/
//                Affichage('../data/Networks_Stations/Network_NEN_ell');
//                //Affichage('../data/Networks_Stations/Network_essai');
//                Sandcastle.highlight(viewInICRF);
//            }
//        };
//        options.push(option1); // rajoute le scenario dans la liste des scenarii
//        /*var option1 = { text : lignes[i]
//    }
//    options.push(option1);
//    lignes[0] = String(lignes[0]);
//    //console.log(lignes[0]);
//    var option1 = {text : lignes[0]};
//    //console.log(option1);
//    options.push(option1);*/
//    }
//   Sandcastle.addToolbarMenu(options);
//}

/*var option1 = {
    text : "toto",
    onselect : function(){
        viewer.dataSources.add(Cesium.CzmlDataSource.load('GPS.czml'));
        viewInICRF();
        Affichage('Networks_Stations/Network_IDS_ell');
        Affichage('Networks_Stations/Network_ILRS_ell');
        Affichage('Networks_Stations/Network_IVS_ell');
        Affichage('Networks_Stations/Network_NEN_ell');
        Sandcastle.highlight(viewInICRF);
    }
};
options.push(option1);*/

Sandcastle.addToolbarMenu( // Menu choix ITRF/ICRF
	[
		{
		    text : 'Choix de la caméra',
		    onselect : function ()
		    {
		        view(); // function view()

			    // affichage des stations software\data\Networks_Stations

			        Affichage('../data/Networks_Stations/Network_IDS_ell'); // affichage.js function Affichage(fichier)
			        console.log("Affichage('../data/Networks_Stations/Network_IDS_ell');");
			        Affichage('../data/Networks_Stations/Network_ILRS_ell'); // affichage.js function Affichage(fichier)
			        console.log("Affichage('../data/Networks_Stations/Network_ILRS_ell');");
			        Affichage('../data/Networks_Stations/Network_IVS_ell'); // affichage.js function Affichage(fichier)
			        console.log("Affichage('../data/Networks_Stations/Network_IVS_ell');");
			        Affichage('../data/Networks_Stations/Network_NEN_ell'); // affichage.js function Affichage(fichier)
			        console.log("Affichage('../data/Networks_Stations/Network_NEN_ell');");
			    Sandcastle.highlight(view);
			    //console.log(Sandcastle.highlight);
		    }
		},{
		    text : 'View in ICRF',
		    onselect : function ()
		    {
			        viewInICRF(); // function viewInICRF()

			    // affichage des stations software\data\Networks_Stations

			        Affichage('../data/Networks_Stations/Network_IDS_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_IDS_ell');");
			        Affichage('../data/Networks_Stations/Network_ILRS_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_ILRS_ell');");
			        Affichage('../data/Networks_Stations/Network_IVS_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_IVS_ell');");
			        Affichage('../data/Networks_Stations/Network_NEN_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_NEN_ell');");
			    Sandcastle.highlight(viewInICRF);
			        //console.log(Sandcastle.highlight);

			    // affichage des satellites GPS SampleData\CZML_ICRF\GPS_CZML_ICRF

			        viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN01_orbit_GNSS_GPS.out_FRED.czml'));
			        	console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN01_orbit_GNSS_GPS.out_FRED.czml'));");
				    viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN02_orbit_GNSS_GPS.out_FRED.czml'));
				    	console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN02_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN03_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN03_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN04_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN04_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN05_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN05_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN07_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN07_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN08_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN08_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN09_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN09_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN10_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN10_orbit_GNSS_GPS.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN11_orbit_GNSS_GPS.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN11_orbit_GNSS_GPS.out_FRED.czml'));");

				// affichage des satellites Galileo SampleData\CZML_ICRF\GALILEO_CZML_ICRF

					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN01_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN01_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN02_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN02_orbit_GNSS_GAL.out_FRED.czml'));");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN03_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN03_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN04_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN04_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN05_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN05_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN06_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN06_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN07_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN07_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN08_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN08_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN09_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN09_orbit_GNSS_GAL.out_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN10_orbit_GNSS_GAL.out_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN10_orbit_GNSS_GAL.out_FRED.czml'));");

				// affichage des satellites Grasp SampleData/CZML_ICRF/GRASP_CZML_ICRF/

						console.log("affichage des satellites Grasp ICRF jour 1");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour1/orbit_GRASP_JPL_FREDj1_13.czml'));
						console.log("affichage des satellites Grasp ICRF jour 2");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour2/orbit_GRASP_JPL_FREDj2_13.czml'));
						console.log("affichage des satellites Grasp ICRF jour 3");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour3/orbit_GRASP_JPL_FREDj3_13.czml'));
						console.log("affichage des satellites Grasp ICRF jour 4");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour4/orbit_GRASP_JPL_FREDj4_13.czml'));
						console.log("affichage des satellites Grasp ICRF jour 5");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour5/orbit_GRASP_JPL_FREDj5_13.czml'));
						console.log("affichage des satellites Grasp ICRF jour 6");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour6/orbit_GRASP_JPL_FREDj6_13.czml'));
						console.log("affichage des satellites Grasp ICRF jour 7");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_13.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/jour7/orbit_GRASP_JPL_FREDj7_14.czml'));

				// On appelle une fonction de maniere repetee, a intervalle de temps regulier.
				// Ici toutes les 30000 ms, soit toutes les secondes.
				window.setInterval(function()
				{
					VisibiliteTempsReel(tableau);
				}, 30000);
			}
		},{
		    text : 'View in ITRF',
		    onselect : function ()
		    {
			        viewInITRF(); // function viewInITRF()

			    // affichage des stations software\data\Networks_Stations

			        Affichage('../data/Networks_Stations/Network_IDS_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_IDS_ell');");
			        Affichage('../data/Networks_Stations/Network_ILRS_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_ILRS_ell');");
			        Affichage('../data/Networks_Stations/Network_IVS_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_IVS_ell');");
			        Affichage('../data/Networks_Stations/Network_NEN_ell'); // affichage.js function Affichage(fichier)
			        	console.log("Affichage('../data/Networks_Stations/Network_NEN_ell');");
			    Sandcastle.highlight(viewInITRF);
			        //console.log(Sandcastle.highlight);

				// affichage des satellites GPS SampleData\CZML_ITRF\GPS_CZML_ITRF

			        viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN01_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
			        	console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN01_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
				    //viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN02_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
				    	//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN02_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN03_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN03_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN04_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN04_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN05_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN05_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN06_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN06_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN07_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN07_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN08_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN08_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN09_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN09_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN10_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GPS_CZML_ITRF/PRN10_orbit_GNSS_GPS_ITRF.txt_FRED.czml'));");

				// affichage des satellites Galileo SampleData\CZML_ITRF\GALILEO_CZML_ITRF

					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN01_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN01_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN02_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN02_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN03_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN03_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN04_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN04_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN05_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN05_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN06_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN06_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN07_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN07_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN08_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN08_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN09_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN09_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
					//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN10_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
						//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN10_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");

				// affichage des satellites Grasp SampleData\CZML_ITRF\GRASP_CZML_ITRF

						console.log("affichage des satellites Grasp ITRF jour 1");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour1/orbite_itrf2016_GRASP_FREDj1_13.czml'));
						console.log("affichage des satellites Grasp ITRF jour 2");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour2/orbite_itrf2016_GRASP_FREDj2_13.czml'));
						console.log("affichage des satellites Grasp ITRF jour 3");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour3/orbite_itrf2016_GRASP_FREDj3_13.czml'));
						console.log("affichage des satellites Grasp ITRF jour 4");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour4/orbite_itrf2016_GRASP_FREDj4_13.czml'));
						console.log("affichage des satellites Grasp ITRF jour 5");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour5/orbite_itrf2016_GRASP_FREDj5_13.czml'));
						console.log("affichage des satellites Grasp ITRF jour 6");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour6/orbite_itrf2016_GRASP_FREDj6_13.czml'));
						console.log("affichage des satellites Grasp ITRF jour 7");
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_1.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_2.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_3.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_4.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_5.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_6.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_7.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_8.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_9.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_10.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_11.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_12.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_13.czml'));
					viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/jour7/orbite_itrf2016_GRASP_FREDj7_14.czml'));

				// On appelle une fonction de maniere repetee, a intervalle de temps regulier.
				// Ici toutes les 30000 ms, soit toutes les secondes.
				window.setInterval(function()
				{
					VisibiliteTempsReel(tableau);
				}, 30000);
		    }
		}
	]
);

////////////////////////////////////// MENU //////////////////////////////////////
///////////////////////////////////// RESET /////////////////////////////////////

Sandcastle.reset = function()
{
		console.log("Sandcastle.reset = function(){");
    viewer.entities.removeAll();
    	//console.log("viewer.entities.removeAll();");
    scene.primitives.removeAll();
    	//console.log("scene.primitives.removeAll();");
    viewer.dataSources.removeAll();
    	//console.log("viewer.dataSources.removeAll();");
    scene.tweens.removeAll();
    	//console.log("scene.tweens.removeAll();");
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    	//console.log("viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);");
    clock.multiplier = 1.0;
    	//console.log("clock.multiplier = 1.0;");
    scene.preRender.removeEventListener(icrf);
    	//console.log("scene.preRender.removeEventListener(icrf);");
    scene.preRender.removeEventListener(itrf);
    	//console.log("scene.preRender.removeEventListener(itrf);");
    scene.globe.enableLighting = false;
    	//console.log("scene.globe.enableLighting = false;");
    	console.log("} // Sandcastle.reset = function()");
};

scene.morphComplete.addEventListener(function()
{
		console.log("scene.morphComplete.addEventListener(function(){");
    Sandcastle.reset();
    	//console.log("Sandcastle.reset();");
    	console.log("}) // scene.morphComplete.addEventListener(function()");
});

Sandcastle.reset = function()
{
		console.log("Sandcastle.reset = function(){");
    viewer.entities.removeAll();
    	//console.log("viewer.entities.removeAll();");
    viewer.dataSources.removeAll();
    	//console.log("viewer.dataSources.removeAll();");
    //DataSourceCollection.removeAll();
    	//console.log("DataSourceCollection.removeAll();");
    scene.preRender.removeEventListener(icrf);
    	//console.log("scene.preRender.removeEventListener(icrf);");
    scene.preRender.removeEventListener(itrf);
    	//console.log("scene.preRender.removeEventListener(itrf);");
    	console.log("} // Sandcastle.reset = function()");
};

///////////////////////////////////// RESET /////////////////////////////////////