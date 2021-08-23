# Créer un serveur avec nodejs.

---

1. Tapez `npm init` et répondre aux questions.
2. Créer un fichier `index.js` (le nom du fichier doit correspondre à la clé main dans `package.json`).
3. On importe `express` et on crée une application avec `express()`.
4. Si on veut gérer le format JSON : il faut le spécifier ainsi : `app.use(express.json({limit: '10mb', extended: false}))`. Les options limit et extended sont là à titre d'exemple : Lisez la doc et modifiez-les selon vos besoins.
5. Créer un script npm start dans `package.json`.
6. On install nodemon : `npm install --save-dev nodemon` ou `npm i -D nodemon`.
7. On crée un script pour se servir de `nodemon`.
8. On installe la librairie `dotenv`.
9. On crée un fichier `.env` (CE FICHIER NE DOIT JAMAIS ETRE PARTAGE).
10. Crée un fichier `.gitignore` et mettre dedans ce que voue voulez ignorer.
11. Ensuite on peut faire `git init`.
12. Créer un dossier routes.
13. Dans le dossier routes : créer un dossier api.
14. Dans le dossier api : créer un dossier users.
15. Dans `index.js` : on peut commencer le routing.
16. Dans le dossier route/api/users : On peut créer les routes et envoyer des réponses.
    
## Installer React et faire communiquer le backend et le frontend.

16. Clone du repo blog. (ou `npx create-react-app` pour les app nouvelles).
17. Faire cd vers le dossier client et faire `npm install`.
18. Revenir dans le dossier 'root' : racine de l'application.
18. Installer concurrently : `npm i -D concurrently` ou `npm install --save-dev concurrently`.
19. On écrit les scripts pour que `concurrently` fonctionne.
20. Penser à la clé proxy dans `package.json` du client (app react).
    
## Créer le repo

21. Créer un README.md bien précis et documenté.
22. Créer un repo git et l'envoyer sur github. (Choix URL : `git@github.com:<userName>/<repoName>.git`)
23. **_Penser à faire des petits commit et push très souvent pour identifier les bugs et problèmes plus rapidement et au cas ou un désastre se produit avec l'ordinateur, on ne perd pas beaucoup de travail_**.


## Installation de mongoose
23. `npm install mongoose` dans le dossier racine de votre api.
24. Créer la connection à la base de données.

## Installation de bcrypjs
25. `npm i bcryptjs`
26. Gérer les mots de passe avec les méthodes **salt, hash et compare**

## Gestion des routes (client)
27. Implémentation des routes publiques et privées. (utilisateur authentifié ou pas)
28. Mise en place d'un dashboard.


## Sécurité sur le serveur
29. Installer des validateurs : `npm i express-validator`
30. Les points importants de la validation : le .escape() pour convertir le HTML. Ne surtout pas l'oublier !!

## Sécurité sur le client
31. Installer la librairie DOMPurify `npm i dompurify`
32. Utiliser la méthode `DOMPURIFY.sanitze(html)` pour nettoyer les HTML que vous souhaitez afficher.

---

# Création des JSONWEBTOKEN
1. `npm install jsonwebtoken`.
2. Création d'un token : On a besoin de quelques infos de l'utilisateur : payload.
    1. Importer jwt.
    2. La méthode : jwt.sign(payload, expiresAt, callback(err, token));
3. Vérification de la validité du token dans un middleware.
    1. jwt.verify(token, secretKey);
    2. Cette méthode décode le token et permet d'accéder aux informations contenues dans le token.

---

# Créer une base de données mongoDB
1. Ouvrir Compass.
2. On crée une base de données plus une collection.
3. On switch sur la nouvelle base de données avec `mongoSH` (le terminal en bas dans compass) : `use <dbName>`.
4. Vous exécutez la command `db.createUser({ <options> })`.
5. Vous redémarrez Compass.
6. On teste la string de connexion dans Compass : `mongodb://<user>:<password>@localhost:27017/<dbName>`
7. Si ça marche : on est OK, Sinon on reprend depuis 5.

---

# Gestion des resources (CRUD, API RESTful)
1. Sur l'api, on crée les dossiers qui vont servir à gérer les ressources.
2. Sur le client, on crée une route et un composant qui représente ces ressources.
   - On a besoin d'un formulaire et / ou d'un identifiant pour gérer les resource.
   - Pour créer une ressource : un formulaire.
   - Pour mettre à jour une ressource : un formulaire et un identifiant.
   - Pour effacer une ressource : un identifiant.
   - Pour lire / afficher une ressource : un identifiant.
   - Pour lire / afficher toutes les données liées à une ressource : nom de la ressource.
3. Quand on commence à gérer une resource, on la finit.



### Exemple des étapes pour gérer les catégories :
1. Client
   - [x] On crée une route pour accéder à la page de gestion des catégories.
   - [x] On crée un composant qui contient un formulaire de création d'une catégorie.
   - [x] On crée un formulaire de mise à jour des catégories. (?).
   - [x] On crée un formulaire pour effacer une catégorie (? pour les articles appartenant à cette catégorie, automatiquement dans les archives (par défaut)).

2. Serveur
   - [x] On crée une route et une fonction qui sert à créer la catégorie.
   - [x] On crée une route et une fonction qui sert à mettre à jour la catégorie.
   - [x] On crée une route et une fonction qui sert effacer catégorie.
   - [x] On crée une route et une fonction qui sert récupérer la catégorie.
   - [x] On crée une route et une fonction qui sert à récupérer toutes les catégories.



### Afficher les catégories

1. [x] Faire une requête pour aller chercher les catégories en BDD.
2. [x] Quand on reçoit la réponse : on affiche les catégories.
3. [x] Quand on clique sur une catégorie, on remplit le formulaire automatiquement.
4. [x] Quand on submit le form, on met à jour la catégorie.
5. [x] On gère la réponse du serveur.

1. [x] Pour chaque catégorie, un bouton supprimer.
2. [x] Quand on clique sur le bouton, on efface la catégorie après confirmation.



### Exemple des étapes pour gérer les articles :

#### Dans React
- [x] Créer un formulaire (composant React) dans le client.
- [x] Ce composant contient les fonctions suivantes :
- [x] Une fonction pour gérer les inputs (onChange) (title input, body textarea).
- [x] Une fonction pour envoyer les données vers le serveur (onSubmit).
- [x] State : Un state pour les données du formulaire.


#### Sur le serveur 
- [x] Créer une route dans le fichier index.js (racine du serveur).
- [x] Créer le fichier correspondant à la route.
- [x] Valider la validité les requêtes avec exress-validator.
- [x] Pouvoir enregistrer un article dans la BDD avec ce fichier.


