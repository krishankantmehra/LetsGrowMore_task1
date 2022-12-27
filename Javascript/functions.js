var cnt = 0
var tasks = []

const form  = document.getElementById('inputForm');
const list  = document.getElementById('list');


// Show the tasks
show = () => {


    if(tasks.length === 0){
        list.innerHTML = "<h4 class='info'>Your tasks will show here.</h4>"
        return;
    }

    
    list.innerHTML = ""; 
    for(var i = 0;i < tasks.length;i++){
        var curTask = tasks[i];
        var ele = document.createElement('div')

        ele.innerHTML = `<div id="task${i}" class="col-10 listitem d-flex flex-row justify-content-between m-auto align-items-center">
            <h6>${i + 1}</h6>
            <div class="col-10 text-left form-check ms-2 p-2  justify-content-start align-items-center" onclick='change(${i})'>
                
                <input class="form-check-input" type="checkbox"  id="checkbox${i}">
                <label class="form-check-label text-uppercase" for="checkbox${i}">
                    ${curTask.task}
                </label>
            </div>

           <div class='col-1 text-center py-1 deleteBtn' onclick='deleteTask(${i})'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
           </div>
        </div>`;

        
        
        ele.classList.add('m-2')
        list.appendChild(ele)

        if(curTask.completed){
            document.getElementById('task' + curTask.id).classList.add('completed')
            document.getElementById('checkbox' + curTask.id).checked = true
        }
    }
}


// Add a new task
addItem = () => {
    console.log('adding....')
    const task= document.getElementById('inputTask').value

    if(task.length === 0){
        swal('Task must be filled.')
        return;
    }

    tasks.push({
        'id': cnt,
        'task':task,
        'completed': false
    })
    cnt++;

    document.getElementById('inputTask').value = ""

    show();
}


// Check/uncheck a task
change = (index) => {
   
    if(!tasks[index].completed){
        tasks[index].completed = true

        item = document.getElementById('task' + index);
        // console.log(item);
        item.classList.add('completed')
        document.getElementById('checkbox' +index).checked = true
    }

    else{
        tasks[index].completed = false

        item = document.getElementById('task' + index);
        // console.log(item);
        item.classList.remove('completed')
        document.getElementById('checkbox' + index).checked = false
    }
}

// Delete task
deleteTask = (index) => {
    swal({
        title: "Are you sure?",
        text: "Do you want to delete the task?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
           tasks.splice(index, 1);

          swal("Your task has been deleted!", {
            icon: "success",
          });
       
          show()
        } 
      });


      
}

// Add event Listner
document.getElementById('inputTask').addEventListener('keydown',e => {
    if(e.key === 'Enter'){
        addItem();
    }
})

// Call for the first time
show()