// Eric








// Celida

fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {

     console.log(data.drinks[0])
     document.getElementById("nameOfDrink").innerHTML = data.drinks[0].strDrink
     document.getElementById("directions").innerHTML = data.drinks[0].strInstructions
     document.getElementById("picOfDrink").src = data.drinks[0].strDrinkThumb
    });
