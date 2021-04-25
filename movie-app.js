$('document').ready(async () => {
//search external db and display information

    $('.movie-btn').click(async () => {
        let searchMovie = $('.movie-search').val().toString();
        `http://www.omdbapi.com/?i=tt3896198&apikey=ecfa4132&t=${searchMovie}`
        let searchData = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=ecfa4132&t=${searchMovie}`);
        let searchResponse = await searchData.json();
        console.log(searchResponse);
        console.log(searchResponse.Title);
        $('.carousel-inner').append(`
        <div class="carousel-item">
        <div class="d-block w-100 movieCard">
            <img src="${searchResponse.Poster}">
            <p><h1 class="rating-movieTitle">${searchResponse.Title}</h1>${searchResponse.Rating}/5</p>
            <p class="director"><p>Directed by: </p>${searchResponse.Director}</p>
            <p class="actors"><p>Starring: </p>${searchResponse.Actors}</p>
            <p>Synopsis</p>
            <p class="movieDescription">${searchResponse.Plot}</p>

        </div>
        </div>
        `)
    });
//submit button to add edit movie info

    $("#newMovieButton").click(async function (event) {
        event.preventDefault();

        let data = {
            actors: $('#newMovieActors').val(),
            director: $('#newMovieDirector').val(),
            plot: $('#newMoviePlot').val(),
            genre: $('#newMovieGenre').val(),
            poster: $('#newMoviePoster').val(),
            rating: $('#newMovieRating').val(),
            title: $('#newMovieTitle').val(),
            year: $('#newMovieYear').val()
        }

        const response = await fetch("https://powerful-artistic-catboat.glitch.me/movies/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        movieUpdate();
    });

    $("#editMovieButton").click(async function (event) {
        event.preventDefault();
        let dataId = $('.active').data('id');
        let data = {
            actors: $('#newMovieActors').val(),
            director: $('#newMovieDirector').val(),
            plot: $('#newMoviePlot').val(),
            genre: $('#newMovieGenre').val(),
            poster: $('#newMoviePoster').val(),
            rating: $('#newMovieRating').val(),
            title: $('#newMovieTitle').val(),
            year: $('#newMovieYear').val()
        }

        const response = await fetch("https://powerful-artistic-catboat.glitch.me/movies/" + dataId, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        movieUpdate();
    });

//delete button :DD!

    $('.btn-danger').click(async function () {
        let dataId = $('.active').data('id');
        console.log(dataId);
        const deleteMovie = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        }
        fetch("https://powerful-artistic-catboat.glitch.me/movies/" + dataId, deleteMovie).then(function (response) {
            console.log(response);
        });
        movieUpdate();
    });

//add movie displayed from outside search

//core function

    let movieUpdate = async () => {
        let movies = await fetch("https://powerful-artistic-catboat.glitch.me/movies");
        let movieResponse = await movies.json();
        console.log(movieResponse);
        $('.carousel-inner').empty();
        $('.list-group').empty();
        for (const movieResponseElement of movieResponse) {

            if (!movieResponseElement.title) {
                continue;
            }
            $('.carousel-inner').append(`
        <div class="carousel-item ${movieResponseElement.title === movieResponse[0].title ? 'active' : ''}" data-id="${movieResponseElement.id}">
        <div class="d-block w-100 movieCard">
            <img src="${movieResponseElement.poster}">
            <p><h1 class="rating-movieTitle">${movieResponseElement.title}</h1>${movieResponseElement.rating}/5</p>
            <p class="director"><p>Directed by: </p>${movieResponseElement.director}</p>
            <p class="actors"><p>Starring: </p>${movieResponseElement.actors}</p>
            <p>Synopsis</p>
            <p class="movieDescription">${movieResponseElement.plot}</p>

        </div>
        </div>
        `)
            $('.list-group').append(`<li class= "list-group-item" >${movieResponseElement.title}</li>`);
            $('.carousel').carousel();
        }
    }
    await movieUpdate();

    console.log("five thousand years later");
});


