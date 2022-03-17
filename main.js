// Get input value // Get html elements using javascript DOM selectors. // Initialize Local storage
let TaskName = document.getElementById('Tasknamevalue');
let TaskList = document.querySelector("ul");
let ClearAllBtn = document.getElementById('ClearBtn');
// Get the form
const AddTask = document.forms['AddTask'];
// Add Load(refresh/pageload event) event to load stored items from localstorage
window.addEventListener("load",(event) => {
    LoadItems()
})

// Adding event listener.
AddTask.addEventListener('submit',function(e){
    e.preventDefault();
    // Check if input value is empty or not
    if (TaskName.value === ""){
        alert("Please enter something!");
    }
    else{
        
        // Create li elements.
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = TaskName.value;
        
        // Create a button and append to li // Styling the button with Js too.
        // Also add the logic to delete task.
        let button = document.createElement('button');
        button.textContent = "Delete";
        button.className = "btn btn-outline-danger btn-sm";
        button.style.cssFloat = "right";
        li.appendChild(button);
        button.addEventListener('click',function(e){
            TaskList.removeChild(li);
            let removeitem = li.innerText;
            let buttontext = button.innerText;
            removeitem = removeitem.replace(buttontext,"");
            RemoveFromLocalStorage(removeitem);
        });

        // Append li{item} into the list
        TaskList.appendChild(li);
        
        // Add to local storage
        AddToLocalStorage(TaskName.value);
        
        // Clear input value after submit
        TaskName.value = '';
    }
    
})

// Add to local storage
function getFromLocalStorage(){
    let items = localStorage.getItem('todo');
    if (items === null){
        items = [];
    }
    else{
        items = JSON.parse(items)
        
    }
    return items
}

function RemoveFromLocalStorage(Value){
    let storageArray = getFromLocalStorage();

    let indexNumber = storageArray.indexOf(Value);
    storageArray.forEach(function(item,index){
        if (item === Value){
            storageArray.splice(index,1);
            localStorage.setItem('todo',JSON.stringify(storageArray));
        }
        
    })
   
}

function LoadItems(){
    TaskName.focus();
    let items = getFromLocalStorage();
    
    items.forEach(function Display(item){
        
        let li = document.createElement("li");
        li.className = 'list-group-item';
        li.innerHTML = item;
        
        let button = document.createElement('button');
        button.textContent = "Delete";
        button.className = "btn btn-outline-danger btn-sm";
        button.style.cssFloat = "right";
        button.addEventListener('click',function(e){
            TaskList.removeChild(li);
            let removeitem = li.innerText;
            let buttontext = button.innerText;
            removeitem = removeitem.replace(buttontext,"");
        
            RemoveFromLocalStorage(removeitem);
            
        });
        li.appendChild(button);
        TaskList.appendChild(li);
    });       
}

// Define event handler to clear everything in local storage
ClearAllBtn.addEventListener('click',function(e){
    localStorage.clear();
    window.location.reload();
})

function AddToLocalStorage(todoitem){
    let StorageItems = getFromLocalStorage();
    StorageItems.push(todoitem);
    localStorage.setItem('todo',JSON.stringify(StorageItems));
}

// Adding Search function to Application
// Event listener for search input
let SearchInput = document.getElementById("SearchTasksInput");
SearchInput.addEventListener('keyup',Search);

// Define search function.
function Search(){
    let Filter = SearchInput.value.toUpperCase();
    let items = TaskList.getElementsByTagName('li');
    for (let i = 0;i < items.length; i++){
        let val = items[i].textContent.toUpperCase();
        val = val.replace("DELETE",'')
        
        if (val.indexOf(Filter) != -1){
            items[i].style.display = "block"
            
        }
        else{
            items[i].style.display = "none"
            
        }

    }
    
}