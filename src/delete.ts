import {isNumber, fetchMoviesButton} from "./main"


// Function to get row id data from the form to pass to the server for deletion
export function getDeleteMovieId() {
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
    fetchMoviesButton.click();
}

// Function for deleting the genre given the id from the form
export function getDeleteGenreId() {
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


// Function to get the review id from the form and send to function for deletion    
export function getDeleteReviewId() {
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

