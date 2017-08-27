// intial array of movies
var movies = ["The Hunger Games", "Star Wars", "Harry Potter", "Twilight"]
// GIPHY API key and the URL


function movieName() {
    var movieNames = $(this).attr("data-name");
    var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=cc9ad884c34f4733900dba633d22a99d&q="' + movieNames + '"&limit=10&offset=0&rating=G&lang=en';
    console.log(giphyURL);
    $.get(giphyURL, function (giphs) {
        var moviesTriggerButton = giphs.data;
        for (var i = 0; i < moviesTriggerButton.length; i++) {
            // creating a new div to store the movie ratings
            var movieDiv = $("<div>");
            movieDiv.addClass("movies-div");
            // getting rating information from the data
            var movieRatings = moviesTriggerButton[i].rating;
            // storing the rating information for each image in a paragraph
            var movieParagraph = $("<p>").text("Ratings:" + movieRatings);
            // images of the movies will get displayed here
            var movieImageUrl = giphs.data[i].images.fixed_height_still;           
            // defines jQUERY image object
            var moviesImage = $("<img>");
            // attributes added to the image objactthat is created above
             moviesImage.attr("src", movieImageUrl.url);
            moviesImage.attr("alt", "movie image");
            
            // dump all the images into the image div
            // prepends img object to DOM element with id of images
            movieDiv.prepend(movieParagraph);
            movieDiv.append(moviesImage);
            $("#movies-view").append(movieDiv);
        }        
    });
}
function callButtons() {
    $("#movies-button").empty();
    for (var i = 0; i < movies.length; i++) {
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var movieButton = $("<button>");
        // Adding a class
        movieButton.addClass("movies");
        // Added a data-attribute
        movieButton.attr("data-name", movies[i]);
        // Provided the initial button text
        movieButton.text(movies[i]);
        // Added the button to the HTML
        $("#movies-button").append(movieButton);
    }
}

$(document).ready(function () {
    callButtons();

    $("#movie-add").on("click", function () {
        event.preventDefault();
        var newMovies = $("#input-movie").val().trim();
        movies.push(newMovies);
        callButtons();
    });
    $(".movies").on("click", movieName);

});