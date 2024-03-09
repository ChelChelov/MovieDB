'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          promoBG = document.querySelector('.promo__bg'),
          promoGenre = promoBG.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addingForm = document.querySelector('form.add'),
          addInput = addingForm.querySelector('.adding__input'),
          checkbox = addingForm.querySelector('[type="checkbox"]');

    addingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let newMovie = addInput.value.toUpperCase();
    const favourite = checkbox.checked;

    if (newMovie) {

        if (newMovie.length > 21) {
            newMovie = `${newMovie.substring(0, 22)}...`;
        }

        if (favourite) {
            console.log('Add favourite movie');
        }

        movieDB.movies.push(newMovie);
        sortArr(movieDB.movies);
        createMovieList(movieDB.movies, movieList);
    }

    e.target.reset();
    });
    
    const deleteAdv = (arg) => {
        arg.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        promoGenre.textContent = 'Драма'.toUpperCase();
        promoBG.style.backgroundImage = "url('img/bg.jpg')";
    };

    const sortArr = (arr) => {
        arr.sort();
    };
    
    function createMovieList(movies, parent) {
        parent.innerHTML = '';
        sortArr(movies);
        
        movies.forEach((movie, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">
                ${i + 1}. ${movie}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(movies, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});