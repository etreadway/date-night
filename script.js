// Eric
// food
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        console.log(data.meals[0])
        document.getElementById('nameOfFood').innerHTML = data.meals[0].strMeal
        document.getElementById('picOfFood').src = data.meals[0].strMealThumb
        document.getElementById('instructionsOfFood').innerHTML = data.meals[0].strInstructions
    })







// Celida









