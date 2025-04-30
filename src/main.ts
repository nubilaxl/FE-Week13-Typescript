/*
Create a CRD application (CRUD without update) using json-server or another API
Use fetch and async/await to interact with the API
Use a form to create/post new entities
Build a way for users to delete entities
Include a way to get entities from the API and display them
You do NOT need update, but you can add it if you'd like
Use Bootstrap and/or CSS to style your project

*/
import 'bootstrap/dist/css/bootstrap.min.css'


var tbody: HTMLElement;
var genretbody: HTMLElement;
var reviewtbody: HTMLElement;
let fetchMoviesButton = document.getElementById("fetch-movies") as HTMLButtonElement;
// This event listener function sets up the logic for the tables of data.
// It styles the tables, creates the headings, then retrieves the data from
// json server to populate the table. This is repeated for the movie, genre,
// and reviews tables.
fetchMoviesButton.addEventListener("click", () => {

    //Clears any previous data from the container, so data is always fresh
    clearBox("movies-container");
    var  moviesContainer = document.getElementById("movies-container") as HTMLDivElement;
    // Specifies the container grid for the table
    moviesContainer.className = "container col-sm-4"
    var  tableHeader = document.createElement('thead');
    var myTable = document.createElement('table');
    //The bootstrap style attributes for the table
    myTable.className = "table table-primary table-bordered table-striped";
    tableHeader.innerHTML = `<tr>
                                <th>ID</th>
                                <th>Movie</th>
                                <th>GenreID</th>
                                </tr> `;


    myTable.appendChild(tableHeader);
    tbody = document.createElement('tbody');
    myTable.appendChild(tbody);
    moviesContainer.appendChild(myTable);
    //Fetches data to populate the table
    onFetchMoviesClick();

    clearBox("genres-container");
    var  genresContainer = document.getElementById("genres-container") as HTMLDivElement;
    genresContainer.className = "container col-sm-4"
    var genretableHeader = document.createElement('thead');
    var genremyTable = document.createElement('table');
    genremyTable.className = "table table-primary table-bordered table-striped";
    genretableHeader.innerHTML = `<tr>
                                <th>Genre</th>
                                <th>GenreID</th>
                                </tr> `;


    genremyTable.appendChild(genretableHeader);
    genretbody = document.createElement('tbody');
    genremyTable.appendChild(genretbody);
    genresContainer.appendChild(genremyTable);
    onFetchGenresClick();

    clearBox("reviews-container");
    var reviewsContainer = document.getElementById("reviews-container") as HTMLDivElement;
    var reviewtableHeader = document.createElement('thead');
    var reviewmyTable = document.createElement('table');
    reviewmyTable.className = "table table-primary table-bordered table-striped";
    reviewtableHeader.innerHTML = `<tr>
                                <th>ID</th>
                                <th>MovieID</th>
                                <th>Content</th>
                                </tr> `;


    reviewmyTable.appendChild(reviewtableHeader);
    reviewtbody = document.createElement('tbody');
    reviewmyTable.appendChild(reviewtbody);
    reviewsContainer.appendChild(reviewmyTable);
    onFetchReviewsClick();

});

// The async function to retrieve results from the server
async function onFetchMoviesClick() {
  type Movie = {
    id: number  
    title: string
    genreId: number
}

    const response = await fetch("http://localhost:3000/movies")
    const movieList = await response.json()
    // Maps the results received to the table elements
    tbody.innerHTML= movieList.map(
        (movie: Movie) => `<tr>
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.genreId}</td>
                </tr>
        `
    ).join("")
 
   
}

// Function to clear data given any id
function clearBox(elementID: string) { 
    var div = document.getElementById(elementID); 
     
    while(div!.firstChild) { 
        div!.removeChild(div!.firstChild); 
    } 
} 

// Function that checks if a value is a string
function isString(value: any) {
    return typeof value === 'string';
}

// Function that checks if a value is a number
function isNumber(value: any) {
    return typeof value === 'number';
}

// Function to pull the new information from the form to create a new movie object 
// on the backend server.
function getNewMovieData() {
    document.getElementById("create-movie")!.addEventListener("click", () => {
    // Retrive the values from the form elements
    let movieTitleElement = document.getElementById("movie-title") as HTMLInputElement
    let newMovieTitle = movieTitleElement.value;
    let movieGenreIdElement = document.getElementById("movie-genre-id") as HTMLInputElement
    let newMovieGenreId = movieGenreIdElement.value;
    let intGenreId = parseInt(newMovieGenreId);
    
   
    // Form data validation
    if(  newMovieGenreId === "" || newMovieTitle === "")
        return;
    if(isNumber(intGenreId) && isString(newMovieTitle) ) {
            // Function to run the post request to the server
            const theNewMovie = {
              title: newMovieTitle,
              genreId: intGenreId

            }
            onCreateMovieClick(theNewMovie);
            
       
    }
    movieTitleElement.value = '';
    movieGenreIdElement.value = '';
    });
}

