let readline = require("readline-sync");
let puissance4 = [];
let nbColonne = 7;
let nbLigne =  6;

const choixCaractere = (joueur) => {
    let txt = "Veuillez choisir le caractere que vous voulez jouer pour " + joueur + " : ";
    return readline.question(txt);

}
let joueur1car = choixCaractere(1);
let joueur2car = choixCaractere(2);





/**
 * Initialiser un talbeau de tableau en fonction d'un nombre de lignes et de colonnes passés en paramètres 
 * @param {Number} nbLigne 
 * @param {Number} nbColonne 
 * @param {*} car 
 */
initialiserTableauVide = (nbRow, nbCol, car) => {
    let tab =[];
    for (let i=0 ; i < nbRow ; i++){
        let ligne = [];
        for (let j=0 ; j<nbCol ; j++){
            ligne.push(car);
        }
        tab.push(ligne);
    }
    return tab;
}



/**
 * Permet d'afficher un tableau de puissance4
 * @param {Array<String>} tab 
 * @param {String} j1car 
 * @param {String} j2car 
 */
afficherPuissance4 = (tab, j1car, j2car) => {
    for(let i=0; i<tab.length; i++){
        let txt = "";
        for(let j =0; j < tab[i].length; j++){
            txt+="| ";
            if(tab[i][j] ===0){
                txt+="_";
            }else if(tab[i][j] ===1){
                txt+= j1car;
            }else if(tab[i][j] ===2){
                txt+= j2car;
            }
            txt+=" |";
        }
        console.log(txt);
    }
}

/**
 * Fonction permettant de saisir une colonne
 */
saisirColonne = () => {
    return parseInt(readline.question("Quelle colonne ? "));
}

/**
 * Fonction permettant de retourner si une cellule est vide ou non (return true / false)
 * @param {Number} ligne 
 * @param {Number} colonne 
 */
verifCaseVide = (ligne, colonne) => {
    return puissance4[ligne][colonne-1] === 0;

}

/**
 * Fonction permettant de retourner la première ligne vide d'une colonne 
 * @param {Number} col retourne -1 si la colonne est pleine
 */
retournerLigneCaseVideColonne =  (col) => {
    for(let i=nbLigne-1 ; i>=0 ; i--){
        if(verifCaseVide(i,col)) return i;
    }
    return -1;

}

/**
 * Fonction permettant de savoir si un joueur a gagné sur une ligne
 * @param {Number} joueur 
 */
verificationLigneFinJeu = (joueur) => {
    for(let i = nbLigne-1 ; i >=0 ; i--){
        for(let j =0 ; j<nbColonne-3 ; j++){
            if( puissance4[i][j] === joueur &&
                puissance4[i][j+1] === joueur &&
                puissance4[i][j+2] === joueur &&
                puissance4[i][j+3] === joueur 
                )return true;
                
        }
    }
    return false;
}

/**
 * Fonction permettant de vérifier si le joueur a gagné en colonne
 * @param {Number} joueur 
 */
verificationColonneFinJeu = (joueur) => {
    for(let i=0 ; i<nbColonne ; i++){
        for(let j=nbLigne-4; j>=0 ; j--){
            if( puissance4[j][i] === joueur &&
                puissance4[j+1][i] === joueur &&
                puissance4[j+2][i] === joueur &&
                puissance4[j+3][i] === joueur 
                )return true;
                

        }
    }
    
}

/**
 * Fonction permettant de savoir si un joueur a gagné en diagonale
 * @param {Number} joueur 
 */
verificationDiagonaleFinJeu = (joueur) => {
    for(let i = nbLigne-1 ; i>3 ; i--){
        for(let j =0 ; j<nbColonne ; j++){
            if( puissance4[i][j] === joueur &&
                puissance4[i-1][j+1] === joueur &&
                puissance4[i-2][j+2] === joueur &&
                puissance4[i-3][j+3] === joueur 
                ) return true;

                if( puissance4[i][j] === joueur &&
                    puissance4[i-1][j-1] === joueur &&
                    puissance4[i-2][j-2] === joueur &&
                    puissance4[i-3][j-3] === joueur 
                    ) return true;
                
        }
    }
    return false; 
    
}

/**
 * Fonction permettant de vérifier si un joueur a gagné (en ligne, colonne ou diagonale)
 * @param {Number} joueur 
 */
verificationFinJeu = (joueur) => {
   if(verificationLigneFinJeu(joueur) || verificationColonneFinJeu(joueur) || verificationDiagonaleFinJeu(joueur)){
       return true;
   }
    return false;


}

/**
 * Permet à un joueur de jouer une case
 * Retourne true si le joueur a gagné 
 * @param {Number} joueur 
 */
jouerCase = (joueur) => {
    let ligneVide = -1;
    let colonne = -1;
    while(ligneVide ===-1 || colonne <= 0 || colonne>7){
        console.log("Choisir une colonne à un emplacement vide")
        colonne = saisirColonne ();
        ligneVide = retournerLigneCaseVideColonne(colonne);
    }
    puissance4[ligneVide][colonne-1] = joueur;
    afficherPuissance4(puissance4,joueur1car,joueur2car);
    return verificationFinJeu(joueur);

}

intro = () => {
    let txt = "*****************************\n";
    txt+= "Bienvenue sur puissance 4\n";
    txt+="*****************************\n";
    console.log(txt);
}




intro();
puissance4 = initialiserTableauVide(nbLigne, nbColonne,0);
afficherPuissance4(puissance4, joueur1car,joueur2car); 


while(true){
    if(jouerCase(1)){
        console.log("Joueur 1 a gagné");
        break;
    }
    if(jouerCase(2)){
        console.log("Joueur 2 a gagné");
        break;
    }
}