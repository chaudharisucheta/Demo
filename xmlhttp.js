//xmlHttpRequest

userValues=()=>{
    console.log("uservalues")
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
    console.log("before return")
    return data
}

addUser=(e)=>{
    console.log("here")
    e.preventDefault();
    let userData = userValues();
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:8080/saveUser')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(userData)

    xhr.onload = ()=>{
        if(xhr.status!=200){
            alert(`Error ${xhr.status}`)
        }else{
            alert(`User saved`)
        }
    }

    xhr.onerror = function() {
        alert("Request failed");
    }
    
}

document.getElementById("btnsubmit").addEventListener('click',addUser)


getUsers=()=>{
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:8080/getList')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.responseType="json"
    xhr.send()

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

    xhr.onload = function(){
        if(xhr.status!=200){
            alert(`Error ${xhr.status}`)
        }else{
            let output = xhr.response.result
            
            output.forEach(user => {
                    
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
            }

        }

    }

getUsers()