import './styles.scss';
import { movies } from './src/data';

const app = document.getElementById('app');

app.innerHTML += '<header></header>';
const header = document.querySelector('header');
header.innerHTML = '<h1 class="site-title"> HackerFlix </h1>';

const popUpDiv = document.createElement('div');
popUpDiv.className = 'popup-div';

app.innerHTML += '<section class="fluid-container d-flex flex-wrap movie-section"></section>';
const movieSection = document.querySelector('section.movie-section');

// AFFICHER CARDS DES FILMS + BTN TRI

for (let i = 0; i < movies.length; i++) {
  movieSection.innerHTML += `
          <div class="movie-heart"> 
            <i class="far fa-heart"></i>
            <div class="movie-card movie-${i}" style="background-image:url('posters/${(movies[i].img) ? `./${movies[i].imdb}.jpg` : ''}')">
              <h3> ${(movies[i].img) ? '' : `${movies[i].title}`} </h3>
            </div>
          </div>
    `;
}

// CLICK COEUR -> FAVORI

const heartBtn = document.querySelectorAll('i.far.fa-heart');
for (let i = 0; i < heartBtn.length; i++) {
  heartBtn[i].addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target);
    e.classList.toggle('fas');
    e.classList.toggle('far');
    console.log('button click');
  });
}

for (const btn of heartBtn) {
  console.log(btn);
  btn.addEventListener('click', (e) => {
    alert('toto');
  });
}

movieSection.innerHTML += '<button class="btn-new">Show Recent Movies Only</button>';
const btnNew = document.querySelector('button.btn-new');

// POPUP FILMS

const movieCards = document.querySelectorAll('div.movie-card');

const showMovieInfo = (i) => {
  const popMovie = `
        <div class="pop-up col-sm-12 col-md-6">
          <i class="close-pop fas fa-times-circle"></i>
          <h3> Titre : ${movies[i].title} </h3>
          <p> Genres : ${movies[i].genres} </p>
          <p> Année de sortie : ${movies[i].year} </p>
          <p> Note : ${movies[i].note} </p>
          <h4> Résumé : </h4>
          <p> ${movies[i].plot} </p>
        `;
  popUpDiv.innerHTML = popMovie;
  movieSection.appendChild(popUpDiv);
  const popUpDisplay = document.querySelector('div.pop-up');
  const closePop = document.querySelector('i.close-pop');
  closePop.addEventListener('click', () => {
    popUpDisplay.remove();
  });
};

// AFFICHER LES POP UP AU CLICK

for (let i = 0; i < movieCards.length; i++) {
  movieCards[i].addEventListener('click', (e) => {
    e.stopPropagation();
    showMovieInfo(i);
  });
}

// TRI RECENT MOVIES

btnNew.addEventListener('click', () => {
  if (btnNew.textContent === 'Show Recent Movies Only') {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].year <= 2000) {
        movieCards[i].style.display = 'none';
        btnNew.textContent = 'Show All';
      }
    }
  } else if (btnNew.textContent === 'Show All') {
    for (let i = 0; i < movies.length; i++) {
      movieCards[i].style.display = 'block';
      btnNew.textContent = 'Show Recent Movies Only';
    }
  }
});
