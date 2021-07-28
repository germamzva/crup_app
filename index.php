<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crud PHP App with Javascipt Fetch API</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body{
            font-family: 'Nunito', sans-serif;
            font-size: 16px;
            font-weight: 600
        }
        span#assigne{
            font-size: 14px;
        }
    </style>
</head>
<body>

    <div class="container">

        <div class="task mt-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control form-control-lg" name="title" id="title" data-input placeholder="Add Task">
                <button class="btn btn-primary" type="button" id="addTask">Add Task</button>
                <a href="user.php" class="btn btn-dark text-white d-flex align-items-center">User List</a>
            </div>
        </div>

        <div class="task_list">
            <div id="response"></div>
            <ul class="list-group">
            </ul>
        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./js/app.js"></script>
</body>
</html>