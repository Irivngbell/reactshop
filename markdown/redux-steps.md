# Etapes pour REDUX

1. Installer les librairies nécessaires : `npm i react-redux redux`
2. Installer les librairies nécessaires au fonctionnement des outils redux pour développeurs `npm i redux-thunk redux-devtools-extension`
3. Créer un fichier `store.js` à la racine du client, ce fichier créera un `store` qui contiendra le state de l'application.
```javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Faire fonctionner leqs outils pour développeurs
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // On importe ici le fichier reducers/index.js

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) // Sans cette ligne, les outils redux pour développeurs ne fonctionnent pas.
);

export default store;
```
4. Dans le dossier `src`, créer un dossier `reducers` et un dossier `actions`, les actions modifient les données, les reducers modifient le state.
5. Dans le dossier `actions`, créer un fichier `types.js`, ce fichier ne contient que les types d'actions qu'on va réaliser.
6. Dans le dossier `reducers`, créer un fichier `index.js`, ce fichier servira à combiner nos différents reducers et à créer les states correspondant aux ressources que les reducers gèrent.
```javascript
import { combineReducers } from 'redux';

import articles from './articles'; // Si on a un reducer pour les articles on l'importe

export default combineReducers({  articles }); // Puis on l'ajoute a redux

```


### Exemple pour connecter un composant React avec Redux
1. Créer les types correspondant aux rôles.
2. Connecter le composant CreateRoles.jsx avec REDUX.
3. Faire les action.
4. Faire le reducer.
5. Ajouter le reducer a tous les reducers.
6. Faire les routes dans express.
