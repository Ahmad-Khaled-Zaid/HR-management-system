"use strict";
let employeeCard = document.getElementById("root");

// from w3-schools
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let employeeArray = [];
let uniqueID = 1000;

// function to get the stored Data from the local storage
function getLocalStorageData() {
  let getStorage = JSON.parse(localStorage.getItem("Employee"));
  return getStorage;
}

// constructor to create Employee instances
function Employee(name, department, level, image) {
  this.name = name;
  this.id = uniqueID++;
  this.department = department;
  this.level = level;
  this.image = image;
  this.salary = 0;
  employeeArray.push(this);
}

// function to create random salary depending on the level
Employee.prototype.calculateSalary = function () {
  if (this.level === "Senior") {
    this.salary = random(1500, 2000);
    this.salary = Math.floor(this.salary - this.salary * 0.075);
  } else if (this.level === "Mid-Senior") {
    this.salary = random(1000, 1500);
    this.salary = Math.floor(this.salary - this.salary * 0.075);
  }
  if (this.level === "Junior") {
    this.salary = random(500, 1000);
    this.salary = Math.floor(this.salary - this.salary * 0.075);
  }
};

// instances
let Ghazi = new Employee(
  "Ghazi Samer",

  "Administration",
  "Senior",
  "https://images.unsplash.com/photo-1531537026280-7bb019dacf9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
);
let Lana = new Employee(
  "Lana Ali",

  "Finance",
  "Senior",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwZW1wbG95ZWV8ZW58MHx8MHx8&w=1000&q=80"
);
let Tamara = new Employee(
  "Tamara Ayoub",

  "Marketing",
  "Senior",
  "https://img.rasset.ie/0014bbb3-1600.jpg"
);
let Safi = new Employee(
  "Safi Walid",

  "Administration",
  "Mid-Senior",
  "https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2FLegal-Requirements-Hiring-Employees.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.4754&fp-y=0.3321&h=415&q=88&w=622&s=de4e8920342f8a282aadb2e0aef49ef6"
);

let Omar = new Employee(
  "Omar Zaid",

  "Development",
  "Senior",
  "https://media.istockphoto.com/photos/portrait-of-young-happy-indian-business-man-executive-looking-at-picture-id1309489745?b=1&k=20&m=1309489745&s=170667a&w=0&h=Wo_7nESC_ePyEYfEsnOm-rP6ElkxbWqIB3Ga4W3nw8M="
);
let Rana = new Employee(
  "Rana Saleh",

  "Development",
  "Junior",
  "https://www.corsource.com/wp-content/uploads/2019/12/bigstock-Young-Pretty-Lady-Reading-Docu-252962599-1-e1576109625228.jpg"
);
let Hadi = new Employee(
  "Hadi Ahmad",

  "Finance",
  "Mid-Senior",
  "https://media.istockphoto.com/photos/shot-of-a-young-businessman-using-a-laptop-in-a-modern-office-picture-id1354898581?b=1&k=20&m=1354898581&s=170667a&w=0&h=Jkv4uO6gEaLFtz6F22ZrEk4VQljqLNKMuVpdRlIYoEY="
);

// function to re-instantiation
function re_instantiation() {
  if (getLocalStorageData() !== null) {
    employeeArray = [];
    for (let i = 0; i < getLocalStorageData().length; i++) {
      employeeArray[i] = new Employee(
        getLocalStorageData()[i].name,
        getLocalStorageData()[i].department,
        getLocalStorageData()[i].level,
        getLocalStorageData()[i].image
      );
    }
  }
}

re_instantiation();

// prototype function to render the instances
Employee.prototype.render = function () {
  let newCard = document.createElement("div");
  employeeCard.appendChild(newCard);
  newCard.className = "Cards";
  let image = document.createElement("img");
  image.className = "photo";
  newCard.appendChild(image);
  image.setAttribute("src", this.image);
  let name = document.createElement("h1");
  newCard.appendChild(name);
  name.textContent = `Name: ${this.name}  -  ID: ${this.id}`;
  let department = document.createElement("h3");
  newCard.appendChild(department);
  department.textContent = ` Department: ${this.department} - Level: ${this.level}`;
  let salary = document.createElement("h4");
  newCard.appendChild(salary);
  salary.textContent = ` ${this.salary} $`;
};

// call calculateSalary function and render function
for (let i = 0; i < employeeArray.length; i++) {
  employeeArray[i].calculateSalary();
  employeeArray[i].render();
}

let form = document.getElementById("form");
form.addEventListener("submit", submitter);

//function to submit the form
function submitter(event) {
  console.log(event);
  event.preventDefault();
  let fullName = event.target.name.value;
  let department = event.target.select1.value;
  let level = event.target.select2.value;
  let image = event.target.URL.value;
  let newEmployee = new Employee(fullName, department, level, image);
  newEmployee.calculateSalary();
  newEmployee.render();
  updateLocalStorage();
}

function updateLocalStorage() {
  let SrtingArr = JSON.stringify(employeeArray);
  localStorage.setItem("Employee", SrtingArr);
}
updateLocalStorage();
