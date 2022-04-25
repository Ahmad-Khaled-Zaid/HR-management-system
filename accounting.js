"use strict";
let tableSection = document.getElementById("table");
let table = document.createElement("table");
tableSection.appendChild(table);
let ParsedArr = JSON.parse(getLocalData());
console.log(ParsedArr);
let departments = ["Administration", "Finance", "Marketing", "Development"];
let employeeTotal = 0;
let salaryTotal = 0;
let avgDepartmentsTotal = 0;
let totalsArray = [];

//function to render the first Row (Header)
function tableHeader() {
  let headerRow = document.createElement("tr");
  table.appendChild(headerRow);
  let departmentLabel = document.createElement("th");
  headerRow.appendChild(departmentLabel);
  departmentLabel.textContent = "Department";
  let numberOfEmployee = document.createElement("th");
  headerRow.appendChild(numberOfEmployee);
  numberOfEmployee.textContent = "Number Of Employee";
  let totalSalary = document.createElement("th");
  headerRow.appendChild(totalSalary);
  totalSalary.textContent = "Total Salary";
  let avgSalary = document.createElement("th");
  headerRow.appendChild(avgSalary);
  avgSalary.textContent = "Average Salary";
}
tableHeader();

function TableBody() {
  for (let i = 0; i < departments.length; i++) {
    let row = document.createElement("tr");
    table.appendChild(row);
    let departmentColumn = document.createElement("td");
    row.appendChild(departmentColumn);
    departmentColumn.textContent = departments[i];
    let numberOfEmployeeColumn = document.createElement("td");
    row.appendChild(numberOfEmployeeColumn);
    let totalNumberOfEmployee = 0;
    for (let j = 0; j < ParsedArr.length; j++) {
      if (departments[i] === ParsedArr[j].department) {
        totalNumberOfEmployee++;
      }
    }
    employeeTotal += totalNumberOfEmployee;

    numberOfEmployeeColumn.textContent = totalNumberOfEmployee;
    let totalSalary = 0;
    let totalSalaryColumn = document.createElement("td");
    row.appendChild(totalSalaryColumn);
    for (let j = 0; j < ParsedArr.length; j++) {
      if (departments[i] === ParsedArr[j].department) {
        totalSalary += ParsedArr[j].salary;
      }
    }
    salaryTotal += totalSalary;
    totalSalaryColumn.textContent = totalSalary;
    let avgSalary = 0;
    let avgSalaryColumn = document.createElement("td");
    row.appendChild(avgSalaryColumn);
    avgSalary = totalSalary / totalNumberOfEmployee;
    avgSalaryColumn.textContent = Math.floor(avgSalary);
    avgDepartmentsTotal += avgSalary;
  }
  totalsArray.push(employeeTotal, salaryTotal, avgDepartmentsTotal);
  console.log(totalsArray);
}
TableBody();
function tableFooter() {
  let footerRow = document.createElement("tr");
  table.appendChild(footerRow);
  let totalsLabel = document.createElement("th");
  footerRow.appendChild(totalsLabel);
  totalsLabel.textContent = "Totals";
  for (let k = 0; k < totalsArray.length; k++) {  
    let footerData = document.createElement("th");
    footerRow.appendChild(footerData);
    footerData.textContent =Math.floor (totalsArray[k]);
  }
}
tableFooter();

// function to get data from the local storage
function getLocalData() {
  let EmployeeData = localStorage.getItem("Employee");
  console.log(EmployeeData);
  return EmployeeData;
}
