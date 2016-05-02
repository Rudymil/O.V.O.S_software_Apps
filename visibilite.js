// Controle de chargement du fichier
console.log("visibilite.js chargé"); 

//var viewer = new Cesium.Viewer('cesiumContainer');

// Fonction permettant d'inclure un fichier javascript dans un autre fichier javascript
function include(fileName)
{ 
	// On insere une balise script avec le nom du fichier a inclure.
	document.write("<script type='text/javascript' src='"+fileName+"'></script>");
}

// On insere le fichier affichage.js
include('affichage.js');

// Fonction lisant un fichier texte et retournant son contenu dans une chaine de caracteres
var Fichier = function Fichier(fichier)
{ 
	// On gere Firefox et autres
    if(window.XMLHttpRequest) obj = new XMLHttpRequest(); 
	// On gere Internet Explorer
    else if(window.ActiveXObject) obj = new ActiveXObject("Microsoft.XMLHTTP"); 
	// Si la requete n'est pas supportee par le navigateur :
    else return(false);
	// On gere Safari
    if(obj.overrideMimeType) obj.overrideMimeType("text/xml"); 
	
	// On ouvre la connexion avec le serveur.
	// -methode : Get ou POST
	// -url : la ou on veut envoyer la requete. Si la methode est GET, on met les 
	//  	  parametres dans l'url.
	// -flag : true pour un dialogue asynchrone, false sinon.
    obj.open("GET", fichier, false);
	
	// On envoie la requete au serveur.
	// -Si la methode est GET, on met null en parametre.
	// -Si la methode est POST, on met les parametres a renvoyer sous la forme :
	//	"nomparam1=valeurparam1&nomparam2=valeurparam2"
    obj.send(null);
	
	// readyState represente l'etat de l'objet :
	// -0:non initialise;
	// -1:ouverture (open() vient de s'exécuter);
	// -2:envoyé (send() vient de s'exécuter);
	// -3:en cours (des données sont en train d'arriver);
	// -4:prêt (toutes les données sont chargées).
	// Donc si tout est bien charge, on renvoie la reponse.
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


// Fonction renvoyant la position approximative du satellite a chaque temps t de l'horloge du viewer.
// Cette fonction recupere les resultats de la fonction Fichier(fichier) et les affecte au viewer.
function PositionSatellite()
{  
	var fichier ='../data/Networks_Stations/Satellite.txt'; // FICHIER INEXISTANT
	
	// On recupere le contenu du fichier.
	var Contenu = Fichier(fichier);	
	// On controle le resultat dans la console.
	console.log(Contenu);
	
	
	var iLine;
	// On initialise 2 nouveaux tableaux.
	var tableau = new Array();
	var ligne =  new Array;
	// On recupere la taille du fichier.
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	// On parcourt les lignes du fichier.
	for( var iLine=0 ; iLine<nombre_de_lignes_au_total ; iLine++ )
	{
		// Dans le tableau de lignes, on insere chaque ligne du fichier.
		ligne[iLine]=Contenu.split(/\n/g)[iLine]
		
		// On cree un objet representant une expression rationnelle permettant de reconnaitre
		// un motif au sein d'une chaine de caracteres.
		// - motif : decrit le format de chaine a trouver;
		// -type : decrit le type d'expression reguliere :
		//		+ i:expression analysee indifferemment sur majuscules ou minuscules;
		//		+ g:expression analysee globalement sur l'ensemble de la chaine;
		//		+ gi:les 2.
		var reg=new RegExp("[,]+", "g");
		
		// Dans tableau, on remplit chaque ligne par plusieurs champs separes (plusieurs colonnes).
		tableau[iLine] = ligne[iLine].split(reg);
	}
	
	//var answers = JSON.parse('Networks_Stations/Satellite.txt');
	//var widget = new Cesium.CesiumWidget('cesiumContainer');
	
	// On recupere le nombre de secondes au sein du jour julien courant.
	// Les secondes fractionees, negatives et les secondes superieurs a une journee sont gerees.
	var seconds = viewer.clock.currentTime.secondsOfDay;
	
	// On recupere le jour courant en julien.
	// Les jours fractiones sont geres.
	var julianDay = viewer.clock.currentTime.dayNumber;
	
	
	//var Julian=Cesium.JulianDate(2441317, 43210.0, TimeStandard.TAI)
	//var julianDate = new Cesium.JulianDate();
	
	// On recupere une date julien astronomique (nb de jours depuis le 1er janvier -4712 apres-midi)
	// -julianDayNumber : Nombre de jours entiers;
	// -secondsOfDay : Nombre de secondes au sein du jour julien courant;
	// -timeStandard : Temps standard dans lequel les 2 premiers parametres sont definis.
	var dateViewer = new Cesium.JulianDate(julianDay, seconds, Cesium.TimeStandard.UTC);
	
	// On cree un tableau dans lequel on stockera les dates de debut de visibilite.
	var julianDateBeginning = new Array();
	
	// 1ere date.
	// Creation d'une nouvelle instance d'une date ISO8601.
	// Prend en parametre une date en chaine de caracteres.
	// Renvoie une date julien.
	julianDateBeginning [0] = Cesium.JulianDate.fromIso8601('2012-03-15T10:00:00Z');
	
	// On cree une liste.
	var difference = [];
	
	// On definit la fin de l'intervalle de temps (1er argument de la derniere ligne du fichier).
	var maxTemps=tableau[nombre_de_lignes_au_total-1][0];
	
	// On definit un pas.
	var pas=maxTemps/(nombre_de_lignes_au_total-3);
	
	// On parcourt les lignes du fichier.
	for( var iLine=1 ; iLine<nombre_de_lignes_au_total+1 ; iLine++ )
	{
		// A la date fournie, on ajoute un certain nombre de secondes (intervalle de secondes : pas)
		// -julianDate : date julien fournie;
		// -seconds : nombre de secondes a ajouter (>0) ou a soustraire (si <0);
		// -result : une instance existante a utiliser pour le resultat.
		julianDateBeginning[iLine] = Cesium.JulianDate.addSeconds(julianDateBeginning[iLine-1], pas, new Cesium.JulianDate());
		
		// On ajoute a la liste la difference en jours entre 2 dates.
		difference.push(Math.abs(Cesium.JulianDate.daysDifference(julianDateBeginning[iLine],dateViewer)));
	}
	
	// On recupere la valeur minimale de la liste et on la stocke dans la variable min.
	var min = Math.min.apply(null, difference);
	
	// On recupere l'indice de la valeur minimale de la liste.
	var position = difference.indexOf(min);
	// On controle dans la console.
	console.log(position);
	
	// On recupere le contenu d'un fichier station.
	var ContenuStations = Fichier('../data/Networks_Stations/Network_NEN_ell');
	
	
	var iLine2;
	// On initialise 1 nouveau tableau.
	var ligne2 =  new Array;
	// On recupere la taille du fichier.
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	// On parcourt les lignes du fichier.
	for( var iLine2=0 ; iLine2<nombre_de_lignes_au_total ; iLine2++)
	{
		// Dans le tableau de lignes, on insere chaque ligne du fichier.
		ligne2[iLine2]=Contenu.split(/\n/g)[iLine2];
		
		// On cree un objet representant une expression rationnelle permettant de reconnaitre
		// un motif au sein d'une chaine de caracteres.
		// - motif : decrit le format de chaine a trouver;
		// -type : decrit le type d'expression reguliere :
		//		+ i:expression analysee indifferemment sur majuscules ou minuscules;
		//		+ g:expression analysee globalement sur l'ensemble de la chaine;
		//		+ gi:les 2.
		var reg=new RegExp("[        ]+", "g");
		
		// Dans un autre tableau, on remplit chaque ligne par plusieurs champs separes (plusieurs colonnes).
		var autreTableau = ligne2[iLine2].split(reg);
		
		
		// On appelle la fontion elevation.
		//point(tableau[2],tableau[1],tableau[0],fichier);
		elevation(autreTableau[2], autreTableau[1], autreTableau[3], tableau[position][1], tableau[position][2], tableau[position][3], 5);
	}
	
	// On controle dans la console.
	console.log(dateViewer);
	console.log("x: "+tableau[position][1],"y: "+tableau[position][2],"z: "+tableau[position][3]);
	var difference2 = Cesium.JulianDate.daysDifference(dateViewer,julianDateBeginning[1]);
}

// On appelle une fonction de maniere repetee, a intervalle de temps regulier.
// Ici toutes les 1000 ms, soit toutes les secondes.
window.setInterval(function()
{
	//PositionSatellite();
}, 1000);

// Soit une nouvelle requete.
var req = new XMLHttpRequest();
// On definit les modalites d'envoi de la requete par la methode open :
// -methode de transfert : GET ou POST;
// -url : chemin d'envoi de la requete;
// -flag : true pour un dialogue asynchrone, false sinon.
req.open("GET", "SampleData/GPS.czml", true); 
// On affecte une fonction qui sera executee a chaque "changement d'etat" de l'objet.
req.onreadystatechange = myCode; 
// On envoie la requete.
req.send(null);

function myCode()
{ 
	// Si toutes les donnees sont chargees :
	if (req.readyState == 4)
	{ 
		// No Comprendo
		var doc = window[req.responseText];
			//alert (doc);
			//alert ( req.responseTex);
	}
	else
	{
		console.log("erreur de requete");
	}
}

myCode();


// Fonction qui determine si un satellite est dans le cone de visibilite d'une station ou pas.
function elevation(latStation,LonStation,hStation,X_GRASP,Y_GRASP,Z_GRASP,angleLim)
{ 
	// Definition de l'angle du cone de visibilite du satellite.
	var angleLim=60;
	
	// Constantes pour l'ellipsoide GRS80
	var a = 6378137;
	var e=Math.sqrt(0.0066943800222);
	var W = sqrt (1-(e^2)*(sin(latStation)^2));
	var N = a/W;
	

	// 1) Passage d'un repere geocentrique a un repere local, de centre le station. 

	// On calcule la matrice de changement de repere pour une station.
	var matriceChangementRepere= math.matrix([-sin(LonStation),cos(LonStation),0],[-sin(latStation)*cos(LonStation),-sin(latStation)*sin(LonStation),cos(latStation)],[cos(latStation)*cos(LonStation),cos(latStation)*sin(LonStation),sin(latStation)]);
	
	// 
	var matriceSat= math.matrix([X_GRASP-N*cos(LonStation)*cos(latStation)],
								[Y_GRASP-N*sin(LonStation)*cos(latStation)],
								[Z_GRASP-N*(1-Math.pow(e,2))*sin(latStation)]);

	// On calcule les nouvelles coordonnees du satellite dans le repere local.
	var SatLocal=math.multiply(matriceChangementRepere,matriceSat);
	console.log("Les coordonnees du satellite dans le repere local sont :"+SatLocal);
	
	// 2) On calcule la distance separant le satellite de la station.
	var Xlocal=math.subset(SatLocal, math.index(1));
	var Ylocal=math.subset(SatLocal, math.index(2));
	var Zlocal=math.subset(SatLocal, math.index(3));
	var Distance= Math.sqrt(Math.pow(Xlocal,2) + Math.pow(Ylocal,2));
	
	// 3) On calcule l'angle (en degres) entre le satellite et la verticale a la station.
	var angleRadian=Math.acos(Zlocal/Distance)*(180/Math.PI);
	
	// 4) Si cet angle est inferieur a l'angle delimitant le cone de visibilite, alors le satellite est visible.
	if(angleDegre<angleLim)
	{
		console.log(angleDegre);
	}
	else
	{
		console.log("satellite non visible");
	}
}

/*
function ConversionStations(lat,lon,h)
{
	
}

function ConversionGRASP(X,Y,Z)
{
	
}

function ITRFtoPLAN(lat,lon){
	var matrice= new Matrix3(-sin(lon),cos(lon),0,-sin(lat)*cos(lon),-sin(lat)*sin(lon),cos(lat),cos(lat)*cos(lon),cos(lat)*sin(lon),sin(lat));
	console.log(matrice);
}
*/

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
