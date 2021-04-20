$('document').ready(async () => {

    let movies = await fetch("https://salty-ossified-warrior.glitch.me/movies/");
    let movieResponse = await movies.json();
    console.log(movieResponse);

    for (const movieResponseElement of movieResponse) {
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





})


