$(document).ready(onReady);

function onReady() {
    
    // Listener for the submit button
    $('#submit-button').on('click', handleSubmit)
}

function handleSubmit() {
    
    // Variables to store input data
    let firstName = $('#first-name-input').val();
    let lastName = $('#last-name-input').val();
    let id = $('#id-input').val();
    let title = $('#title-input').val();
    let annualSalary = $('#annual-salary-input').val();

    console.log(firstName);
    console.log(lastName);
    console.log(id);
    console.log(title);
    console.log(annualSalary);

    $('#employee-table').append(`
    <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${id}</td>
        <td>${title}</td>
        <td>${annualSalary}</td>
        <td><button class=".delete-button">Delete</button></td>
    </tr>
    `)
}