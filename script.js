const input = document.getElementById("query");
const statusText = document.getElementById("status");
const list = document.getElementById('list');
const reciresult = document.getElementById('results')

window.addEventListener('load', () => {
    const Savedreci = JSON.parse(localStorage.getItem('recipes')) || [];
    Savedreci.forEach(recipes => {
        addrecipe(recipes);
    });
});

function saveRecipeToLocalStorage(recipes){
    const reci = JSON.parse(localStorage.getItem('recipes')) || [];
    reci.push(recipes);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function addrecipe(){
    let li = document.createElement("li");
    if(input.value === ''){
        statusText.textContent = "Please enter a recipe!";
        return;
    }else{
      li.innerHTML = input.value;  
            list.appendChild(li);
    }

    const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn"); 

            deleteBtn.addEventListener("click", () => {
                li.remove();
            });

            li.appendChild(deleteBtn); 
}

statusText.textContent = "Recipe saved!";
input.value = "";


            
