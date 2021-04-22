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
    $( "#newMovieSubmit" ).click(async function( event ) {
        alert( "Handler for .submit() called." );
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

        const response = await fetch("https://honeysuckle-holistic-jacket.glitch.me/movies", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        movieUpdate();
    });
// delete movie

    let movieDelete = (dataId) => {
        const deleteMovie = {
            method: "DELETE"
        }
        fetch("https://honeysuckle-holistic-jacket.glitch.me/movies/" + dataId, deleteMovie).then(function(response){
            console.log(response);
        });
        movieUpdate();
    };

//add movie displayed from outside search

//core function

    let movieUpdate = async () => {
        let movies = await fetch("https://honeysuckle-holistic-jacket.glitch.me/movies/");
        // let movies = await fetch("https://salty-ossified-warrior.glitch.me/movies/");
        let movieResponse = await movies.json();
        console.log(movieResponse);

        for (const movieResponseElement of movieResponse) {

        if (!movieResponseElement.title) {
            continue;
        }
        $('.movieContainer').append(`

        <div class="movieCard" data-id="${movieResponseElement.id}">
            <img src="${movieResponseElement.poster}">
            <h1 class="movieTitle">${movieResponseElement.title}</h1>
            <p class="movieDescription">${movieResponseElement.plot}</p>
            <p class="actors">${movieResponseElement.actors}</p>
            <button type="button" class="btn btn-danger" id="delete-btn">Delete from List</button>
        </div>
        
        `)
        $('.list-group').append(`< liclass= "list-group-item" >${movieResponseElement.title}</li>`)

    }}
    movieUpdate();



    // $( "#newMovieSubmit" ).submit(function( event ) {
    //     alert( "Handler for .submit() called." );
    //     event.preventDefault();
    // });



})


