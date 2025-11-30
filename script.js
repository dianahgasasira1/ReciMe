import { API_KEY } from "./api.js";

const input = document.getElementById("query");
const statusText = document.getElementById("status");
const list = document.getElementById('list');
const addbtn = document.getElementById('addbtn');

window.addEventListener('load', () => {
    const Savedreci = JSON.parse(localStorage.getItem('recipes')) || [];
    Savedreci.forEach(recipes => {
        displayRecipe(recipes);
    });
});

addbtn.addEventListener('click', addrecipe);

 async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
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



            
