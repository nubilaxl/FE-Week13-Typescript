import { isNumber, isString, fetchMoviesButton} from "./main";
let newlyCreatedItem;

// Function to pull the new information from the form to create a new movie object 
// on the backend server.
export function getNewMovieData() {
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
          
         newlyCreatedItem = await response.json()
          // lastCreatedItem = newlyCreatedItem
          fetchMoviesButton.click();
          
      }

// Function to process the create click and retreive data from the form
// then create the new genre name
export function getNewGenreData() {
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
          
          newlyCreatedItem = await response.json()
          // lastCreatedItem = newlyCreatedItem
          fetchMoviesButton.click();
  }

  // Function to get data from the form and validate for passing parameter to 
// create a new review
export function getNewReviewData() {
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
    
    newlyCreatedItem = await response.json()
    // lastCreatedItem = newlyCreatedItem
    fetchMoviesButton.click();

}
