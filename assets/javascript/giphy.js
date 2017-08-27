// intial array of movies
var movies = ["The Hunger Games", "Star Wars", "Harry Potter", "Twilight"]
// GIPHY API key and the URL


function animate() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

function renderMovieName() {
    var movieNames = $(this).attr("data-name");
    var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=cc9ad884c34f4733900dba633d22a99d&q="' + movieNames + '"&limit=10&offset=0&rating=G&lang=en';
    console.log(giphyURL);
    $.get(giphyURL, function (giphs) {
        var moviesTriggerButton = giphs.data;
        for (var i = 0; i < moviesTriggerButton.length; i++) {
            // creating a new div to store the movie ratings
            var movieDiv = $("<div>");
            // getting rating information from the data
            var movieRatings = moviesTriggerButton[i].rating;
            // storing the rating information for each image in a paragraph
            var movieParagraph = $("<p>").text("Ratings:" + movieRatings);
            // images of the movies will get displayed here
            var movieImageUrlStill = giphs.data[i].images.fixed_height_still.url;
            var movieImageUrlAnimate = giphs.data[i].images.fixed_height.url;
            // defines jQUERY image object
            var moviesImage = $("<img>");
            moviesImage.addClass("movies-div");
            // attributes added to the image objactthat is created above
            moviesImage.attr("src", movieImageUrlStill);
            moviesImage.attr("alt", "movie image");
            moviesImage.attr("data-state", "still");
            moviesImage.attr("data-still", movieImageUrlStill);
            moviesImage.attr("data-animate", movieImageUrlAnimate);

            // dump all the images into the image div
            // prepends img object to DOM element with id of images
            movieDiv.prepend(movieParagraph);
            movieDiv.append(moviesImage);
            $("#movies-view").append(movieDiv);
        }
        $(".movies-div").on("click", animate);

    });
}

function callButtons() {
    $("#movies-button").empty();
    for (var i = 0; i < movies.length; i++) {
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var movieButton = $("<button>");
        // Add a class
        movieButton.addClass("movies");
        // Add a data-attribute
        movieButton.attr("data-name", movies[i]);
        // Provide the initial button text
        movieButton.text(movies[i]);
        // Add the button to the HTML
        $("#movies-button").append(movieButton);
    }
}

$("#movie-add").on("click", function () {
    event.preventDefault();
    var newMovie = $("#input-movie").val().trim();
    movies.push(newMovie);
    var movieButton = $("<button>");
    // Add a class
    movieButton.addClass("movies");
    // Add a data-attribute
    movieButton.attr("data-name", newMovie);
    // Set initial button text
    movieButton.text(newMovie);
    // Add the button to the div
    $("#movies-button").append(movieButton);
    // Add onClick listener function
    $(movieButton).on("click", renderMovieName);
});

$(document).ready(function () {
    callButtons();
    $(".movies").on("click", renderMovieName);
});