console.log("menu.js chargé"); // affichage dans la console

/*var scene = viewer.scene;
var clock = viewer.clock;*/

function include(fileName){
	document.write("<script type='text/javascript' src='"+fileName+"'></script>" ); // Ecrire un texte directement au document HTML
}

include('visibilite.js');
include('affichage.js'); // le fichier affichage.js contient toutes les fonctions qui permettront la gestion de l'affichage
//Affichage('Networks_Stations/Network_IDS_ell');

function base(scene,time){ // developpement 2016 // vue initiale
    if(scene.mode !== Cesium.SceneMode.SCENE3D){
		return;
    }
    var baseToFixed = Cesium.Transforms.computebaseToFixedMatrix(time);
    if(Cesium.defined(baseToFixed)){
        var camera = viewer.camera;
        var offset = Cesium.Cartesian3.clone(camera.position);
        var transform = Cesium.Matrix4.fromRotationTranslation(baseToFixed);
        camera.lookAtTransform(transform, offset);
    }
}

function icrf(scene,time){ // cette fonctione prepare une vue en ICRF en calculant les elements permettant de présenter une vue en ICRF
    if(scene.mode !== Cesium.SceneMode.SCENE3D){
        return;
    }
    var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
    if(Cesium.defined(icrfToFixed)){
        var camera = viewer.camera;
        var offset = Cesium.Cartesian3.clone(camera.position);
        var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
        camera.lookAtTransform(transform, offset);
    }
}

function itrf(scene,time){ // developpement 2016 // vue ITRF
    if(scene.mode !== Cesium.SceneMode.SCENE3D){
        return;
    }
    var itrfToFixed = Cesium.Transforms.computeitrfToFixedMatrix(time);
    if(Cesium.defined(itrfToFixed)){
        var camera = viewer.camera;
        var offset = Cesium.Cartesian3.clone(camera.position);
        var transform = Cesium.Matrix4.fromRotationTranslation(itrfToFixed);
        camera.lookAtTransform(transform, offset);
    }
}

function view(){ // developpement 2016 // vue initiale
    Sandcastle.declare(view);
    var vm = viewer.homeButton.viewModel;
    vm.duration = 0.0;
    vm.command();
    vm.duration = 3.0;
    clock.multiplier = 3*60*60;
    scene.preRender.addEventListener(base);
    scene.globe.enableLighting = false; // lumiere du soleil
}

function viewInICRF(){ // il s agit d une fonction recuperant les resultats de la function icrf(scene, time) et les effectant a la vue
    Sandcastle.declare(viewInICRF);
    var vm = viewer.homeButton.viewModel;
    vm.duration = 0.0;
    vm.command();
    vm.duration = 3.0;
    clock.multiplier = 3*60*60;
    scene.preRender.addEventListener(icrf);
    scene.globe.enableLighting = true; // lumiere du soleil
}

function viewInITRF(){ // developpement 2016 // vue ITRF
    Sandcastle.declare(viewInITRF);
    var vm = viewer.homeButton.viewModel;
    vm.duration = 0.0;
    vm.command();
    vm.duration = 3.0;
    clock.multiplier = 3*60*60;
    scene.preRender.addEventListener(itrf);
    scene.globe.enableLighting = true; // lumiere du soleil
}

var options = [{ // liste des scenarii
    text : 'Choix du satellite'
}];

function addsatellite(data){ // cette fonction recupere les titres des fichiers d orbites dans le repertoire des orbites des satellites GRASP et genere une liste deroulant permettant a l utilisateur de choisir son scenario pour GRASP
    var lignes = data.split("|");
    for( var i in lignes ){
        console.log(lignes[i]);
        var option1 = {
            text : lignes[i],
            onselect : function(){
                viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GPS.czml'));
                viewInICRF();
                /*Affichage('../data/Networks_Stations/Network_IDS_ell');
                Affichage('../data/Networks_Stations/Network_ILRS_ell');
                Affichage('../data/Networks_Stations/Network_IVS_ell');*/
                Affichage('../data/Networks_Stations/Network_NEN_ell');
                //Affichage('../data/Networks_Stations/Network_essai');
                Sandcastle.highlight(viewInICRF);
            }
        };
        options.push(option1); // rajoute le scenario dans la liste des scenarii
        /*var option1 = { text : lignes[i]
    }
    options.push(option1);
    lignes[0] = String(lignes[0]);
    //console.log(lignes[0]);
    var option1 = {text : lignes[0]};
    //console.log(option1);
    options.push(option1);*/
    }
    Sandcastle.addToolbarMenu(options);
}

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
		        Affichage('../data/Networks_Stations/Network_IDS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_ILRS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_IVS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_NEN_ell'); // affichage.js function Affichage(fichier)
		        Sandcastle.highlight(view);
		        console.log(Sandcastle.highlight);
		        // affichage des satellites
		        viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GPS.czml'));
		    }
		},{
		    text : 'View in ICRF',
		    onselect : function (){
		        viewInICRF(); // function viewInICRF()
		        Affichage('../data/Networks_Stations/Network_IDS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_ILRS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_IVS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_NEN_ell'); // affichage.js function Affichage(fichier)
		        Sandcastle.highlight(viewInICRF);
		        console.log(Sandcastle.highlight);
		        // affichage des satellites
		        viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GPS.czml'));
			    viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP1.czml'));
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP2.czml'));
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP3.czml'));
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP4.czml'));
		    }
		},{
		    text : 'View in ITRF',
		    onselect : function (){
		        viewInITRF(); // function viewInITRF()
		        Affichage('../data/Networks_Stations/Network_IDS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_ILRS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_IVS_ell'); // affichage.js function Affichage(fichier)
		        Affichage('../data/Networks_Stations/Network_NEN_ell'); // affichage.js function Affichage(fichier)
		        Sandcastle.highlight(viewInITRF);
		        console.log(Sandcastle.highlight);
		        // affichage des satellites
		        viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GPS.czml'));
		        viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP1.czml'));
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP2.czml'));
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP3.czml'));
				viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/GRASP4.czml'));
		    }
		}
	]
);

Sandcastle.reset = function(){
    viewer.entities.removeAll();
    scene.primitives.removeAll();
    viewer.dataSources.removeAll();
    scene.tweens.removeAll();
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    clock.multiplier = 1.0;
    scene.preRender.removeEventListener(icrf);
    scene.preRender.removeEventListener(itrf);
    scene.preRender.removeEventListener(base);
    scene.globe.enableLighting = false;
};

scene.morphComplete.addEventListener(function(){
    Sandcastle.reset();
});

Sandcastle.reset = function(){
    viewer.entities.removeAll();
    viewer.dataSources.removeAll();
    DataSourceCollection.removeAll();
};