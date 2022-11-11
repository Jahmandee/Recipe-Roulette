const endPoint = 'https://api.edamam.com/search?'

// Function to grab input (.value) from search bar and send to API for response.
// URLSearchParam is a helper that allows this type of structure for the set of options sent to the API

function searchRecipe(){
    const searchTerm = document.getElementById("searchBar").value;
    const params = new URLSearchParams ({
        app_id: '46a2028d',
        app_key: 'd122f0633dd3ecf38385686576c601d6',
        q: searchTerm,
    }).toString();
    
    // Combines the endpoint of the API (from the docs) with the parameters (authetication and options) needed.
    
     const apiCall = endPoint + params;
   
    // This is sending a GET request to the API to receive data 
     
    fetch(apiCall)
    .then(response => {
    return response.json();
    })
    .then(data => {

    // This saves the data I want from the API response
    const recipeData = data.hits[0].recipe;

    console.log(recipeData);

    const recipeImage = recipeData.image;
    const recipeName = recipeData.label;
    const recipeIngredients = recipeData.ingredientLines;

// This gets all the HTML elements we want to put my data into

const imageElement = document.getElementById('recipeImage');
const labelElement = document.getElementById('recipeName');
const ingredientElement = document.getElementById('ingredientList');

// Display recipeName on the screen

labelElement.innerHTML = recipeName;
// The image coming from the API is a URL so we need to fill the 'src' tag
imageElement.src = recipeImage;

// This is a forEach loop to grab all the ingredients in the list and put in an 'li' tag
recipeIngredients.forEach(function (item) {
    const li = document.createElement('li')
    li.innerHTML = item;
    // Adding to the 'ul'
    ingredientElement.append(li);
});

    });
}