//Call to the previously created function to process the event click to create
let lastCreatedItem = null
let newlyCreatedItem = lastCreatedItem;
getNewMovieData();
fetchMoviesButton.click();


type tMovie = {
  title: string;
  genreId: number;
};

// The async function to process the post method with header to retrieve the result body
async function onCreateMovieClick(testMovie: tMovie) {
    // parameters: newMovieTitle: string, intGenreId: number
       
        

        
        const response = await fetch("http://localhost:3000/movies", {
            method: "POST", // create
            headers: { "Content-Type": "application/json" }, // I recommend copy-pasting this
            body: JSON.stringify(testMovie) // Turns JS data into JSON data
        })
        // We need to parse out the newly created item from the response body
        // because that newly created item will have the id given to it by the backend
        const newlyCreatedItem = await response.json()
        lastCreatedItem = newlyCreatedItem
        fetchMoviesButton.click();
        
    }
// Function to get row id data from the form to pass to the server for deletion
function getDeleteMovieId() {
    let deleteMovieButton = document.getElementById("delete-movie") as HTMLButtonElement;
    deleteMovieButton.addEventListener("click", () => {
     
        // retrieves data from form text box
        let deleteId = document.getElementById("dbmovie-id") as HTMLInputElement
        let deleteItemId = deleteId.value;
        let intId = parseInt(deleteItemId);
       
        // clears the form text box
        const foobar = document.getElementById("dbmovie-id") as HTMLInputElement;
        foobar.value = '';
        
        // Validates the id as a number
        if(isNumber(intId) ) {
                //Calls the function to delete the row with id
                onDeleteMovieClick(intId);
                
           
        }
        
        });
        
}

//Call to the previously written function
getDeleteMovieId();
fetchMoviesButton.click();


//The async function to send Delete request to the server, it is passed the id value
async function onDeleteMovieClick(intId: number) {
    // This is just a little error checking for our demo
    if(intId=== null) {
        console.log("No item created yet to delete")
        return
    }
    // In this app we don't need the response and we don't need to wait
    // for the request to finish, but in a different app we might
    // Make sure the URL has the id of the item to delete on the end
    fetch("http://localhost:3000/movies/" + intId, {
        method: "DELETE", // delete
    })
    let fetchButton = document.getElementById("fetch-movies") as HTMLButtonElement;
    fetchButton.click();
}

/***** GENRES *****/
type Genre = {
  name: string
  id: number
}


// Function to send request to retrieve all the genre db data
async function onFetchGenresClick() {
    const response = await fetch("http://localhost:3000/genres")
    const genreList = await response.json()

    //Places the data in the table
    genretbody.innerHTML = genreList.map(
        (genre: Genre) => `<tr>
            <td>${genre.name}</td>
            <td>${genre.id}</td>
                </tr>
        `
    ).join("")
    
}

// Function to process the create click and retreive data from the form
// then create the new genre name
function getNewGenreData() {
  let createGenreButton = document.getElementById("create-genre") as HTMLButtonElement;
    createGenreButton.addEventListener("click", () => {
    // Gets the value from the form
    let genreNameTextBox = document.getElementById("genre-name") as HTMLInputElement
    let newGenreName = genreNameTextBox.value;
   
   // validate the information from the textbox is a string
    if(   newGenreName === "")
        return;
    if(isString(newGenreName) ) {
            // Call the function to create the data passing the name as parameter
            onCreateGenreClick(newGenreName);
       
    }
    const foobar = document.getElementById("genre-name") as HTMLInputElement
    foobar.value = '';
    });
    fetchMoviesButton.click();
    
}

// Async function to process post to the server and send body 
async function onCreateGenreClick(newGenreName: string) {
    
    
    // TODO: Create the new genre on the backend
    const newGenre = {
        name: newGenreName
    }

        
        const response = await fetch("http://localhost:3000/genres", {
            method: "POST", // create
            headers: { "Content-Type": "application/json" }, // I recommend copy-pasting this
            body: JSON.stringify(newGenre) // Turns JS data into JSON data
        })
        // We need to parse out the newly created item from the response body
        // because that newly created item will have the id given to it by the backend
        const newlyCreatedItem = await response.json()
        lastCreatedItem = newlyCreatedItem
        fetchMoviesButton.click();
}

// Call to create the new genre
getNewGenreData();
fetchMoviesButton.click();


