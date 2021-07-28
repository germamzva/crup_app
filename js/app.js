// insert data in the database
const addButton = document.querySelector("#addTask");

addButton.addEventListener("click", function() {

    const addInput = document.querySelector(".task input[data-input]");

    if(addInput.value === ""){
        addInput.classList.add("is-invalid");
        return 
    } else {
        addInput.classList.remove("is-invalid");
    }

    // addInput.value
    fetch("functions/insertData.php", {
        method: "POST",
        body: new URLSearchParams("title=" + addInput.value)
    }).then(function(response){
        getAllData()
        addInput.value = ""
    })
    
})

// feth all the data from the database
function getAllData(){
    fetch("functions/getAllData.php")
    .then(res => res.json())
    .then(
        res => dataLoader(res)
    )
}

function getAllUser(){
    fetch("user_functions/getAllUser.php")
    .then(res => res.json())
    .then(
        res => userLoader(res)
    )
}

function dataLoader(data){
    let htmlEl = "";
    data.forEach(task => {
        if(task.id){
            if(task.assign != "0"){
                htmlEl += '<li class="align-items-center d-flex justify-content-between list-group-item" id="list_'+task.id+'"><div class="user_wrap d-flex flex-column"><h2 class="d-block">'+task.title+' <span class="d-block" id="assigne">Assigned to: <em>'+task.assign_name+'</em></span></h2></div>'
            } else {
                htmlEl += '<li class="align-items-center d-flex justify-content-between list-group-item" id="list_'+task.id+'"><div class="user_wrap d-flex flex-column"><h2 class="d-block">'+task.title+' </h2></div>'
            }
            htmlEl += '<div class="d-flex">'
            htmlEl += '<button type="button" onclick="deleteList('+task.id+')" class="btn btn-danger btn-sm">Delete</button>'
            htmlEl += '<button type="button" data-bs-toggle="collapse" data-bs-target="#updateCollapse'+task.id+'" class="btn btn-info btn-sm text-white">Update</button>'
            htmlEl += '<button type="button" data-bs-toggle="collapse" data-bs-target="#assignCollapse'+task.id+'" class="btn btn-success btn-sm text-white">Assign</button>'
            htmlEl += '</div>'
            htmlEl += '</li>'
            htmlEl += '<div class="collapse" id="updateCollapse'+task.id+'">'
                htmlEl += '<div class="card card-body">'
                    htmlEl += '<div class="input-group mb-3">'
                        htmlEl += '<input type="text" name="task_title'+task.id+'" id="task_title'+task.id+'" class="form-control" value="'+task.title+'">'
                        htmlEl += '<button class="btn btn-secondary" type="button" onclick="saveUpdate('+task.id+')">Save</button>'
                    htmlEl += '</div>'
                htmlEl += '</div>'
            htmlEl += '</div>';
            htmlEl += '<div class="collapse" id="assignCollapse'+task.id+'">'
                htmlEl += '<div class="card card-body">'
                    if(task.assign != 0){
                        htmlEl += '<div class="input-group assigned" id="assignButtons" data-taskid="'+task.id+'" data-userassign="'+task.assign+'">'
                    } else {
                        htmlEl += '<div class="input-group" id="assignButtons" data-taskid="'+task.id+'">'
                    }
                    htmlEl += '</div>'
                htmlEl += '</div>'
            htmlEl += '</div>';
        }
    });

    const taskList = document.querySelector(".task_list ul")
    taskList.innerHTML = htmlEl
}

function userLoader(data){
    let optionEl = ""
    data.forEach(user => {
        optionEl += '<button type="button" class="btn btn-primary btn-sm ms-1" onclick="assignTask(event)" id="taskAssign" data-userid="'+user.id+'">'+user.name+'</button>'
    })

    const selectEl = document.querySelectorAll("#assignButtons")
    selectEl.forEach(buttons => {
        buttons.innerHTML = optionEl
    })
}

// delete data from the list
function deleteList(id){
    fetch("functions/deleteData.php",{
        method: "POST",
        body: new URLSearchParams("id=" + id)
    }).then(res => res.json())
    .then(res => deleteLists(res, id))
    getAllData()
}

function deleteLists(res, id){

    setInterval(() => {
        const response = document.querySelector("#response");
        if(res.res === true){
            response.innerHTML = '<div class="alert alert-success p-2" role="alert">'+res.msg+' / # ' + id + '</div>';
        } else {
            response.innerHTML = '<div class="alert alert-danger p-2" role="alert">'+res.msg+'/ # ' + id + '</div>';
        }
    }, 3000)

    const li = document.getElementById("list_"+id);
    li.remove();
}

// update list
function saveUpdate(id){
    const inputUpdate = document.getElementById("task_title"+id);
    fetch("functions/updateData.php", {
        method: "POST",
        body: new URLSearchParams("id=" +id+ "&title=" +inputUpdate.value)
    }).then(res => res.json())
    .then(res => console.log(res))
    getAllData()
}

// assign a task to user/devs
function assignTask(event){
    const user_id = event.target.getAttribute("data-userid")
    const user_name = event.target.innerHTML
    const task_id = event.target.parentElement.getAttribute("data-taskid")

    fetch("functions/assignTask.php", {
        method: "POST",
        body: new URLSearchParams("task_id=" + task_id + "&user_id=" + user_id + "&user_name=" + user_name)
    }).then(res => res.json())
    .then(res => assignResponse(res))
    getAllData()
}

function assignResponse(data){
    const response = document.querySelector("#response");
    if(data.stat === true){
        response.innerHTML = '<div class="alert alert-success p-2" role="alert">'+data.msg+'</div>';
    } else {
        response.innerHTML = '<div class="alert alert-danger p-2" role="alert">'+data.msg+'</div>';
    }
}

getAllData()
getAllUser()