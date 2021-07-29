// insert data in the database
const addButton = document.querySelector("#addUser");

addButton.addEventListener("click", function() {

    const fullName = document.querySelector("#fullname");
    const userPosition = document.querySelector("#user_position");

    if(fullName.value === ""){
        fullName.classList.add("is-invalid");
        return 
    } else if (userPosition.value === ""){
        userPosition.classList.add("is-invalid");
        return 
    } else {
        userPosition.classList.remove("is-invalid");
        fullName.classList.remove("is-invalid");
    }

    fetch("user_functions/insertUser.php", {
        method: "POST",
        body: new URLSearchParams("name=" + fullName.value + "&position=" + userPosition.value)
    }).then(function(response){

        response.json();

        getAllUser()

        fullName.value = ""
        userPosition.value = ""
    }).then(response => console.log(response))
    
})

// get all user
function getAllUser(){
    fetch("user_functions/getAllUser.php")
    .then(res => res.json())
    .then(
        res => dataLoader(res)
    )
}

function dataLoader(data){
    let htmlEl = "";
    data.forEach(user => {
        if(user.position != ""){
            htmlEl += '<li class="align-items-center d-flex justify-content-between list-group-item" id="list_'+user.id+'"><h4 class="fs-1">' + user.name + '<span class="d-block fs-5"><em>' + user.position  + '</em></span></h4>'
            htmlEl += '<div class="d-flex">'
            htmlEl += '<button type="button" onclick="deleteUserList('+user.id+')" class="btn btn-danger btn-sm">Delete</button>'
            htmlEl += '<button type="button" data-bs-toggle="collapse" data-bs-target="#updateCollapse'+user.id+'" class="btn btn-info btn-sm text-white">Update</button>'
            htmlEl += '<button type="button" data-bs-toggle="collapse" data-bs-target="#viewTaskCollapse'+user.id+'" class="btn btn-success btn-sm text-white">View Task</button>'
            htmlEl += '</div>'
            htmlEl += '</li>'
            htmlEl += '<div class="collapse" id="updateCollapse'+user.id+'">'
                htmlEl += '<div class="card card-body">'
                    htmlEl += '<div class="input-group mb-3">'
                        htmlEl += '<input type="text" name="userName'+user.id+'" id="userName'+user.id+'" class="form-control form-control-lg" value="'+user.name+'">'
                        htmlEl += '<input type="text" name="userPos'+user.id+'" id="userPos'+user.id+'" class="form-control form-control-lg" value="'+user.position+'">'
                        htmlEl += '<button class="btn btn-secondary" type="button" onclick="saveUpdateUser('+user.id+')">Save Update</button>'
                    htmlEl += '</div>'
                htmlEl += '</div>'
            htmlEl += '</div>';
            htmlEl += '<div class="collapse" id="viewTaskCollapse'+user.id+'">'
                htmlEl += '<div class="card card-body">'
                    htmlEl += '<div class="input-group userTaskLists'+user.id+'" id="userTaskLists" data-userid="'+user.id+'">'
                    htmlEl += '</div>'
                htmlEl += '</div>'
            htmlEl += '</div>';
        }
    });

    const userList = document.querySelector(".user_list ul")
    userList.innerHTML = htmlEl

    const userTask = document.querySelectorAll("#userTaskLists");
    userTask.forEach(uti => {
        const id = uti.getAttribute("data-userid")
        getAssignUser(id)
    })
}

// function delete user from the list
function deleteUserList(id){
    fetch("user_functions/deleteUser.php",{
        method: "POST",
        body: new URLSearchParams("id=" + id)
    }).then(res => res.json())
    .then(res => deleteUser(res, id))
}

function deleteUser(res, id){

    const response = document.querySelector("#response");
    if(res.res === true){
        response.innerHTML = '<div class="alert alert-success p-2" role="alert">'+res.msg+' / # ' + id + '</div>';
    } else {
        response.innerHTML = '<div class="alert alert-danger p-2" role="alert">'+res.msg+'/ # ' + id + '</div>';
    }
    setTimeout(() => {
        const li = document.getElementById("list_"+id);
        li.remove();
        response.querySelector(".alert").remove();
    }, 2000)
}

// update user info
function saveUpdateUser(id){
    const name = document.getElementById("userName"+id);
    const position = document.getElementById("userPos"+id);

    if(name.value === ""){
        name.classList.add("is-invalid")
        return
    } else if(position.value === ""){
        position.classList.add("is-invalid")
        return
    } else {
        name.classList.remove("is-invalid")
        position.classList.remove("is-invalid")
    }

    fetch("user_functions/updateUser.php", {
        method: "POST",
        body: new URLSearchParams("id=" + id + "&name=" +name.value+ "&position=" + position.value)
    }).then(res => res.json())
    .then(
        res => console.log(res)
    )
    getAllUser()
}

// get assign task for each user
function getAssignUser(taskId){
    fetch("user_functions/getAssignUser.php", {
        method: "POST",
        body: new URLSearchParams("user_id=" + taskId)
    }).then(res => res.json())
    .then(res => getAssignTasks(res, taskId))
}

function getAssignTasks(data, taskId){
    let listTaskEl = ""
    if(data.length != 0){
        data.forEach(taskAssign => {
            listTaskEl += '<button class="btn btn-primary me-1">'+taskAssign.title+'</button>';
        })
    } else {
        listTaskEl += '<span class="text-danger alert alert-danger mb-0 p-1">No Task assign!</span>';
    }

    const userTask_id = document.querySelectorAll(".userTaskLists"+taskId);
    userTask_id.forEach(uti => {
        uti.innerHTML = listTaskEl
    })
}

// initialize function
getAllUser()