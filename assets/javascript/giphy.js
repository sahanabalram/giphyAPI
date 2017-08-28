// intial array of movies
var movies = ["The Hunger Games", "Star Wars", "Harry Potter", "Twilight", "Frozen", "The NoteBook", "Home Alone", "Baby's Day Out", "Cinderalla", "Beauty And the Beast", "Interstellar", "The Martian"];
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

function createImageCard(imageData) {
    var colDiv = $("<div>")
    colDiv.addClass("col s12 m4");
    var mainCard = $("<div>");
    mainCard.addClass("card");
    var cardImage = $("<div>");
    cardImage.addClass("card-image waves-effect waves-block waves-light");
    mainCard.append(cardImage);
    var image = $("<img>");
    image.addClass("movies-div");
    // storing the rating information for each image in a paragraph
    var movieRatings = imageData.rating;
    var movieImageUrlStill = imageData.images.fixed_height_still.url;
    var movieImageUrlAnimate = imageData.images.fixed_height.url;
    var ratingButton = $("<a>");
    ratingButton.addClass("btn-floating fab-backdrop btn-large btn-price waves-effect waves-light pink accent-2 rating-button");
    $(ratingButton).text(movieRatings);
                                       
    // attributes added to the image objactthat is created above
    image.attr("src", movieImageUrlStill);
    image.attr("alt", "movie image");
    image.attr("data-state", "still");
    image.attr("data-still", movieImageUrlStill);
    image.attr("data-animate", movieImageUrlAnimate);
    cardImage.append(ratingButton);
    cardImage.append(image);
    
    colDiv.append(mainCard);

    return colDiv;
}

function renderMovieName() {
    var movieNames = $(this).attr("data-name");
    var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=cc9ad884c34f4733900dba633d22a99d&q="' + movieNames + '"&limit=10&offset=0&rating=&lang=en';
    
    $.get(giphyURL, function (giphs) {
        //var moviesTriggerButton = giphs.data;
        var movieRow;
        $("#movies-view").empty();
        for (var i = 0; i < giphs.data.length; i++) {
            // for every three images a new row is created
            if ((i) % 3 == 0) {
                movieRow = $("<div>");
                movieRow.addClass("row");
                $("#movies-view").append(movieRow);
            }
            movieRow.append(createImageCard(giphs.data[i]));

        }
        $(".movies-div").on("click", animate);
    });
}

function createButton(mN) {
    var movieButton = $("<button>");
    // Add bootstrap classes
    movieButton.addClass("btn");
    movieButton.addClass("btn-warning orange darken-4");
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
    $('.carousel').carousel();
});