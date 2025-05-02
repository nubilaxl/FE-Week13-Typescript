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
import {getNewMovieData, getNewReviewData, getNewGenreData} from "./create"
import {getDeleteGenreId, getDeleteMovieId, getDeleteReviewId} from "./delete"

var tbody: HTMLElement;
var genretbody: HTMLElement;
var reviewtbody: HTMLElement;
export let fetchMoviesButton = document.getElementById("fetch-movies") as HTMLButtonElement;
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

    const response = await fetch("https://fanatical-ivy-glasses.glitch.me/movies")
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
export function isString(value: any) {
    return typeof value === 'string';
}

// Function that checks if a value is a number
export function isNumber(value: any) {
    return typeof value === 'number';
}






/***** GENRES *****/
type Genre = {
  name: string
  id: number
}


// Function to send request to retrieve all the genre db data
async function onFetchGenresClick() {
    const response = await fetch("https://fanatical-ivy-glasses.glitch.me/genres")
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


/*************REVIEWS******** */
type Review = {
  id: number;
  movieId: number;
  content: string;
};


//Async function to get reviews from the server and place in the table body
async function onFetchReviewsClick() {
    const response = await fetch("https://fanatical-ivy-glasses.glitch.me/reviews")
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




function start() {
    //Call to the previously created function to process the event click to create
    fetchMoviesButton.click();
    getNewMovieData();
    
    //Call to the previously written function
    getDeleteMovieId();
    

    // Call to create the new genre
    getNewGenreData();
   
    getDeleteGenreId();
    
    // Call to the previous function
    getNewReviewData();

    //Call to previous function
    getDeleteReviewId();

// Call to process a click on the fetch button to refresh the data

    fetchMoviesButton.click();
}

start();