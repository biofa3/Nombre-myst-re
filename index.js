/*const nombreSecret = 6;
let tentative = 0;
const input = document.getElementById("input");
const bouton = document.getElementById("btn");
tentative = parseInt(input);
while (tentative !== nombreSecret) {
  document.writeln(" nombre que vous avez entré est incorrect !");
  tentative = parseInt(prompt(input));
}
document.writeln(
  "Bravo ! Vous avez trouvé, le nombre secret était " + nombreSecret
);
*/

// Sélection des éléments DOM nécessaires
const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("btn");
const reponseElement = document.getElementById("reponse");

// 1. Générer le nombre mystère (entre 1 et 10 inclus)
// Math.random() génère un nombre entre 0 (inclus) et 1 (exclus).
// Multiplier par 10 donne un nombre entre 0 et 9.99...
// Math.floor() l'arrondit à l'entier inférieur (0 à 9).
// Ajouter 1 donne un nombre entre 1 et 10.
let nombreMystere = Math.floor(Math.random() * 10) + 1;

// Vous pouvez décommenter la ligne suivante pour connaître le nombre mystère pour le test
// console.log("Le nombre mystère est : " + nombreMystere);

// Variable pour suivre le nombre d'essais (optionnel mais utile)
let nombreEssais = 0;

// Fonction principale appelée lors du clic sur le bouton
function verifierProposition() {
  // Récupérer la valeur entrée par l'utilisateur et la convertir en nombre entier
  const propositionUtilisateur = parseInt(inputElement.value);

  // Incrémenter le compteur d'essais
  nombreEssais++;

  // Vérification de la validité de l'entrée
  if (
    isNaN(propositionUtilisateur) ||
    propositionUtilisateur < 1 ||
    propositionUtilisateur > 10
  ) {
    reponseElement.textContent =
      "❌ Veuillez entrer un nombre **valide** entre 1 et 10.";
    reponseElement.style.color = "orange";
    return; // Arrêter l'exécution de la fonction si l'entrée est invalide
  }

  // 3. Comparer la proposition avec le nombre mystère
  if (propositionUtilisateur === nombreMystere) {
    // C'est la bonne réponse !
    reponseElement.textContent = `🥳 BRAVO ! Vous avez trouvé le nombre mystère (${nombreMystere}) en ${nombreEssais} essais !`;
    reponseElement.style.color = "green";

    // Désactiver l'input et le bouton après avoir gagné
    inputElement.disabled = true;
    buttonElement.disabled = true;

    // Proposer de rejouer (facultatif : créer un nouveau bouton ou recharger la page)
    // Pour cet exemple, on peut juste proposer un rechargement
    setTimeout(() => {
      if (confirm("Voulez-vous rejouer ?")) {
        window.location.reload();
      }
    }, 3000); // Demande après 3 secondes
  } else if (propositionUtilisateur < nombreMystere) {
    // Le nombre mystère est plus grand
    reponseElement.textContent = `⬇️ Votre proposition (${propositionUtilisateur}) est trop **petite** ! Essai n°${nombreEssais}.`;
    reponseElement.style.color = "red";
  } else {
    // Le nombre mystère est plus petit
    reponseElement.textContent = `⬆️ Votre proposition (${propositionUtilisateur}) est trop **grande** ! Essai n°${nombreEssais}.`;
    reponseElement.style.color = "red";
  }

  // Effacer le champ d'entrée après la soumission pour faciliter la prochaine entrée
  inputElement.value = "";
  inputElement.focus(); // Rendre le focus à l'input
}

// 2. Attacher la fonction à l'événement 'click' du bouton
buttonElement.addEventListener("click", verifierProposition);

// BONUS : Permettre de valider en appuyant sur 'Entrée' dans le champ input
inputElement.addEventListener("keypress", function (e) {
  // Le code de la touche 'Entrée' (ou 'Enter') est 13 ou 'Enter'
  if (e.key === "Enter") {
    verifierProposition();
  }
});
