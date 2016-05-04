// Controle de chargement du fichier
console.log("visibilite_stations_2.0.js chargé"); 

//var viewer = new Cesium.Viewer('cesiumContainer');

// Fonction permettant d'inclure un fichier javascript dans un autre fichier javascript
function include(fileName)
{ 
	// On insere une balise script avec le nom du fichier a inclure.
	document.write("<script type='text/javascript' src='"+fileName+"'></script>");
}

// On insere le fichier affichage.js
include('affichage_stations.js');

var fichier ='SampleData/CZML_ICRF/GRASP_CZML_ICRF/GRASP_ICRF_2.txt';
	console.log("var fichier ='SampleData/CZML_ICRF/GRASP_CZML_ICRF/GRASP_ICRF_2.txt';");
	//console.log("fichier = "+fichier);
	
// On recupere le contenu du fichier.
var Contenu = Fichier(fichier);
	console.log("var Contenu = Fichier(fichier);");	
	//console.log("Contenu = "+Contenu);

// Fonction renvoyant la position approximative du satellite a chaque temps t de l'horloge du viewer.
// Cette fonction recupere les resultats de la fonction Fichier(fichier) et les affecte au viewer.
function PositionSatellite()
{
		console.log("function PositionSatellite(){");
	
	var iLine=0;
	var iLineTableau=0;
		//console.log("iLine = "+iLine);
	var iCol=0;
		//console.log("iCol = "+iCol);
	// On initialise 2 nouveaux tableaux.
	var tableau = new Array();
		//console.log("tableau = "+tableau);
	var ligne =  new Array;
		//console.log("ligne = "+ligne);
	// On recupere la taille du fichier.
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
		//console.log("nombre_de_lignes_au_total = "+nombre_de_lignes_au_total);
	// On parcourt les lignes du fichier.
	while(iLine<nombre_de_lignes_au_total)
	{
		tableau[iLineTableau]=new Array();
		
		for(var iCol=0; iCol<4; iCol++)
		{
			// Dans le tableau de lignes, on insere chaque ligne du fichier.
			ligne[iLine+iCol]=Contenu.split(/\n/g)[iLine+iCol];
				//console.log("ligne[iLine] = "+ligne[iLine]);
			
			// On cree un objet representant une expression rationnelle permettant de reconnaitre
			// un motif au sein d'une chaine de caracteres.
			// - motif : decrit le format de chaine a trouver;
			// -type : decrit le type d'expression reguliere :
			//		+ i:expression analysee indifferemment sur majuscules ou minuscules;
			//		+ g:expression analysee globalement sur l'ensemble de la chaine;
			//		+ gi:les 2.
			var reg=new RegExp("[,]+", "g");
			//chaine.replace(reg,"<SPAN style='background-color=yellow'>$1</SPAN></FONT>")
			
			// Dans tableau, on remplit chaque ligne par plusieurs champs separes (plusieurs colonnes).
			tableau[iLineTableau][iCol] = ligne[iLine+iCol].replace(reg, "");
		}
			console.log("tableau["+iLineTableau+"] = "+tableau[iLineTableau][0]+" "+tableau[iLineTableau][1]+" "+tableau[iLineTableau][2]+" "+tableau[iLineTableau][3]);
		iLineTableau+=1;	
		iLine+=4;
	}
	console.log("} // PositionSatellite");
	return tableau;
}


