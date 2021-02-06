//axios

userValues = () => {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let city = document.getElementById("city").value;

  if (document.getElementById("active").checked) {
    document.getElementById("active").value;
  } else {
    document.getElementById("active").value = "No";
  }

  let status = document.getElementById("active").value;

  let radioinput = document.getElementsByName("customradio");
  for (let i = 0; i < radioinput.length; i++) {
    if (radioinput[i].checked) {
      var gender = radioinput[i].value;
      break;
    }
  }

  let data = {
    firstName: firstName,
    lastName: lastName,
    city: city,
    gender: gender,
    active: status,
  };
  console.log(data);
  return data;
};

saveuser = (e) => {
  e.preventDefault();
  let userData = userValues();
  axios
    .post("http://localhost:8080/saveUser", userData, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      alert(response.data.message);
    }).catch = (err) => {
    console.log(err);
  };
};

document.getElementById("btnsubmit").addEventListener("click", saveuser);

getUsers = () => {
  let show = `<table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Active</th>
                                </tr>
                            </thead>`;

  axios
    .get("http://localhost:8080/getList")
    .then((response) => {
      let data = response.data.result;
      console.log(data);
      data.forEach((user) => {
        show += `<tbody>
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.city}</td>
                        <td>${user.gender}</td>
                        <td>${user.active}</td>
                    </tr>
                </tbody>`;
      });
      document.getElementById("table").innerHTML = show;
    })
    .catch((err) => {
      console.log(err);
    });
};
getUsers();
