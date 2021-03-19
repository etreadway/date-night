//get first pairing
getRandomPairing()

var resetButtonObj = document.getElementById("resetButton")
resetButtonObj.addEventListener("click", getRandomPairing)



function getRandomPairing() {
    //food
    getRandomMeal()
    //dessert
    getRandomDessert()
    //drink
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
            // drink name picture and instructions
            console.log(data.drinks[0])
            document.getElementById("nameOfDrink").innerHTML = data.drinks[0].strDrink
            document.getElementById("directions").innerHTML = data.drinks[0].strInstructions
            document.getElementById("picOfDrink").src = data.drinks[0].strDrinkThumb + '/preview'

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
    });


}


function getRandomMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        // makes sure meal is not dessert
        if (data.meals[0].strCategory == 'Dessert'){
            getRandomMeal()
        }else{
            console.log(data.meals[0])
            // food name picture and instructions 
            document.getElementById('nameOfFood').innerHTML = data.meals[0].strMeal
            document.getElementById('picOfFood').src = data.meals[0].strMealThumb + '/preview'
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
    })
}

function getRandomDessert(){
    // fetch random dessert id
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
    .then(res => res.json())
    .then(data => {
        var idMeal = data.meals[Math.floor(Math.random() * data.meals.length)].idMeal
        // fetch data on random dessert
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal)
        .then(res => res.json())
        .then(data => {
            console.log(data.meals[0])

            document.getElementById('nameOfDessert').innerHTML = data.meals[0].strMeal
            document.getElementById('picOfDessert').src = data.meals[0].strMealThumb + '/preview'
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