function VisibiliteTempsReel(tableau)
{
		console.log("function VisibiliteTempsReel{")
	
	// On recupere le nombre de secondes au sein du jour julien courant.
	// Les secondes fractionees, negatives et les secondes superieurs a une journee sont gerees.
	var seconds = viewer.clock.currentTime.secondsOfDay;
		console.log("seconds = "+seconds);
	
	// On recupere le jour courant en julien.
	// Les jours fractiones sont geres.
	var julianDay = viewer.clock.currentTime.dayNumber;
		console.log("julianDay = "+julianDay);
	
	// On recupere une date julien astronomique (nb de jours depuis le 1er janvier -4712 apres-midi)
	// -julianDayNumber : Nombre de jours entiers;
	// -secondsOfDay : Nombre de secondes au sein du jour julien courant;
	// -timeStandard : Temps standard dans lequel les 2 premiers parametres sont definis.
	var dateViewer = new Cesium.JulianDate(julianDay, seconds, Cesium.TimeStandard.UTC);
		console.log("dateViewer = "+dateViewer);
	
	// On cree un tableau dans lequel on stockera les dates de debut de visibilite.
	var julianDateBeginning = new Array();
		console.log("julianDateBeginning = "+julianDateBeginning);
	
	// 1ere date.
	// Creation d'une nouvelle instance d'une date ISO8601.
	// Prend en parametre une date en chaine de caracteres.
	// Renvoie une date julien.
	julianDateBeginning [0] = Cesium.JulianDate.fromIso8601('2012-03-15T10:00:00Z');
		console.log("julianDateBeginning = "+julianDateBeginning);
	
	// On cree une liste.
	//var difference = new Array;
	var difference=[];
		console.log("difference = "+difference);
	
	// On definit la fin de l'intervalle de temps (1er argument de la derniere ligne du fichier).
	nombre_de_lignes_au_total=tableau.length;
		console.log("nombre_de_lignes_au_total = "+nombre_de_lignes_au_total);
	var maxTemps=tableau[nombre_de_lignes_au_total-1][0];
		console.log("maxTemps = "+maxTemps);
	
	// On definit un pas.
	var pas=maxTemps/(nombre_de_lignes_au_total-3);
		console.log("pas = "+pas);
	
	// On parcourt les lignes du fichier.
	for( var iLine=1 ; iLine<nombre_de_lignes_au_total ; iLine++ )
	{
		// A la date fournie, on ajoute un certain nombre de secondes (intervalle de secondes : pas)
		// -julianDate : date julien fournie;
		// -seconds : nombre de secondes a ajouter (>0) ou a soustraire (si <0);
		// -result : une instance existante a utiliser pour le resultat.
		julianDateBeginning[iLine] = Cesium.JulianDate.addSeconds(julianDateBeginning[iLine-1], pas, new Cesium.JulianDate());
			//console.log("julianDateBeginning["+iLine+"] = "+julianDateBeginning[iLine]);
		
		// On ajoute a la liste la difference en jours entre 2 dates.
		difference.push(Math.abs(Cesium.JulianDate.daysDifference(julianDateBeginning[iLine],dateViewer)));
		//difference[iLine]=(Math.abs(Cesium.JulianDate.daysDifference(julianDateBeginning[iLine],dateViewer)));
			//console.log("difference["+iLine+"] = "+difference[iLine]);
	}
	console.log("difference["+5+"]="+difference[5]);
	console.log("difference["+10+"]="+difference[10]);
	console.log("difference["+15+"]="+difference[15]);
	
	//console.log(difference);
	// On recupere la valeur minimale de la liste et on la stocke dans la variable min.
	//var min = Math.min.apply(null, difference);
	var min = Math.min.apply(null,difference);
		console.log("min = "+min);
	
	// On recupere l'indice de la valeur minimale de la liste.
	// (debut de l'affichage des stations et des satellites : c'est notre temps de reference).
	var position = difference.indexOf(min);
		console.log("position = "+position);
	
	// On recupere le contenu d'un fichier station.
	var ContenuStations = Fichier('../data/Networks_Stations/Network_NEN_ell');
		console.log("ContenuStations = "+ContenuStations);
	
	var iLine2;
	// On initialise 1 nouveau tableau.
	var ligne2 =  new Array;
	// On recupere la taille du fichier.
	var nombre_de_lignes_au_total2=ContenuStations.split(/\n/g).length-1;
		console.log("nombre_de_lignes_au_total2 = "+nombre_de_lignes_au_total2);
		
	var autreTableau=new Array;
	
	// On parcourt les lignes du fichier.
	for( var iLine2=0 ; iLine2<nombre_de_lignes_au_total2 ; iLine2++)
	{
		autreTableau[iLine2]=new Array;
		
		// Dans le tableau de lignes, on insere chaque ligne du fichier.
		ligne2[iLine2]=ContenuStations.split(/\n/g)[iLine2];
			console.log("ligne2[iLine2] = "+ligne2[iLine2]);
		
		// On cree un objet representant une expression rationnelle permettant de reconnaitre
		// un motif au sein d'une chaine de caracteres.
		// - motif : decrit le format de chaine a trouver;
		// -type : decrit le type d'expression reguliere :
		//		+ i:expression analysee indifferemment sur majuscules ou minuscules;
		//		+ g:expression analysee globalement sur l'ensemble de la chaine;
		//		+ gi:les 2.
		var reg=new RegExp("[        ]+", "g");
			console.log("reg = "+reg);
		
		// Dans un autre tableau, on remplit chaque ligne par plusieurs champs separes (plusieurs colonnes).
		//var autreTableau = ligne2[iLine2].split(reg);
		var nouvelleLigne = ligne2[iLine2].split(reg);
			console.log("nouvelleLigne = "+nouvelleLigne);
		
		autreTableau[iLine2][0]=nouvelleLigne[0];
		console.log("autreTableau[iLine2][0] = "+autreTableau[iLine2][0]);
		autreTableau[iLine2][1]=nouvelleLigne[1];
		console.log("autreTableau[iLine2][1] = "+autreTableau[iLine2][1]);
		autreTableau[iLine2][2]=nouvelleLigne[2];
		autreTableau[iLine2][3]=nouvelleLigne[3];
		
		console.log("Taille de tableau :"+tableau.length);
		
		console.log("tableau["+position+"][1]="+tableau[position][1]);
		console.log("tableau["+position+"][2]="+tableau[position][2]);
		console.log("tableau["+position+"][3]="+tableau[position][3]);
		
		
		
		// On appelle la fontion elevation.
		//point(tableau[2],tableau[1],tableau[0],fichier);
		elevation(autreTableau[iLine2][1], autreTableau[iLine2][2], autreTableau[iLine2][3], tableau[position][1], tableau[position][2], tableau[position][3], 5);
	}
	
	// On controle dans la console.
		console.log("dateViewer = "+dateViewer);
		console.log("x: "+tableau[position][1],"y: "+tableau[position][2],"z: "+tableau[position][3]);
	var difference2 = Cesium.JulianDate.daysDifference(dateViewer,julianDateBeginning[1]);
		console.log("difference2 = "+difference2);
		console.log("} // VisibiliteTempsReel");
}

