$('document').ready(async () => {
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

    $( "#newMovieSubmit" ).click(async function( event ) {
        alert( "Handler for .submit() called." );
        event.preventDefault();

        let data = {
            actors: "Daddy Long Legs",
            director: "Pepsi Man",
            genre: "Action, Sci-Fi",
            plot: "In a world with two brothers and one Pepsi...",
            poster: "https://arbordayblog.org/wp-content/uploads/2018/06/oak-tree-sunset-iStock-477164218-1080x608.jpg",
            rating: "3",
            title: "Tree Feelings",
            year: "2020"
        }

        const response = await fetch("https://honeysuckle-holistic-jacket.glitch.me/movies", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        movieUpdate();
    });
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
            $( ".btn-danger" ).click(function (){
                let dataId = $(this).parent().data("id");
                movieDelete(dataId);
            })
        console.log(movieResponseElement);
    }}
    movieUpdate();

    let movieDelete = (dataId) => {
        const deleteMovie = {
            method: "DELETE"
        }
        fetch("https://honeysuckle-holistic-jacket.glitch.me/movies/" + dataId, deleteMovie).then(function(response){
            console.log(response);
        });
        movieUpdate();
    }


    // $( "#newMovieSubmit" ).submit(function( event ) {
    //     alert( "Handler for .submit() called." );
    //     event.preventDefault();
    // });



})


