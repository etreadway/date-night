// innit site
getRandomPairing()

// ---Objects and Event Listeners---

// reset button
var resetButtonObj = document.getElementById("resetButton")
resetButtonObj.addEventListener("click", getRandomPairing)
// main ingredient search box
var foodIngredientSearchObj = document.getElementById('mainIngredientFood')
// main alcohol ingredient
var alcoholTypeSearchObj = document.getElementById('mainIngredientAlcohol')
// non-alcoholic drink checkbox
var nonAlcCheckBox = document.getElementById("nonAlcoholic")
// filter search button
var filterButton = document.getElementById('filterButton')
filterButton.addEventListener('click', applyFilters)

// ---Functions---

// Random
function getRandomPairing() {
    //food
    getRandomMeal()
    //dessert
    getRandomDessert()
    //drink
    getRandomDrink()
}

function getRandomMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        // makes sure meal is not dessert
        if (data.meals[0].strCategory == 'Dessert'){
            getRandomMeal()
        }else{
            handleMealData(data)
        }
    })
}

function getRandomDessert(){
    // fetch random dessert id
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
    .then(res => res.json())
    .then(data => {
        let idMeal = data.meals[Math.floor(Math.random() * data.meals.length)].idMeal
        // fetch data on random dessert
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal)
        .then(res => res.json())
        .then(data => {
            document.getElementById('nameOfDessert').innerHTML = data.meals[0].strMeal
            document.getElementById('picOfDessert').src = data.meals[0].strMealThumb
            document.getElementById('instructionsOfDessert').innerHTML = data.meals[0].strInstructions
            // ingredient list
            var foodIngredientList = document.getElementById('ingredientsOfDessert')
            foodIngredientList.innerHTML = null
            for (var i=1; i<=20; i++) {
                //checks to make sure it is not an empty item
                if (data.meals[0]['strIngredient' + i] != null 
                && data.meals[0]['strIngredient' + i] != ""){
                    let newListItem = document.createElement("li")
                    newListItem.innerHTML = data.meals[0]['strIngredient' + i]
                    newListItem.innerHTML += ' - ' + data.meals[0]['strMeasure' + i]
                    foodIngredientList.append(newListItem)
                }
            }
        })
    })
}

function getRandomDrink(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        if (data.drinks[0].strAlcoholic == "Non alcoholic"){
            getRandomDrink()
        }else{
            handleDrinkData(data)
        } 
    });
}


// Filters
function applyFilters() {
    if(nonAlcCheckBox.checked) {
        nonAlcoholic()
    }
    if (foodIngredientSearchObj.value != "") {
        foodSearchByIngredient()
    }
    if(alcoholTypeSearchObj.value !="" 
    && !nonAlcCheckBox.checked) {
        typeofAlc()
    }
}

function foodSearchByIngredient(){
    let mainFood = foodIngredientSearchObj.value
    mainFood = mainFood.split(' ').join('+')
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + mainFood)
    .then(res => res.json())
    .then(data => {
        // get random meal id
        let idMeal = data.meals[Math.floor(Math.random() * data.meals.length)].idMeal
        // fetch data on random meal
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal)
        .then(res => res.json())
        .then(data => {
            handleMealData(data)
        })
    })
    .catch(error => inputError())
}

function typeofAlc(){
        
    let drinkType = alcoholTypeSearchObj.value
    drinkType = drinkType.split(' ').join('+')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkType}`)       
        .then(res => res.json())
        .then(data => {
            let random = getRandomInt(0, data.drinks.length - 1)
            let drinkID = data.drinks[random].idDrink
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
            .then(res => res.json())
            .then(data => {
                handleDrinkData(data)
            })
        })
        .catch(error => inputError())

}

function nonAlcoholic(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')       
        .then(res => res.json())
        .then(data => {
            let random = getRandomInt(0, data.drinks.length - 1)
            let drinkID = data.drinks[random].idDrink
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
            .then(res => res.json())
            .then(data => {
                handleDrinkData(data)
            })
        })
}


// Data Handling  
function handleMealData(data) {
    // food name picture and instructions 
    document.getElementById('nameOfFood').innerHTML = data.meals[0].strMeal
    document.getElementById('picOfFood').src = data.meals[0].strMealThumb
    document.getElementById('instructionsOfFood').innerHTML = data.meals[0].strInstructions
    // ingredient list
    var foodIngredientList = document.getElementById('ingredientsOfFood')
    foodIngredientList.innerHTML = null
    for (var i=1; i<=20; i++) {
        // checks to make sure it is not an empty item
        if (data.meals[0]['strIngredient' + i] != null 
        && data.meals[0]['strIngredient' + i] != ""){
            let newListItem = document.createElement("li")
            newListItem.innerHTML = data.meals[0]['strIngredient' + i]
            newListItem.innerHTML += ' - ' + data.meals[0]['strMeasure' + i]
            foodIngredientList.append(newListItem)
        }
    }
}

function handleDrinkData(data){
    // drink name picture and instructions
    document.getElementById("nameOfDrink").innerHTML = data.drinks[0].strDrink
    document.getElementById("directions").innerHTML = data.drinks[0].strInstructions
    document.getElementById("picOfDrink").src = data.drinks[0].strDrinkThumb

    // ingredient list
    var drinkIngredients = document.getElementById('ingredientsOfDrink')

    drinkIngredients.innerHTML = null

    for( var i=1; i<=15; i++) {
        if(data.drinks[0]['strIngredient'+ i] != null
        && data.drinks[0]['strIngredient'+ i] != "") {
            let newListItem = document.createElement('li')
            newListItem.innerHTML = data.drinks[0]['strIngredient' + i]
            newListItem.innerHTML += ' - ' + data.drinks[0]['strMeasure' + i]
            drinkIngredients.append(newListItem)
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


// Error Handling
function inputError(){
   alert('Invalid Input')
}