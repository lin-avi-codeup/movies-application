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
        <div class="carousel-item" data-id="">
        <div class="d-block w-100 movieCard" style="background-image:url(${searchResponse.Poster})">
        <div class="movieCard-inner">
            <span><h1 class="rating-movieTitle search-title">${searchResponse.Title}</h1 class="search-rating" >${searchResponse.Rating}/5</span>
            <p class="director"><span class="p-head">Directed by: <br></span class ="search-director" >${searchResponse.Director}</p>
            <p class="actors"><span class="p-head">Starring: <br></span class ="search-actors">${searchResponse.Actors}</p>
            <p class="p-head">Synopsis</p>
            <span class="movieDescription search-description">${searchResponse.Plot}</span>
        `)
    });


    $(".add-outsideDB").click(async function (event) {
        event.preventDefault();

        let data = {
            actors: $('.search-actors').html(),
            director: $('.search-director').text(),
            plot: $('.search-direction').text(),
            genre: '',
            poster: $('.search-image').css("background-image"),
            rating: $('.search-rating').text(),
            title: $('.search-title').text(),
            year: ''
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
        <div class="d-block w-100 movieCard" style="background-image:url(${movieResponseElement.poster})">
        <div class="movieCard-inner">
            <span><h1 class="rating-movieTitle">${movieResponseElement.title}</h1>${movieResponseElement.rating}/5</span>
            <p class="director"><span class="p-head">Directed by: <br></span>${movieResponseElement.director}</p>
            <p class="actors"><span class="p-head">Starring: <br></span>${movieResponseElement.actors}</p>
            <p class="p-head">Synopsis</p>
            <span class="movieDescription">${movieResponseElement.plot}</span>
        </div>
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


