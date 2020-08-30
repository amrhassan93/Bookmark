var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var submit = document.getElementById("submitBtn");
var web;
var inputs = document.getElementsByClassName("form-control");
var currentIndex = 0;
var nameAlert = document.querySelector(".name-alert");
var urlAlert = document.querySelector(".url-alert");


if (localStorage.getItem("websiteList") == null) {
    web = [];
} else {
    web = JSON.parse(localStorage.getItem("websiteList"));
    displayData();
}
submit.addEventListener("click", function() {

    if (submit.innerHTML == "Submit") {
        newWeb();
    } else {
        editWeb();
    }
})


function newWeb() {
    addWebsite();
    displayData();
    clearForm();
};

function addWebsite() {
    if (nameInput.value != "" && urlInput.value != "") {

        var website = {
            name: nameInput.value,
            url: urlInput.value,
        }
        web.push(website);
        localStorage.setItem("websiteList", JSON.stringify(web))

    } else {
        alert("please write all")
    }

}

function displayData() {
    var ws = "";
    for (var i = 0; i < web.length; i++) {
        ws +=
            `
      <tr>
        <td>` + web[i].name + `</td>
        <td><button class="btn btn-primary px-4"><a href="` + web[i].url + `" target="_blank"> Visit</a></button></td>
        <td><button onclick=deleteWs(` + i + `) class="btn btn-danger">Delete</button></td>
        <td><button onclick=editWs(` + i + `) class="btn btn-info px-4">Edit</button></td>
      </tr>
     
    `;
    }
    document.getElementById("display").innerHTML = ws;
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].classList.remove("is-valid");
    }

};

function search(searchTxt) {
    var ws = "";
    for (var i = 0; i < web.length; i++) {
        if (web[i].name.toLowerCase().includes(searchTxt.toLowerCase())) {
            ws +=
                `
        <tr>
          <td>` + web[i].name + `</td>
          <td><button class="btn btn-primary px-4"><a href="` + web[i].url + `" target="_blank"> Visit</a></button></td>
          <td><button onclick=deleteWs(` + i + `) class="btn btn-danger">Delete</button></td>
          <td><button onclick=editWs(` + i + `) class="btn btn-info px-4">Edit</button></td>
          </tr>`;
        }
    }
    document.getElementById("display").innerHTML = ws;
}

function deleteWs(index) {
    web.splice(index, 1);
    localStorage.setItem("websiteList", JSON.stringify(web));
    displayData();
};


function editWs(index) {
    submit.innerHTML = "Edit";
    currentIndex = index;
    nameInput.value = web[index].name;
    urlInput.value = web[index].url;
}

function editWeb() {
    editWebsite();
    displayData();
    clearForm();
    submit.innerHTML = "Submit";

}

function editWebsite(index) {

    var website = {
        name: nameInput.value,
        url: urlInput.value,
    }


    web.splice(currentIndex, 1, website);
    localStorage.setItem("websiteList", JSON.stringify(web))
}

nameInput.addEventListener("keyup", function() {
    var nameRejex = /^[A-Z][a-z]{2,8}$/;
    if (nameRejex.test(nameInput.value) == false) {
        nameInput.classList.add("is-invalid");
        submit.disabled = "true";
        nameAlert.style.display = "block";
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
        submit.removeAttribute("disabled");
        nameAlert.style.display = "none";
    }
})

urlInput.addEventListener("keyup", function() {
    var nameRejex = /^https:[/]{2}www[.][a-z]{2,100}[.]/;
    if (nameRejex.test(urlInput.value) == false) {
        urlInput.classList.add("is-invalid");
        submit.disabled = "true";
        urlAlert.style.display = "block";

    } else {
        urlInput.classList.remove("is-invalid");
        urlInput.classList.add("is-valid");
        submit.removeAttribute("disabled");
        urlAlert.style.display = "none";

    }
})


/*

 <*)
  ||______
   (______}
     |  |
     ^  ^

*/