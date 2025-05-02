# FE-Week13-Typescript

 This HTML and typescript web project for communicating via API with json server was converted from a javascript application. It allows users to interact with the json database via API calls using information entered in forms. The database changes are displayed to the user in tables. This project demonstrates bootstrap tables and forms, buttons, javascript event listeners, API FETCH, POST, DELETE methods, HTML element typing, and data typing.

## Live Demo URL

Check out the application [Json-Data-API] (https://comfy-sfogliatella-d92e9e.netlify.app/) 
Click Fetch to begin. Interact with the data by: creating a movie with a genre, deleting the movie via id, create a genre, delete a genre by id, create a review, and delete a review by id.

## Technologies used

* JavaScript programming language
* Typescript
* Bootstrap
* JQuery
* HTML
* Vite
* JSON Server
* json db

## Favorite Features
### Interacting with the DOM 
* Finding the correct javascript and jquery code to gain access to manipulate the display of fetched data into a table format was challenging. To overcome this challenge, a map function was used to create the table row and cells, then the data was mapped into string literals. Styling the table was challenging, after researching, the bootstrap styling was placed into the  classname attribute of the table element in typescript.
### Typing the variables for the asynchronous code
* It was a challenge to type the variables retrieved from text boxes and pass them as function parameters. Resolving this issue required converting the parameters to objects that fed data directly to the api method call. The textbox data was initialized to the json object parameters, then passed to the method call. 
### Splitting the files and using import/export functions
* Converting from javascript to typescript required splitting the files which was challenging. This challenge was overcome by splitting the main file based on whether it was a main fetch, a create, or a delete operation that the functions were supporting. The challenge then was to import/export all code outside of main. There were helper functions in main that were exported from main to the create and delete files. In the end, the code became very streamlined. 

## Code Snippets

### Code to format part of the table
```typescript

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

```

### Code to perform a fetch operation
```typescript
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

```

## Installation
The local environment require node packet manager, and vite
Check your system using command: npm -v 
If no version install from nodejs.org
Then install 'vite' using command: npm create vite@latest
Make the following configuration selections: any project name, select folder, 
for framework select 'vanilla'. For language select 'Typescript'

To make a local copy of of the code, clone the repository
```
git clone https://github.com/nubilaxl/FE-Week13-Typescript
cd FE-Week13-Typescript
```
Run npm in project directory to pull down dependencies
```
npm install
```
Then within the project directory run the build
```
npm run dev
```

The server will show the localhost url to plug into your browser

## Contributions
Pull requests, feature requests, and bug reports are welcome. Please open an issue first so that we may discuss.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contact Info
Email: nubila.levon@outlook.com 
LinkedIn:  https://www.linkedin.com/in/nubila-levon/ 