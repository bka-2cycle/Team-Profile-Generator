const fs = require('fs');
const inquirer = require('inquirer');
const { url } = require('inspector');



const Manager = require('./manager');
const Engineer = require('./engineer');
const Intern = require('./intern');

const employeeArray = [];
let htmlMarkup = "";


// wrap all prompts for manager in a function
mgrQuestions = function() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'mgrname',
            message: 'Enter the name of the team manager:',
        },
        {
            type: 'input',
            name: 'mgrid',
            message: 'Enter the team manager\'s ID #:',
        },
        {
            type: 'input',
            name: 'mgremail',
            message: 'Enter the team manager\'s Email:',
        },
        {
            type: 'input',
            name: 'mgrofficenum',
            message: 'Enter the team manager\'s office #:',
        }
    ]).then ((response) => {
        const manager = new Manager (response.mgrname, response.mgrid, response.mgremail, response.mgrofficenum);
        employeeArray.push(manager);
        optQuestion();
    });
}


        
//wrap all prompts for engineer in a function
engQuestions = function() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'engname',
            message: 'Enter the name of the engineer:',
        },
        {
            type: 'input',
            name: 'engid',
            message: 'Enter the engineer\'s ID #:',
        },
        {
            type: 'input',
            name: 'engmail',
            message: 'Enter the engineer\'s Email:',
        },
        {
            type: 'input',
            name: 'engghun',
            message: 'Enter the engineer\'s GitHub user name:',
        }
    ]).then ((response) => {
        const engineer = new Engineer (response.engname, response.engid, response.engmail, response.engghun);
        employeeArray.push(engineer);
        optQuestion();
    }
    )};
        

        
//wrap all prompts for intern in a function
intQuestions = function() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'intname',
            message: 'Enter the name of the intern:',
        },
        {
            type: 'input',
            name: 'intid',
            message: 'Enter the intern\s ID #:',
        },
        {
            type: 'input',
            name: 'intmail',
            message: 'Enter the intern\s Email:',
        },
        {
            type: 'input',
            name: 'intschool',
            message: 'Enter the name of the intern\s school:',
        }
    ]).then ((response) => {
        const intern = new Intern (response.intname, response.intid, response.intmail, response.intschool);
        employeeArray.push(intern);
            optQuestion();
        }
    )};


optQuestion = function() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'inputchoice',
            message: 'Please choose an option:',
            choices: ['Add an engineer', 'Add an intern', 'Finish building team'],
        }
    ]).then ((response) => {
        if (response.inputchoice == "Add an engineer") {
        engQuestions()
    }
    else if (response.inputchoice == "Add an intern") {
        intQuestions()
    }
    else {
        const fileName = 'index.html'
        
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=, initial-scale=1.0">
    
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" 
        crossorigin="anonymous">
    
        <!-- Google Fonts -->
    
        <link rel="stylesheet" href="./style.css" />
    
        <title>Team Profile Generator</title>
    </head>
    <body>
    <header>
    <h1>My Team</h1>
    </header>
    <div id='all-cards'>
    ${cardHtml(employeeArray)}
    </div>
      
    
    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
        crossorigin="anonymous"></script>
    
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" 
        integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" 
        crossorigin="anonymous"></script>
    
        <script src="./assets/script.js"></script>
    
    </body>
    </html>`

    
        fs.writeFile(fileName, html, (err) =>
        err ? console.log(err) : console.log('Success!')
      );
    }
    });
}


    
        
  

    
function cardHtml (data) {
    
    for (let i = 0; i < data.length; i++) {
        //getRole returns the type of employee
        if (data[i].getRole() === "Manager") {
            htmlMarkup +=

`<div class="card" style="width: 18rem;">
  <div class="card-header">&#xF18F; ${data[i].getRole()}</div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${data[i].getName()}</li>
    <li class="list-group-item">ID: ${data[i].getId()}</li>
    <li class="list-group-item">Email: ${data[i].getEmail()}</li>
    <li class="list-group-item">Office #: ${data[i].getOfficeNumber()}</li>
</div>`

        }
        if (data[i].getRole() === "Engineer") {
            htmlMarkup +=

`<div class="card" style="width: 18rem;">
  <div class="card-header">&#xF4B2; ${data[i].getRole()}</div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${data[i].getName()}</li>
    <li class="list-group-item">ID: ${data[i].getId()}</li>
    <li class="list-group-item">Email: ${data[i].getEmail()}</li>
    <li class="list-group-item">GitHub:${data[i].getGithub()}</li>
</div>`
        }
        if (data[i].getRole() === "Intern") {
            htmlMarkup +=

`<div class="card" style="width: 18rem;">
  <div class="card-header">&#xF6FE; ${data[i].getRole()}</div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${data[i].getName()}</li>
    <li class="list-group-item">ID: ${data[i].getId()}</li>
    <li class="list-group-item">Email: ${data[i].getEmail()}</li>
    <li class="list-group-item">School: ${data[i].getSchool()}</li>
</div>`
        }
    }
    return htmlMarkup;
};


mgrQuestions();

