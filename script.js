$(document).ready(onReady);

function onReady() {
    // Listener for the submit button
    $('#submit-button').on('click', handleSubmit);
    $('#employee-table-body').on('click', '.delete-button', deleteRow);
}

// Function to delete table rows
function deleteRow() {
    // console.log('in the delete row function');
    $(this).parent().parent().remove();
}

// function to 
function handleSubmit() {
    // Variables to store input data
    let firstName = $('#first-name-input').val();
    let lastName = $('#last-name-input').val();
    let id = $('#id-input').val();
    let title = $('#title-input').val();
    let annualSalary = $('#annual-salary-input').val();

    // // Logging to test variables
    // console.log(firstName);
    // console.log(lastName);
    // console.log(id);
    // console.log(title);
    // console.log(annualSalary);

    // Adding a row to the table
    $('#employee-table-body').append(`
    <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${id}</td>
        <td>${title}</td>
        <td>${annualSalary}</td>
        <td><button class="delete-button">Delete</button></td>
    </tr>
    `)
}