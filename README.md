# Authentication
https://auth-beige.vercel.app/

npm install 

Server is on localhost ;--
</br>
Api are on localhost:--
</br>
npm i
</br>
npm start ;--- to run the server:-


Frontend :-
npm i  </br>
npm run dev


const url = require('url');

const playStoreLink = 'https://play.google.com/store/apps/details?id=com.supercell.brawlstars';

const gameUrl = url.parse(playStoreLink);

const gameId = gameUrl.query.split('=')[1];

console.log(gameId); // Output: com.supercell.brawlstars
