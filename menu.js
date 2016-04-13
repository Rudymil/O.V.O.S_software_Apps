console.log("menu.js chargé"); // affichage dans la console

/*var scene = viewer.scene;
var clock = viewer.clock;*/

/*function include(fileName){
		//console.log("function include(fileName)");
	document.write("<script type='text/javascript' src='"+fileName+"'></script>" ); // Ecrire un texte directement au document HTML
}*/

//include('visibilite.js');
	//console.log("include('visibilite.js');");
//include('affichage.js'); // le fichier affichage.js contient toutes les fonctions qui permettront la gestion de l'affichage
	//console.log("include('affichage.js');");

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

function icrf(scene,time){ // cette fonctione prepare une vue en ICRF en calculant les elements permettant de présenter une vue en ICRF
		console.log("function icrf(scene,time){");
    if(scene.mode !== Cesium.SceneMode.SCENE3D){
    		console.log("if(scene.mode !== Cesium.SceneMode.SCENE3D){return;}");
    		console.log("scene.mode = "+scene.mode+"; Cesium.SceneMode.SCENE3D ="+Cesium.SceneMode.SCENE3D);
        return;
    }
    var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time); // Calcule une matrice de rotation pour transformer un point ou vecteur du Cadre international de référence celeste (FRGC / ITRF) cadre inertiel axes aux axes de chassis fixes terrestres (ITRF) a un moment donné. Cette fonction peut retourner undefined si les données nécessaires pour faire la transformation ne sont pas encore charges.
    	console.log("icrfToFixed = "+icrfToFixed);
    if(Cesium.defined(icrfToFixed)){
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
}

function itrf(scene,time){ // developpement 2016 // vue ITRF
		console.log("function itrf(scene,time){");
    if(scene.mode !== Cesium.SceneMode.SCENE3D){
    		console.log("if(scene.mode !== Cesium.SceneMode.SCENE3D){return;}");
    		console.log("scene.mode = "+scene.mode+"; Cesium.SceneMode.SCENE3D ="+Cesium.SceneMode.SCENE3D);
        return;
    }
    var itrfToFixed = Cesium.Transforms.computeFixedToIcrfMatrix(time); // Calcule une matrice de rotation pour transformer un point ou vecteur des axes de chassis fixes terrestres (ITRF) au Cadre international de reference celeste (ICRF / ICRF) cadre inertiel axes a un moment donne. Cette fonction peut retourner undefined si les donnees necessaires pour faire la transformation ne sont pas encore charges.
    	console.log("itrfToFixed = "+itrfToFixed);
    if(Cesium.defined(itrfToFixed)){
    		console.log("if(Cesium.defined(itrfToFixed)){");
        var camera = viewer.camera;
        	console.log("camera = "+camera);
        var offset = Cesium.Cartesian3.clone(camera.position);
        	console.log("offset = "+offset);
        var transform = Cesium.Matrix4.fromRotationTranslation(itrfToFixed);
        	console.log("transform = "+transform);
        camera.lookAtTransform(transform, offset);
        	console.log("camera.lookAtTransform(transform, offset);");
        	console.log("}");
    }
    	console.log("}");
}

//////////////////////////////////// VIEW EVENTS ////////////////////////////////////
////////////////////////////////////// VIEWS //////////////////////////////////////

function view(){ // developpement 2016 // vue initiale
		console.log("function view(){");
    Sandcastle.declare(view);
    	console.log("Sandcastle.declare(view);");
    var vm = viewer.homeButton.viewModel;
    	console.log("vm = "+vm);
    vm.duration = 0.0;
		console.log("vm.duration = "+vm.duration);
    vm.command();
    	console.log("vm.command();");
    vm.duration = 3.0;
    	console.log("vm.duration = "+vm.duration);
    clock.multiplier = 60; //3*60*60
    	console.log("clock.multiplier = "+clock.multiplier);
    //scene.preRender.addEventListener(base);
    scene.globe.enableLighting = false; // lumiere du soleil
    	console.log("scene.globe.enableLighting = "+scene.globe.enableLighting);
    	console.log("}");
}

function viewInICRF(){ // il s agit d une fonction recuperant les resultats de la function icrf(scene, time) et les effectant a la vue
		console.log("function viewInICRF(){");
    Sandcastle.declare(viewInICRF);
    	console.log("Sandcastle.declare(viewInICRF);");
	var vm = viewer.homeButton.viewModel;
    	console.log("vm = "+vm);
    vm.duration = 0.0;
    	console.log("vm.duration = "+vm.duration);
    vm.command();
    	console.log("vm.command();");
    vm.duration = 3.0;
    	console.log("vm.duration = "+vm.duration);
    clock.multiplier = 60; //3*60*60
    	console.log("clock.multiplier = "+clock.multiplier);
    scene.preRender.addEventListener(icrf); // function icrf(scene,time)
    	console.log("scene.preRender.addEventListener(icrf);");
    scene.globe.enableLighting = true; // lumiere du soleil
    	console.log("scene.globe.enableLighting = "+scene.globe.enableLighting);
    	console.log("}");
}

