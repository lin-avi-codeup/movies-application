$('document').ready(async () => {
//search external db and display information
    $('.movie-btn').click(async () => {
        let searchMovie = $('.movie-search').val().toString();
        `http://www.omdbapi.com/?i=tt3896198&apikey=ecfa4132&t=${searchMovie}`
        let searchData = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=ecfa4132&t=${searchMovie}`);
        let searchResponse = await searchData.json();
        console.log(searchResponse);
        console.log(searchResponse.title);
        $('.movieContainer').append(`
        
        <div class="movieCard">
            <img src="${searchResponse.poster}">
            <h1 class="movieTitle">${searchResponse.title}</h1>
            <p class="movieDescription">${searchResponse.plot}</p>
            <p class="actors">${searchResponse.actors}</p>
        </div>
            `);
    });
//submit button to add edit movie info
    $("#newMovieButton").click(async function (event) {
        event.preventDefault();

        let data = {
            actors: "",
            director: "",
            genre: "",
            plot: "",
            poster: "",
            rating: "",
            title: "",
            year: ""
        }

        const response = await fetch("https://powerful-artistic-catboat.glitch.me/movies", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        movieUpdate();
    });
// TODO: delete movie

    // let movieDelete = (dataId) => {
    //     const deleteMovie = {
    //         method: "DELETE"
    //     }
    //     fetch("https://powerful-artistic-catboat.glitch.me/movies" + dataId, deleteMovie).then(function(response){
    //         console.log(response);
    //     });
    //     movieUpdate();
    // };

//TODO: secondary delete button option

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
        <div class="carousel-item" data-id="${movieResponseElement.id}">
        <div class="d-block w-100 movieCard">
            <img src="${movieResponseElement.poster}">
            <h1 class="movieTitle">${movieResponseElement.title}</h1>
            <p class="movieDescription">${movieResponseElement.plot}</p>
            <p class="actors">${movieResponseElement.actors}</p>
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


