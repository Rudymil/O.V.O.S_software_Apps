<?php

"""
this function reads files such as orbite files and create a table
example : CreateTable('C:/Users/Actif/Documents/projetdev_lalanne/data_coulot/Orbits_GALILEO/orbit_GALILEO_PRN01_30s', 'r')
return : $cell_result[i][j]
"""

function CreateTable(file){
	//fichier en php qui lit les fichiers d orbite et les rentre ds un tableau
	$fp = fopen (file,"r");
	while (!feof($fp)){
		//on recupere la ligne en cours
		$line = fgets ($fp, 255);
		//on stocke les elements de la liste ds un tableau temporaire ATTENTION : PRESENCE D ESPACES AU DEBUT DES LIGNES
		$tab = explode(" ", $line );	
		//on supprime les cellules vides
		$tab = array_filter($tab);	
		//on re ajuste la taille du tableau
		$tab = array_values($tab);   
		//on remplit le tableau final cell_result
		$cell_result[]= $tab;
	}
	fclose($fp);
	return $cell_result;
}
?>