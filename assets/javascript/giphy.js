// intial array of movies
var movies = ["The Hunger Games", "Star Wars", "Harry Potter", "Twilight", "Frozen", "The NoteBook", "Home Alone", "Baby's Day Out", "Cinderalla", "Beauty And the Beast", "Interstellar", "The Martian"];
// GIPHY API key and the URL

var print = console.log;

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

function createRow() {

}

function renderMovieName() {
    var movieNames = $(this).attr("data-name");
    var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=cc9ad884c34f4733900dba633d22a99d&q="' + movieNames + '"&limit=10&offset=0&rating=G&lang=en';
    console.log(giphyURL);
    $.get(giphyURL, function (giphs) {
        var moviesTriggerButton = giphs.data;
        var movieRow;
        $("#movies-view").empty();
        for (var i = 0; i < moviesTriggerButton.length; i++) {
            if ((i) % 3 == 0) {
                movieRow = $("<div>");
                movieRow.addClass("col-md-4 col-md-4 col-md-4");
                $("#movies-view").append(movieRow);
            }
            // creating a new div to store the movie ratings
            var movieDiv = $("<div>");
            // getting rating information from the data
            var movieRatings = moviesTriggerButton[i].rating;
            // storing the rating information for each image in a paragraph
            var movieParagraph = $("<p>").text("Ratings:" + movieRatings);
            var movieImageUrlStill = giphs.data[i].images.fixed_height_still.url;
            var movieImageUrlAnimate = giphs.data[i].images.fixed_height.url;
            // defines jQUERY image object
            var moviesImage = $("<img>");
            moviesImage.addClass("movies-div");
            moviesImage.addClass("img-thumbnail");
            // attributes added to the image objactthat is created above
            moviesImage.attr("src", movieImageUrlStill);
            moviesImage.attr("alt", "movie image");
            moviesImage.attr("data-state", "still");
            moviesImage.attr("data-still", movieImageUrlStill);
            moviesImage.attr("data-animate", movieImageUrlAnimate);

            // dump all the images into the image div
            // prepends img object to DOM element with id of images
            movieDiv.append(movieParagraph);
            movieDiv.append(moviesImage);
            // $("#movies-view").append(movieDiv);
            movieRow.append(movieDiv);

        }
        $(".movies-div").on("click", animate);
    });
}

function createButton(mN) {
    var movieButton = $("<button>");
    // Add bootstrap classes
    movieButton.addClass("btn");
    movieButton.addClass("btn-warning");
    // Add a data-attribute
    movieButton.attr("data-name", mN);
    // Provide the initial button text
    movieButton.text(mN);
    // Add the button to the HTML
    $(movieButton).on("click", renderMovieName);
    return movieButton;
}

function callButtons() {
    $("#movies-button").empty();
    for (var i = 0; i < movies.length; i++) {
        $("#movies-button").append(createButton(movies[i]));
    }
}

$("#movie-add").on("click", function () {
    event.preventDefault();
    var newMovie = $("#input-movie").val().trim();
    // add only if the box is non-empty
    if (newMovie.length) {
        movies.push(newMovie);
        $("#movies-button").append(createButton(newMovie));
    }
});

$(document).ready(function () {
    callButtons();
});