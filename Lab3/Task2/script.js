const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const list = document.getElementById("tasks");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const li = document.createElement("li");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    const span = document.createElement("span");
    span.textContent = input.value;
    
    checkbox.addEventListener("change", function() {
        span.classList.toggle("done");
    });
    
    li.appendChild(checkbox);
    li.appendChild(span);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        if (confirm("Are u sure?")) {
            li.remove();
        }
    });
    
    li.appendChild(deleteBtn);
    list.appendChild(li);
    
    input.value = "";
});