const fs = require('fs');
const inquirer = require('inquirer');
const { url } = require('inspector');



const Manager = require('./manager');
const Engineer = require('./engineer');
const Intern = require('./intern');

const employeeArray = [];
let htmlMarkup = "";


// wrap all prompts for manager in a function
mgrQuestions = function () {
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
        ]).then((response) => {
            const manager = new Manager(response.mgrname, response.mgrid, response.mgremail, response.mgrofficenum);
            employeeArray.push(manager);
            optQuestion();
        });
}



//wrap all prompts for engineer in a function
engQuestions = function () {
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
        ]).then((response) => {
            const engineer = new Engineer(response.engname, response.engid, response.engmail, response.engghun);
            employeeArray.push(engineer);
            optQuestion();
        }
        )
};



//wrap all prompts for intern in a function
intQuestions = function () {
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
        ]).then((response) => {
            const intern = new Intern(response.intname, response.intid, response.intmail, response.intschool);
            employeeArray.push(intern);
            optQuestion();
        }
        )
};

//option question inside a function with literal html file to be written at prompt exit
optQuestion = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'inputchoice',
                message: 'Please choose an option:',
                choices: ['Add an engineer', 'Add an intern', 'Finish building team'],
            }
        ]).then((response) => {
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
        <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Yeseva+One&display=swap" rel="stylesheet">
    
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Permanent+Marker&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="./style.css" />
    
        <title>Team Profile Generator</title>
    </head>
    <body>
    <header>
    <h1>MY TEAM</h1>
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






//function to take data collected from prompts and insert into html cards, then inserted into the literal html page above
function cardHtml(data) {

    for (let i = 0; i < data.length; i++) {
        //getRole returns the type of employee
        if (data[i].getRole() === "Manager") {
            htmlMarkup +=

                `<div class="card" style="width: 18rem;">
  <div class="card-header"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
  <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
</svg> ${data[i].getRole()}</div>
  <ul class="list-group list-group-flush">
    <li id="the-name" class="list-group-item">${data[i].getName()}</li>
    <li class="list-group-item">ID: ${data[i].getId()}</li>
    <li class="list-group-item">Email: <a href="mailto:${data[i].getEmail()}">${data[i].getEmail()}</a></li>
    <li class="list-group-item">Office #: ${data[i].getOfficeNumber()}</li>
</div>`

        }
        if (data[i].getRole() === "Engineer") {
            htmlMarkup +=

                `<div class="card" style="width: 18rem;">
  <div class="card-header"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rulers" viewBox="0 0 16 16">
  <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1H1z"/>
</svg> ${data[i].getRole()}</div>
  <ul class="list-group list-group-flush">
    <li id="the-name" class="list-group-item">${data[i].getName()}</li>
    <li class="list-group-item">ID: ${data[i].getId()}</li>
    <li class="list-group-item">Email: <a href="mailto:${data[i].getEmail()}">${data[i].getEmail()}</a></li>
    <li class="list-group-item">GitHub: <a href="https://github.com/${data[i].getGithub()}" target="_blank">https://github.com/${data[i].getGithub()}</a></li>
</div>`
        }
        if (data[i].getRole() === "Intern") {
            htmlMarkup +=

                `<div class="card" style="width: 18rem;">
  <div class="card-header"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
</svg> ${data[i].getRole()}</div>
  <ul class="list-group list-group-flush">
    <li id="the-name" class="list-group-item">${data[i].getName()}</li>
    <li class="list-group-item">ID: ${data[i].getId()}</li>
    <li class="list-group-item">Email: <a href="mailto:${data[i].getEmail()}">${data[i].getEmail()}</a></li>
    <li class="list-group-item">School: ${data[i].getSchool()}</li>
</div>`
        }
    }
    return htmlMarkup;
};

//start the program
mgrQuestions();

