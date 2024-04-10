const link ="http://localhost:4000/admin/expense/Userexpenses";
const form = document.getElementById("expenseForm");

form.addEventListener('submit', datastore);

const deleteEditItem = document.getElementById("expenseList");

deleteEditItem.addEventListener('click', deleteorEditOrder);



window.addEventListener("DOMContentLoaded", showorders);

async function datastore(event){
    event.preventDefault();
    let description =event.target.description.value;
    let amount = event.target.amount.value;
    let category = event.target.expenseCategory.value;
    let myObj = {
        description: description,
        amount : amount,
        category : category
    };
    console.log(myObj);

     try{

        const response = await axios.post(link, myObj);
        dataprint(response.data);
        clearForm();
     }
     catch(err){
        console.log(err);
     }
}

function dataprint(obj){
    const{id, description, amount, category} = obj;
  
    const ul = document.getElementById('expenseList');
    const li = document.createElement("li");
    li.innerHTML= `${description}  ${amount} ${category}`;
    let btn = document.createElement("button");
    btn.id=id;
    btn.type="click";
    btn.textContent = "Delete";
    btn.className ='delete';
    let editbtn = document.createElement("button");
    editbtn.id=id;
    editbtn.type="click";
    editbtn.textContent = "Edit";
    editbtn.className ="edit";
    li.appendChild(btn);
    li.appendChild(editbtn)
    ul.appendChild(li);

}

async function showorders(){
    try{
        const response = await axios.get(link);
        const details = response.data;
        console.log(details);
        
        details.forEach(data => {
            dataprint(data); // Print each user's data
        });
    }
        catch(err){
            console.log(err);
        }
    
}

async function deleteorEditOrder(event) {
    if (event.target.classList.contains("delete")) {
        const deleteButton = event.target;
        console.log(deleteButton) // Get reference to the delete button
        const listItem = deleteButton.parentElement;
        console.log(listItem);// Parent element (list item)

        const idvalue = deleteButton.id;
        try {
            const response = await axios.delete(`${link}/${idvalue}`);
            deleteButton.remove();
            listItem.remove();
        } catch (err) {
            console.log(err);
        }
    } /*else if (event.target.classList.contains("edit")) {
        
        const editButton = event.target;
        console.log(editButton)
        const idvalue = editButton.id;
        console.log(idvalue )
        
        
        try {
            const response = await axios.get(`${link}/${idvalue}`);
        
            console.log(response.data)
            const { description, amount, category } = response.data.user;
            
            document.getElementById("expenseDescription").value = description;
            document.getElementById("expenseAmount").value = amount;
            document.getElementById("expenseCategory").value = category;
            
            const listItem = editButton.parentElement;
            listItem.remove();
            form.addEventListener('submit', async function updateData(event) {
                event.preventDefault();
                let updatedDescription = event.target.description.value;
                let updatedAmount = event.target.amount.value;
                let updatedCategory = event.target.expenseCategory.value;
                let updatedObj = {
                    description: updatedDescription,
                    amount: updatedAmount,
                    category: updatedCategory
                };
                try {
                    const updateResponse = await axios.put(`${link}/${idvalue}`, updatedObj);
                    console.log("Expense updated successfully:", updateResponse.data);
                    // Optionally, you can add the updated expense item to the list again
                } catch (err) {
                    console.log("Error updating expense:", err);
                }
                // Remove the event listener after updating data
                form.removeEventListener('submit', updateData);
            });

        } catch (err) {
            console.log(err);
        }
    }*/
}

function clearForm() {
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = 'food'; // Default category
}