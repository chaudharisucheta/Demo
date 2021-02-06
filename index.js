
userValues=()=>{

    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let city = document.getElementById("city").value
    
    if(document.getElementById("active").checked)
    {
         document.getElementById("active").value
    }else{ document.getElementById("active").value = "No"}

    let status = document.getElementById("active").value

    let radioinput = document.getElementsByName("customradio")
    for(let i =0;i<radioinput.length;i++){
        if(radioinput[i].checked){
            var gender = radioinput[i].value
            break;
        }
    }

    let data=JSON.stringify({
        firstName : firstName,
        lastName : lastName,
        city : city,
        gender:gender,
        active:status
    })

    return data
    
}

    

//fetch
saveUser=(e)=>{
    e.preventDefault();

    let userData = userValues();
    console.log(userData)

    let response=  fetch('http://localhost:8080/saveUser',{
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json'}
            }).
            then(response=> response.json()).
            then(result=>{alert(result.message)})
            
    }

document.getElementById("btnsubmit").addEventListener('click',saveUser)

 getUsers=()=>{

    let show = `<table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">City</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>`
                
     fetch('http://localhost:8080/getList').
        then(response => response.json()).  
        then(data=>{
            data = data.result
            console.log(data)
            data.forEach(user => {
                    
                    show += `<tbody>
                            <tr>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.city}</td>
                            <td>${user.gender}</td>
                            <td>${user.active}</td>
                        </tr>
                        </tbody>`
                    })
                    document.getElementById("table").innerHTML = show
                })

                
        }

getUsers()