var tableau=PositionSatellite();

// Soit une nouvelle requete.
var req = new XMLHttpRequest();
// On definit les modalites d'envoi de la requete par la methode open :
// -methode de transfert : GET ou POST;
// -url : chemin d'envoi de la requete;
// -flag : true pour un dialogue asynchrone, false Math.sinon.
req.open("GET", "SampleData/GPS.czml", true); 
// On affecte une fonction qui sera executee a chaque "changement d'etat" de l'objet.
req.onreadystatechange = myCode; 
// On envoie la requete.
req.send(null);

function myCode()
{
	//console.log("function myCode(){");
	// Si toutes les donnees sont chargees :
	if (req.readyState == 4)
	{ 
		// No Comprendo
		//var doc = window[req.responseText];
		//console.log(doc);
		//console.log(req.responseTex);
	}
	else
	{
		//console.log("erreur de requete");
	}
	//console.log("} // myCode");
}

myCode();


// Fonction qui determine si un satellite est dans le cone de visibilite d'une station ou pas.
function elevation(LonStation,latStation,hStation,X_GRASP,Y_GRASP,Z_GRASP,angleLim){
		console.log("latStation = "+latStation);
		console.log("LonStation = "+LonStation);
		console.log("hStation = "+hStation);
		console.log("X_GRASP = "+X_GRASP);
		console.log("Y_GRASP = "+Y_GRASP);
		console.log("Z_GRASP = "+Z_GRASP);
		console.log("angleLim = "+angleLim);
	// Definition de l'angle du cone de visibilite du satellite.
	var angleLim=60;
		console.log("angleLim = "+angleLim);
	
	// Constantes pour l'ellipsoide GRS80
	var a = 6378137;
		console.log("a = "+a);
	var e = Math.sqrt(0.0066943800222);
		console.log("e = "+e);
	var W = Math.sqrt (1-Math.pow(e,2)*Math.pow(Math.sin(latStation),2));
		console.log("W = "+W);
	var N = a/W;
		console.log("N = "+N);
	

	// 1) Passage d'un repere geocentrique a un repere local, de centre le station. 

	// On calcule la matrice de changement de repere pour une station.
	var matriceChangementRepere= Math.matrix([[-Math.sin(LonStation),Math.cos(LonStation),0],[-Math.sin(latStation)*Math.cos(LonStation),-Math.sin(latStation)*Math.sin(LonStation),Math.cos(latStation)],[Math.cos(latStation)*Math.cos(LonStation),Math.cos(latStation)*Math.sin(LonStation),Math.sin(latStation)]]);
		console.log("matriceChangementRepere = "+matriceChangementRepere);
	
	// 
	var matriceSat= Math.matrix([[X_GRASP-N*Math.cos(LonStation)*Math.cos(latStation)],
								[Y_GRASP-N*Math.sin(LonStation)*Math.cos(latStation)],
								[Z_GRASP-N*(1-Math.pow(e,2))*Math.sin(latStation)]]);
		console.log("matriceSat = "+matriceSat);

	// On calcule les nouvelles coordonnees du satellite dans le repere local.
	var SatLocal=Math.multiply(matriceChangementRepere,matriceSat);
		console.log("Les coordonnees du satellite dans le repere local sont :"+SatLocal);
	
	// 2) On calcule la distance separant le satellite de la station.
	var Xlocal=Math.subset(SatLocal, Math.index(1));
		console.log("Xlocal = "+Xlocal);
	var Ylocal=Math.subset(SatLocal, Math.index(2));
		console.log("Ylocal = "+Ylocal);
	var Zlocal=Math.subset(SatLocal, Math.index(3));
		console.log("Zlocal = "+Zlocal);
	var Distance= Math.sqrt(Math.pow(Xlocal,2) + Math.pow(Ylocal,2));
		console.log("Distance = "+Distance);
	
	// 3) On calcule l'angle (en degres) entre le satellite et la verticale a la station.
	var angleRadian=Math.acos(Zlocal/Distance)*(180/Math.PI);
		console.log("angleRadian = "+angleRadian);
	
	// 4) Si cet angle est inferieur a l'angle delimitant le cone de visibilite, alors le satellite est visible.
	if(angleDegre<angleLim)
	{
		console.log("angleDegre = "+angleDegre);
	}
	else
	{
		console.log("satellite non visible");
	}
}