function viewInITRF(){ // developpement 2016 // vue ITRF
		console.log("function viewInITRF(){");
    Sandcastle.declare(viewInITRF);
    	console.log("Sandcastle.declare(viewInITRF);");
    var vm = viewer.homeButton.viewModel;
    	console.log("vm = "+vm);
    vm.duration = 0.0;
    	console.log("vm.duration = "+vm.duration);
    vm.command();
    	console.log("vm.command();");
    vm.duration = 3.0;
    	console.log("vm.duration = "+vm.duration);
    clock.multiplier = 60; //3*60*60
    	console.log("clock.multiplier = "+clock.multiplier);
    scene.preRender.addEventListener(itrf); // function itrf(scene,time)
    	console.log("scene.preRender.addEventListener(itrf);");
    scene.globe.enableLighting = true; // lumiere du soleil
    	console.log("scene.globe.enableLighting = "+scene.globe.enableLighting);
    	console.log("}");
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
		    onselect : function (){
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
		        console.log(Sandcastle.highlight);
		    }
		},{
		    text : 'View in ICRF',
		    onselect : function (){
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
		        	console.log(Sandcastle.highlight);
		        // affichage des satellites GPS SampleData\CZML_ICRF\GPS_CZML_ICRF
		        viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN01_orbit_GNSS_GPS.out_FRED.czml'));
		        	console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN01_orbit_GNSS_GPS.out_FRED.czml'));");
			    //viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN02_orbit_GNSS_GPS.out_FRED.czml'));
			    	//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GPS_CZML_ICRF/PRN02_orbit_GNSS_GPS.out_FRED.czml'));");
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
					console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN01_orbit_GNSS_GAL.out_FRED.czml'));");
				//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN02_orbit_GNSS_GAL.out_FRED.czml'));
					//console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN02_orbit_GNSS_GAL.out_FRED.czml'));");
				//viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GALILEO_CZML_ICRF/PRN03_orbit_GNSS_GAL.out_FRED.czml'));
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
				// affichage des satellites Grasp SampleData\CZML_ICRF\GRASP_CZML_ICRF orbit_GRASP_JPL.txt_FRED.czml
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/orbit_GRASP_JPL.txt_FRED.czml'));
					console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ICRF/GRASP_CZML_ICRF/orbit_GRASP_JPL.txt_FRED.czml'));");
		    }
		},{
		    text : 'View in ITRF',
		    onselect : function (){
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
		        	console.log(Sandcastle.highlight);
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
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN01_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));
					console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GALILEO_CZML_ITRF/PRN01_orbit_GNSS_GAL_ITRF.txt_FRED.czml'));");
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
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/orbite_itrf2016_GRASP.txt_FRED.czml'));
					console.log("viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML_ITRF/GRASP_CZML_ITRF/orbite_itrf2016_GRASP.txt_FRED.czml'));");
		    }
		}
	]
);

////////////////////////////////////// MENU //////////////////////////////////////
///////////////////////////////////// RESET /////////////////////////////////////

Sandcastle.reset = function(){
		console.log("Sandcastle.reset = function(){");
    viewer.entities.removeAll();
    	console.log("viewer.entities.removeAll();");
    scene.primitives.removeAll();
    	console.log("scene.primitives.removeAll();");
    viewer.dataSources.removeAll();
    	console.log("viewer.dataSources.removeAll();");
    scene.tweens.removeAll();
    	console.log("scene.tweens.removeAll();");
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    	console.log("viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);");
    clock.multiplier = 1.0;
    	console.log("clock.multiplier = 1.0;");
    scene.preRender.removeEventListener(icrf);
    	console.log("scene.preRender.removeEventListener(icrf);");
    scene.preRender.removeEventListener(itrf);
    	console.log("scene.preRender.removeEventListener(itrf);");
    scene.globe.enableLighting = false;
    	console.log("scene.globe.enableLighting = false;");
    	console.log("};");
};

scene.morphComplete.addEventListener(function(){
		console.log("scene.morphComplete.addEventListener(function(){");
    Sandcastle.reset();
    	console.log("Sandcastle.reset();");
    	console.log("});");
});

Sandcastle.reset = function(){
		console.log("Sandcastle.reset = function(){");
    viewer.entities.removeAll();
    	console.log("viewer.entities.removeAll();");
    viewer.dataSources.removeAll();
    	console.log("viewer.dataSources.removeAll();");
    //DataSourceCollection.removeAll();
    	//console.log("DataSourceCollection.removeAll();");
    scene.preRender.removeEventListener(icrf);
    	console.log("scene.preRender.removeEventListener(icrf);");
    scene.preRender.removeEventListener(itrf);
    	console.log("scene.preRender.removeEventListener(itrf);");
    	console.log("};");
};

///////////////////////////////////// RESET /////////////////////////////////////