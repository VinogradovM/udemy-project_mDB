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
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');



    //Создаю обработчик событий 
    addForm.addEventListener('submit', (event) => {

        //останавливает действия браузера по умолчанию(обновление страницы)
        event.preventDefault();

        //проверка того что пользователь ввел
        let newFilm = addInput.value;

        // проверка чекбокса
        const favorite = checkbox.checked;


        if (newFilm) {
            //провека того сколько символов ввел пользователь

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 19)}...`;
            }

            //проверка чекбокса
            if (favorite){
                console.log('Добавляем любимый фильм');
            }

            // помещаю фильм который пользователь ввел в базу данных
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        //сбросить форму
        event.target.reset();
    });


    //Удаление рекламы
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };


    const makeChanges = () => {
         //Изменение жанра
        genre.textContent = 'драма';

         //Изменение background
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };


    //Сортировка по алфавиту
    const sortArr = (arr) => {
        arr.sort();
    };

    //Создаю список фильмов на странице на основе базы данных с нумерацией
    function createMovieList(films, parent) {

        //очистка родительского элемента
        parent.innerHTML = "";

        sortArr(films);

        films.forEach((film, i) =>{
            movieList.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) =>{
            btn.addEventListener('click', () =>{
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);

            })
        });
    }

    deleteAdv(adv);
    makeChanges();
    sortArr(movieDB.movies);
    createMovieList(movieDB.movies, movieList);





    
});