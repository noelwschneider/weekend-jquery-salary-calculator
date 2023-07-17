$(document).ready(onReady);

// Variable for collecting employee salaries
let monthlyCosts = 0;

// Variable for determining table row color
let tableRowCounter = 0;

// Startup function
function onReady() {
    // Listener for the submit button
    $('#submit-button').on('click', handleSubmit);
    $('#employee-table-body').on('click', '.delete-button', deleteRow);
}

// Function to delete table rows
function deleteRow() {
    tableRowCounter--;

    // Subtracting monthly costs for the removed employee
    let removedSalary = $(this).parent().siblings('.annual-salary-entry').text();
    monthlyCosts -= Math.round(removeCommas(removedSalary) / 12);

    // Conditional to add red background if monthly costs are more than $20,000
    if(monthlyCosts > 20000) {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value" class="over-budget">${addCommas(monthlyCosts)}</span>`);
    } else {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value">${addCommas(monthlyCosts)}</span>`);
    }

    // Removing the row
    $(this).parent().parent().remove();


    for (let i = 1; i <= tableRowCounter; i++) {
    }
} // end of deleteRow

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
    let annualSalary = Math.round($('#annual-salary-input').val());
    
    // Adding submitted salary to the monthly costs variable
    monthlyCosts += Math.round((annualSalary / 12));
    if(monthlyCosts > 20000) {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value" class="over-budget">${addCommas(monthlyCosts)}</span>`)
    } else {
        $('#monthly-costs-value').html(`<span id="monthly-costs-value">${addCommas(monthlyCosts)}</span>`)
    }

    // Clearing input forms
    $('#first-name-input').val('');
    $('#last-name-input').val('');
    $('#id-input').val('');
    $('#title-input').val('');
    $('#annual-salary-input').val('');

    // Determining row color
    tableRowCounter++;
    let rowColorClass;
    if(tableRowCounter % 2 === 0) {
        rowColorClass = 'silver-row';
    } else {
        rowColorClass = 'white-row';
    }

    // Adding a row to the table
    $('#employee-table-body').append(`
    <tr class="${rowColorClass}">
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${id}</td>
        <td>${title}</td>
        <td id="annual-salary-entry-${tableRowCounter}" class="annual-salary-entry" value="${annualSalary}">$${addCommas(annualSalary)}</td>
        <td><button class="delete-button">Delete</button></td>
    </tr>
    `); // end of append
    // console.log($(`#annual-salary-entry-${tableRowCounter}`).val());
    
} // end of handleSubmit()

// Function that returns the number of digits in a number
function getDigits(number) {
    return number.toString().length;
  }
  
// Function that adds commas to numbers > 1000
function addCommas(number) {
    // argument->    return
    // 100     ->       100
    // 1000    ->     1,000
    // 1000000 -> 1,000,000

    // variable to hold the number of digits in the argument
    const digits = getDigits(number);

    // Conditional for if no commas are needed
    if(digits < 4) {
        return number;
    }

    // Variable with how many digits before the first comma
    let leadingDigits = digits % 3;
    console.log('number:', number)
    console.log('leading digits:', leadingDigits)
    console.log('digits:', digits);

    // Variable with the total number of commas needed
    let commasNeeded = Math.floor(digits / 3);
    console.log('commas needed:', commasNeeded)

    // Array to hold each digit
    const arrayOfDigits = [];
    // Variable to turn argument into a string
    let stringedNumber = number.toString();
    // Loop to add digits to array
    for(i=0; i < digits; i++) {
        arrayOfDigits.push(stringedNumber[i]);
    }

    let commasAdded = 0;
    
    let skipCheck;

    if(digits % 3 === 0) {
        console.log('filter activated')
        commasNeeded--;
        console.log('commas needed:', commasNeeded)
        skipCheck = true;
    }

    for(let i = 0; i < commasNeeded; i++) {
        // [1, 2, 3, 4, 5, 6, 7]
        //  0  1  2  3  4  5  6  
        if (skipCheck) {
            leadingDigits +=3;
            skipCheck = false;
        }
        let spliceIndex = leadingDigits + commasAdded + (i * 3);
        commasAdded++;
        arrayOfDigits.splice(spliceIndex, 0, ",");
    }
    return arrayOfDigits.join('')
}

function removeCommas(string) {
    let array = [];
  
    for(let character of string) {
      let nanTest = Number(character);
      if(!isNaN(nanTest)) {
        array.push(nanTest);
      }
    }
  
    return Number(array.join(''))
  }