var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cc9ad884c34f4733900dba633d22a99d&q=fruits&limit=10&offset=0&rating=G&lang=en";
console.log(queryURL);
$.ajax({
    url: queryURL,
    method: "GET"
})
.done(function(giphs){
    // declaring the data from the response
    var imageUrl = giphs.data[2].images.fixed_height_still.url;
    // defines jQUERY image object
    var fruit = $("<img>");

    // attributes added to the image objactthat is created above
    fruit.attr("src", imageUrl);
    fruit.attr("alt", "cat image");

    // dump all the images into the image div
    // prepends img object to DOM element with id of images
    $("#fruits-view").prepend(fruit);
});