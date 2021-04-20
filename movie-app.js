$('document').ready(async () => {

    $( "#newMovieSubmit" ).click(function( event ) {
        alert( "Handler for .submit() called." );
        event.preventDefault();
    });

    let movies = await fetch("https://honeysuckle-holistic-jacket.glitch.me/movies/");
    // let movies = await fetch("https://salty-ossified-warrior.glitch.me/movies/");
    let movieResponse = await movies.json();
    console.log(movieResponse);

    for (const movieResponseElement of movieResponse) {

        if (!movieResponseElement.title) {
            return;
        }

        $('.movieContainer').append(`
        
        <div class="movieCard">
            <img src="${movieResponseElement.poster}">
            <h1 class="movieTitle">${movieResponseElement.title}</h1>
            <p class="movieDescription">${movieResponseElement.plot}</p>
            <p class="actors">${movieResponseElement.actors}</p>
        </div>
        
        `)

        console.log(movieResponseElement);
    }

    // $( "#newMovieSubmit" ).submit(function( event ) {
    //     alert( "Handler for .submit() called." );
    //     event.preventDefault();
    // });



})


