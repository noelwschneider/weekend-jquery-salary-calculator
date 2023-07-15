$(document).ready(onReady);

// Startup function
function onReady() {
    // Listener for the submit button
    $('#submit-button').on('click', handleSubmit);
    $('#employee-table-body').on('click', '.delete-button', deleteRow);
}

// Variable for collecting employee salaries
let monthlyCosts = 0;

// Function to delete table rows
function deleteRow() {

    // Subtracting monthly costs for the removed employee
    let removedSalary = $(this).parent().siblings('.annual-salary-entry').text();
    monthlyCosts -= removedSalary / 12;
    if(monthlyCosts > 20000) {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value" class="over-budget">${monthlyCosts}</span>`)
    } else {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value">${monthlyCosts}</span>`)
    }

    // Removing the row
    $(this).parent().parent().remove();
}

// function to:
    // Gather user data
    // Send user data to the table
    // Add and display monthly costs (based on salary input)
function handleSubmit() {
    // Variables to store input data
    let firstName = $('#first-name-input').val();
    let lastName = $('#last-name-input').val();
    let id = $('#id-input').val();
    let title = $('#title-input').val();
    // Probably worth adding the abi
    let annualSalary = $('#annual-salary-input').val();
    
    // Adding submitted salary to the monthly costs variable
    monthlyCosts += annualSalary / 12;
    if(monthlyCosts > 20000) {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value" class="over-budget">${monthlyCosts}</span>`)
    } else {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value">${monthlyCosts}</span>`)
    }

    // Clearing input forms
    $('#first-name-input').val('');
    $('#last-name-input').val('');
    $('#id-input').val('');
    $('#title-input').val('');
    $('#annual-salary-input').val('');

    // Adding a row to the table
    $('#employee-table-body').append(`
    <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${id}</td>
        <td>${title}</td>
        <td class='annual-salary-entry'>${annualSalary}</td>
        <td><button class="delete-button">Delete</button></td>
    </tr>
    `); // end of append
}