function generateFeedback() {
  // Récupérer les scores et les commentaires
  const fonctionnalite = parseFloat(
    document.getElementById("fonctionnalite").value,
  );
  const comment_fonctionnalite = document
    .getElementById("comment_fonctionnalite")
    .value.trim();

  const tableau = parseFloat(document.getElementById("tableau").value);
  const comment_tableau = document
    .getElementById("comment_tableau")
    .value.trim();

  const cartes = parseFloat(document.getElementById("cartes").value);
  const comment_cartes = document.getElementById("comment_cartes").value.trim();

  const visuel = parseFloat(document.getElementById("visuel").value);
  const comment_visuel = document.getElementById("comment_visuel").value.trim();

  const video = parseFloat(document.getElementById("video").value);
  const comment_video = document.getElementById("comment_video").value.trim();

  const qualite = parseFloat(document.getElementById("qualite").value);
  const comment_qualite = document
    .getElementById("comment_qualite")
    .value.trim();

  const comment_final = document.getElementById("comment_final").value.trim();

  // Validation des entrées
  const errors = [];

  if (isNaN(fonctionnalite))
    errors.push("Veuillez entrer une valeur numérique pour la fonctionnalité.");
  if (isNaN(tableau))
    errors.push(
      "Veuillez entrer une valeur numérique pour la présentation du tableau.",
    );
  if (isNaN(cartes))
    errors.push(
      "Veuillez entrer une valeur numérique pour l'affichage des cartes explicatives.",
    );
  if (isNaN(visuel))
    errors.push("Veuillez entrer une valeur numérique pour le visuel général.");
  if (isNaN(video))
    errors.push("Veuillez entrer une valeur numérique pour la vidéo.");
  if (isNaN(qualite))
    errors.push(
      "Veuillez entrer une valeur numérique pour la qualité du code.",
    );

  if (fonctionnalite > 40)
    errors.push("La fonctionnalité ne peut pas dépasser 40 points.");
  if (tableau > 15)
    errors.push("La présentation du tableau ne peut pas dépasser 15 points.");
  if (cartes > 10)
    errors.push(
      "L'affichage des cartes explicatives ne peut pas dépasser 10 points.",
    );
  if (visuel > 20)
    errors.push("Le visuel général ne peut pas dépasser 20 points.");
  if (video > 5) errors.push("La vidéo ne peut pas dépasser 5 points.");
  if (qualite > 10)
    errors.push("La qualité du code ne peut pas dépasser 10 points.");

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  // Calcul du total
  const total = fonctionnalite + tableau + cartes + visuel + video + qualite;

  // Génération du contenu HTML du feedback
  const feedbackHTML = `
        <h3>Évaluation Détailée: </h3>
        <p><strong>Fonctionnalité du formulaire de conversion :</strong> ${fonctionnalite} / 40</p>
        ${comment_fonctionnalite ? `<p><em>Commentaires :</em> ${escapeHTML(comment_fonctionnalite)}</p>` : ""}
        
        <p><strong>Présentation du tableau :</strong> ${tableau} / 15</p>
        ${comment_tableau ? `<p><em>Commentaires :</em> ${escapeHTML(comment_tableau)}</p>` : ""}
        
        <p><strong>Affichage des cartes explicatives :</strong> ${cartes} / 10</p>
        ${comment_cartes ? `<p><em>Commentaires :</em> ${escapeHTML(comment_cartes)}</p>` : ""}
        
        <p><strong>Visuel général, Responsiveness :</strong> ${visuel} / 20</p>
        ${comment_visuel ? `<p><em>Commentaires :</em> ${escapeHTML(comment_visuel)}</p>` : ""}
        
        <p><strong>Vidéo :</strong> ${video} / 5</p>
        ${comment_video ? `<p><em>Commentaires :</em> ${escapeHTML(comment_video)}</p>` : ""}
        
        <p><strong>Qualité du code :</strong> ${qualite} / 10</p>
        ${comment_qualite ? `<p><em>Commentaires :</em> ${escapeHTML(comment_qualite)}</p>` : ""}
        
        <h3>${comment_final ? `<p>Commentaires : ${escapeHTML(comment_final)}</p>` : ""}</h3>
        
        <h3>Total : ${total} / 100</h3>
    `;

  // Affichage du feedback
  document.getElementById("feedbackContent").innerHTML = feedbackHTML;
  document.getElementById("result").style.display = "block";
}

function downloadHTML() {
  const group_name = document.getElementById("name").value.trim();
  const feedbackHTML = document.getElementById("feedbackContent").innerHTML;
  const fullHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Feedback de Correction</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h2 { color: darkred; }
        h3 { color: #19437D; }
        p { line-height: 1.6; }
        em { color: darkgreen; }
    </style>
</head>
<body>
    <h2>Feedback pour Groupe ${group_name}</h2>
    ${feedbackHTML}
</body>
</html>
    `;

  const blob = new Blob([fullHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `group_${group_name}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// Fonction pour échapper les caractères HTML afin d'éviter les injections
function escapeHTML(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