// Function for deleting the genre given the id from the form
function getDeleteGenreId() {
    let deleteGenreButton = document.getElementById("delete-genre") as HTMLButtonElement;
    deleteGenreButton.addEventListener("click", () => {
        
        let dbgenreIdTextBox = document.getElementById("dbgenre-id") as HTMLInputElement;
        let deleteItemId = dbgenreIdTextBox.value;
        let intId = parseInt(deleteItemId);
       
        //Clear the form after getting the data
        
        dbgenreIdTextBox.value = '';
        // Validate the id information
        if(isNumber(intId) ) {
                // Call to process the delete action
                onDeleteGenreClick(intId);
           
        }
        
        });
        
}

// Async delete function using the id passed parameter
async function onDeleteGenreClick(intId: number) {
    
    
    // TODO: Delete the genre with the idToDelete
    // This is just a little error checking for our demo
    if(intId=== null) {
        console.log("No item created yet to delete")
        return
    }
    // In this app we don't need the response and we don't need to wait
    // for the request to finish, but in a different app we might
    // Make sure the URL has the id of the item to delete on the end
    fetch("http://localhost:3000/genres/" + intId, {
        method: "DELETE", // delete
    })
    fetchMoviesButton.click();
}
getDeleteGenreId();
fetchMoviesButton.click();

/*************REVIEWS******** */
type Review = {
  id: number;
  movieId: number;
  content: string;
};


//Async function to get reviews from the server and place in the table body
async function onFetchReviewsClick() {
    const response = await fetch("http://localhost:3000/reviews")
    const reviewList = await response.json()

    reviewtbody.innerHTML= reviewList.map(
        (review: Review) => `<tr>
            <td>${review.id}</td>
            <td>${review.movieId}</td>
            <td>${review.content}</td>
                </tr>
        `
    ).join("")
 
   
}

// Function to get data from the form and validate for passing parameter to 
// create a new review
function getNewReviewData() {
    let createReviewButton = document.getElementById("create-review") as HTMLButtonElement;
    createReviewButton.addEventListener("click", () => {
    
    let reviewContentTextBox = document.getElementById("review-content") as HTMLInputElement;
    let newReviewContent = reviewContentTextBox.value;
    let reviewMovieIdTextBox = document.getElementById("review-movie-id") as HTMLInputElement;
    let newMovieId = reviewMovieIdTextBox.value;
    let intMovieId = parseInt(newMovieId);
   
      reviewContentTextBox.value = '';
      reviewMovieIdTextBox.value = '';

    if(  newMovieId === "" || newReviewContent === "")
        return;
    if(isNumber(intMovieId) && isString(newReviewContent) ) {
            //Call to function to create on the server

            const theNewReview = {
              movieId: intMovieId,
              content: newReviewContent

            }
            onCreateReviewClick(theNewReview);
       
    }
    });
}

// Call to the previous function
getNewReviewData();
fetchMoviesButton.click();

type tReview = {
  movieId: number;
  content: string;
}


// Async function to process post request with header and body
async function onCreateReviewClick(testReview: tReview) {
    
        

        
        const response = await fetch("http://localhost:3000/reviews", {
            method: "POST", // create
            headers: { "Content-Type": "application/json" }, // I recommend copy-pasting this
            body: JSON.stringify(testReview) // Turns JS data into JSON data
        })
        // We need to parse out the newly created item from the response body
        // because that newly created item will have the id given to it by the backend
        const newlyCreatedItem = await response.json()
        lastCreatedItem = newlyCreatedItem
        fetchMoviesButton.click();

    }

// Function to get the review id from the form and send to function for deletion    
function getDeleteReviewId() {
    let deleteReviewButton = document.getElementById("delete-review") as HTMLButtonElement;
    deleteReviewButton.addEventListener("click", () => {
        
        // Get the id from the form
        let dbreviewIdTextBox = document.getElementById("dbreview-id") as HTMLInputElement;
        let deleteItemId = dbreviewIdTextBox.value;
        let intId = parseInt(deleteItemId);
       
        // Clear the form field text box
        
        dbreviewIdTextBox.value = '';

        if(isNumber(intId) ) {
                //Call the function to process the delete
                onDeleteReviewClick(intId);
           
        }
        
        });
        
}

//Call to previous function
getDeleteReviewId();
fetchMoviesButton.click();


// Async function to process the delete, passed an id parameter
async function onDeleteReviewClick(intId: number) {
    // This is just a little error checking for our demo
    if(intId=== null) {
        console.log("No item created yet to delete")
        return
    }
    // In this app we don't need the response and we don't need to wait
    // for the request to finish, but in a different app we might
    // Make sure the URL has the id of the item to delete on the end
    fetch("http://localhost:3000/reviews/" + intId, {
        method: "DELETE", // delete
    })
    fetchMoviesButton.click();
}

// Call to process a click on the fetch button to refresh the data
lastCreatedItem = newlyCreatedItem;
fetchMoviesButton.click();