// Fonction permettant d'inclure un fichier javascript dans un autre fichier javascript
function include(fileName)
{
	document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
}

//include('affichage.js');

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

var socket = io.connect('http://localhost:8080');
socket.on('czml_grasp', function(czml_grasp)
{
	socket.on('czml_gps', function(czml_gps)
	{
		//alert('Le serveur a un message pour vous : ' + czml_gps);
		
		// Fonction qui cree un tableau de 4 colonnes et plein de lignes à partir de l'attribut coord du czml.
		function conver_tab(json,pos)
		{ 
			// On parse le json.
			var jsonParse = JSON.parse(json);
			// Taille du json.
			var len = jsonParse.length;
			// On cree un tableau de coordonnees cartesiennes.
			// On a un tableau de la forme : [t0,x0,y0,z0,t1,x1,y1,z1...].
			var coord = jsonParse[pos].position.cartesian;
			// On cree un nouveau tableau.
			var new_coord = [];
				
			var compt = 0;
			var iLineNew=0;
			var iLineCoord=0;
			
			// On va creer un tableau avec les 4 coordonnees d'un point sur une ligne.
			// Tant qu'on n'a pas parcouru tout le tableau de coordonnees :
			while(iLineCoord<coord.length)
			{
				//console.log("taille : " + coord.length);
				new_coord[iLineNew] = new Array(4);
				new_coord[iLineNew][0] = coord[iLineCoord];
				new_coord[iLineNew][1] = coord[iLineCoord+1];
				new_coord[iLineNew][2] = coord[iLineCoord+2];
				new_coord[iLineNew][3] = coord[iLineCoord+3];
				iLineCoord = iLineCoord + 4;
				iLineNew = iLineNew + 1;
			}
			// On controle le tableau dans la console.
			console.log(new_coord);
			return new_coord;
		}	
					
		function visibilite_gps(json1,json2)
		{
			
			/*------------ ETAPE1: Recuperation des coordonnees à chaque instant t ----------*/

			// On parse les json 
				// GRASP
			var jsonParse1 = JSON.parse(json1);
				// GPS
			var jsonParse2 = JSON.parse(json2);
			
			// Taille du json
			var len1 = jsonParse1.length;
			var len2 = jsonParse2.length;
				
			// On controle dans la console.
			console.log("debut");
		
			//creation du tableau contenant la position de GRASP
			grasp=conver_tab(json1,len1-1);
				
			// Creation du tableau contenant la position des satellites GPS.
			//for(var i=2;i<len2;i++){ // On ne prend pas les éléments situés à la position 0 et 1
			for (var i=2;i<3;i++)
			{
				var gps=new Array();
				gps[i]= new Array(); 
				//for (var i=2;i<len2;i++){
				for (var i=2;i<3;i++)
				{
					gps[i-2]=conver_tab(json2,i);
					//console.log("convet gps");
				}
			}
				
			/*.... recupération du temps t de la clock... */	
		
			// On recupere les secondes du jour courant.
			var seconds = viewer.clock.currentTime.secondsOfDay;
			// On recupere le jour courant.
			var julianDay = viewer.clock.currentTime.dayNumber;
			// On etablit une date.
			var dateViewer = new Cesium.JulianDate(julianDay, seconds, Cesium.TimeStandard.UTC);
			
			// On cree un nouveau tableau de dates.
			var julianDateBeginning = new Array();
			
			// 1ere date.
			// Creation d'une nouvelle instance d'une date ISO8601.
			// Prend en parametre une date en chaine de caracteres.
			// Renvoie une date julien.
			julianDateBeginning [0] = Cesium.JulianDate.fromIso8601('2012-03-15T10:00:00Z');
				
			// On cree une liste.
			var difference = [];
			
			// On definit la fin de l'intervalle de temps (1er argument de la derniere ligne du fichier).
			var maxTemps=grasp[grasp.length-1][0];
			
			// On definit un pas.
			var pas=maxTemps/(grasp.length-3);
			
			// On parcourt les lignes du fichier.
			for( var i=1 ; i<grasp.length+1 ; i++)
			{
				// A la date fournie, on ajoute un certain nombre de secondes (intervalle de secondes : pas)
				// -julianDate : date julien fournie;
				// -seconds : nombre de secondes a ajouter (>0) ou a soustraire (si <0);
				// -result : une instance existante a utiliser pour le resultat.
				julianDateBeginning[i] = Cesium.JulianDate.addSeconds(julianDateBeginning[i-1], pas, new Cesium.JulianDate());
				
				// On ajoute a la liste la difference en jours entre 2 dates.
				difference.push(Math.abs(Cesium.JulianDate.daysDifference(julianDateBeginning[i],dateViewer)));
			}
			
			// On recupere la valeur minimale de la liste et on la stocke dans la variable t.
			var t = Math.min.apply(null, difference);

			// On recupere l'indice de la valeur minimale de la liste.
			var position = difference.indexOf(t);
			
			// On controle les resultats dans la console.
			console.log('temps : ',t);
			console.log('position : ',position);
			
			// On recupere les coordonnees dans le tableau cree pour GRASP avec conver_tab.
			x_grasp=grasp[position][1];
			y_grasp=grasp[position][2];
			z_grasp=grasp[position][3];
				
			// On controle.
			console.log('xgrasp',x_grasp);
			console.log('ygrasp',y_grasp);
			console.log('zgrasp',z_grasp);
			
			// // On recupere les coordonnees dans le tableau cree pour le GPS.
			x_gps=gps[0][position][1];
			y_gps=gps[0][position][2];
			z_gps=gps[0][position][3];
				
			// On controle.
			console.log('xgps',x_gps);
			console.log('ygps',y_gps);
			console.log('zgps',z_gps);
	
			//.... TEST: recupération des coordonnées à un temps t fixé ...		
	
			/*var t; 
			t=210; //exemple 
			
			var l=-1;
			for (var i=0; i<grasp.length; i++){
				for (var j=0; j<grasp[i].length; j++){
					if (grasp[i][j]==t){
						l=i;
						console.log("t trouvé dans grasp");
					}
				}
			}
			
			x_grasp=grasp[l][1];
			y_grasp=grasp[l][2];
			z_grasp=grasp[l][3];
					
			l2=new Array();
			//for (var i=0;i<len2-2;i++){
			for(var i=0 ; i<1 ; i++){ 
				for(var j=0 ; j<gps[i].length ; j++){
					if(gps[i][j][0]==t){
						l2[i]=j; // tableau donnant l'indice de la ligne ou se trouve t pour chaque gps. Par ex, t se trouvera à la ligne l2[0] pour le gps[0], l2[1] pour le gps[1]
						console.log("t trouvé dans gps");
						continue;
					}
				}
			}
			var ind2=l2[0];
			x_gps=gps[0][ind2][1];
			y_gps=gps[0][ind2][2];
			z_gps=gps[0][ind2][3];

			console.log('x_gps',x_gps);
			console.log('y_gps',y_gps);
			console.log('z_gps',z_gps);
	
		
			
			/*--------------- ETAPE 2: recupération des vitesses à partir du fichier d'orbite ------------- */
			
			/*var fichier='Networks_Stations/orbit_GRASP_scenario_1.txt';
			var Contenu = Fichier(fichier);	
			var vgrasp = new Array();
			var ligne =  new Array;
			var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
			// On stocke le fichier dans un tableau 
			for (var i=0;i<nombre_de_lignes_au_total;i++) {	
			ligne[i]=Contenu.split(/\n/g)[i]
			vgrasp[i] = ligne[i].split(' ');		
			}*/
			
			var fichier2 = 'Networks_Stations/orbit_GPS_PRN32_30s.txt';
			var Contenu = Fichier(fichier2);	
			
			// On cree un tableau contenant les coordonnées et les vitesses du GPS.
			var vgps = new Array(); 
			var ligne2 = new Array;
			var nombre_de_lignes_au_total = Contenu.split(/\n/g).length;
			// On stocke le fichier dans un tableau 
			for( var i=0 ; i<nombre_de_lignes_au_total ; i++ )
			{	
				ligne2[i] = Contenu.split(/\n/g)[i]
				var reg = new RegExp("[        ]+", "g");
				vgps[i] = ligne2[i].split(reg);		
			}
					
			// On cherche la vitesse correspondant à la position trouvee dans le czml.
			var vx = 0;
			var vy = 0;
			var vz = 0;
			for( var i=0 ; i<nombre_de_lignes_au_total ; i++ )
			{
				// Si on retrouve x dans le tableau issu du fichier, alors on prend les vitesses de cette ligne
				if(x_gps==vgps[i][2])
				{ 
					vx=vgps[i][5];
					vy=vgps[i][6];
					vz=vgps[i][7];
				}
			}

			/*-----------ETAPE 2: changement de systeme-------------*/

			// Soit la matrice de passage
			M = new Array(); 
			M[0] = new Array();
			M[1] = new Array();
			M[2] = new Array();
			
			n1 = norme(x_gps,y_gps,z_gps);
			
			var v = new Array();
			v = vect2(vx,vy,vz,x_gps,y_gps,z_gps);
			console.log(v[1]);
			console.log(v[2]);
			console.log(v[3]);
			
			n2=norme(v[1],v[2],v[3]);
			console.log('n2',n2);
				
			M[0][0] = x_gps/n1;
			M[0][1] = y_gps/n1;
			M[0][2] = z_gps/n1;
			M[1][0] = v[1]/n2;
			M[1][1] = v[2]/n2;
			M[1][2] = v[3]/n2;
				
			v2 = new Array();
			v2 = vect2(M[1][0],M[1][1],M[1][2],M[0][0],M[0][1],M[0][2]);
			M[2][0] = v2[1];
			M[2][1] = v2[2];
			M[2][2] = v2[3];	
			
			//Nouvelles coordonnées, dans le système orbital du GPS
			var x_nouv = x_grasp*M[0][0]+y_grasp*M[0][1]+z_grasp*M[0][2];
			var y_nouv = x_grasp*M[1][0]+y_grasp*M[1][1]+z_grasp*M[1][2];
			var z_nouv = x_grasp*M[2][0]+y_grasp*M[2][1]+z_grasp*M[2][2];
				
			console.log(vect(0,vy,0,0,y_gps,0,Math.PI/2));
				
			elev=elevationGPS(x_gps,y_gps,z_gps,x_nouv,y_nouv,z_nouv);
			console.log('elevation',elev);
				
			if( elev < 17 && elev > (-17))
			{
				console.log("GPS visible");
			}
			else
			{
				console.log("satellite non visible");
			}

			console.log("fin");
		
		} // visibilite_gps()
						
		window.setInterval(function()
		{
			visibilite_gps(czml_grasp,czml_gps);
		},1000);
		
	})//socket.on
})//socket.on

/*------------ FONCTIONS ANNEXES---------------*/	

function elevationGPS(XGPS ,YGPS, ZGPS, X_GRASP, Y_GRASP, Z_GRASP)
{

    deltaEst = X_GRASP - XGPS;
    deltaNord = Y_GRASP - YGPS;
    deltah = Z_GRASP - ZGPS;

    var r = Math.sqrt(Math.pow(deltaEst,2)+Math.pow(deltaNord,2));

    angle = Math.atan(deltah/r);

    angle = angle*(180/Math.PI);

    return angle;
	
}

// Fonction qui calcule la norme d'un vecteur.
function norme(x,y,z)
{
	norme = Math.sqrt(x*x+y*y+z*z);
	return norme;
}

/*function vect(x1,y1,z1,x2,y2,z2,theta){
	res=norme(x1,y1,z1)*norme(x2,y2,z2)*Math.sin(theta);
	return res;
}*/	

// Fonction qui calcule un produit vectoriel.
function vect2(x1,y1,z1,x2,y2,z2)
{
	var new_vector=new Array();
	new_vector[1]=y1*z2+z1*y2;
	new_vector[2]=z1*x2+x1*z2;
	new_vector[3]=x1*y2+y1*x2;
	return new_vector;
}