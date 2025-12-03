require('dotenv').config();
const apiKey = process.env.API_SECRET_KEY;

const input = document.getElementById("query");
const statusText = document.getElementById("status");
const list = document.getElementById('list');
const addbtn = document.getElementById('addbtn');
const results = document.getElementById('results');

window.addEventListener('load', () => {
    const Savedreci = JSON.parse(localStorage.getItem('recipes')) || [];
    Savedreci.forEach(recipes => {
        displayRecipe(recipes);
    });
});

addbtn.addEventListener('click', addrecipe);

 async function searchRecipes(query) {
    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Failed to fetch API: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        if(data.results && data.results.length > 0){
            displayResults(data.results);
            statusText.textContent = `Yay! Found ${data.results.length} recipes.`;
        }
        else{
            statusText.textContent = "No recipes found!"
        }

        return data;
    }

    catch (err) {
        console.error("Error:", err);
        statusText.textContent = "CHECK THE API ISSUE";
        results.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
    
} 

function addrecipe(){
    const query = input.value.trim();

    if(query === ''){
        statusText.textContent = "Please enter a recipe!";
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = query;   

    const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn"); 

            deleteBtn.addEventListener("click", () => {
                li.remove();
                removeFromLocalStorage(query);
            });

            li.appendChild(deleteBtn);
            list.appendChild(li);

            searchRecipes(query);

            const Savedreci = JSON.parse(localStorage.getItem('recipes')) || [];
            Savedreci.push(query);
            localStorage.setItem('recipes', JSON.stringify(Savedreci));

            statusText.textContent = "Recipe saved!";
            input.value = "";
}

function displayRecipe(recipes){
    let li = document.createElement("li");
    li.innerHTML = recipes;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        removeFromLocalStorage(recipes);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
}

function removeFromLocalStorage(recipes) {
    const Savedreci = JSON.parse(localStorage.getItem('recipes')) || [];
    const updated = Savedreci.filter(item => item !== recipes);
    localStorage.setItem('recipes', JSON.stringify(updated));
}

function displayResults(recipe){
    results.innerHTML = '<h3>Recipe Results:</h3>';
    const reciCard = document.createElement('div');
        reciCard.className = 'recipe-card';
        reciCard.innerHTML = `
            <h4>${recipe.title}</h4>
            <img src="${recipe.image}" alt="${recipe.title}">
        `;
        results.appendChild(reciCard);
    };




            
