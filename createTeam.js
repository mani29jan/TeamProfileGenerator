const Employee = require("./main/Employee");
const Manager = require("./main/Manager");
const Engineer = require("./main/Engineer");
const Intern = require("./main/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "myStaff");
const outputPath = path.join(OUTPUT_DIR, "myStaff.html");

const render = require("./main/htmlRenderer");

const teamArray = [];

// prompts:

// for manager:
const managerPrompts = [

    {
        type: 'input',
        name: 'managerName',
        message: 'Enter name of the team manager, enter your name if you are the team manager.'
    },

    {
        type: 'input',
        name: 'managerID',
        message: 'Enter managers ID, enter your ID if you are the team manager.'
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: 'Enter managers Email, enter your email if you are the team manager.'
    },

    {
        type: 'input',
        name: 'office',
        message: 'Enter managers office number? enter your number if you are the team manager.'
    },
]

//for engineer:
const engineerPrompts = [

    {
        type: 'input',
        name: 'engiName',
        message: 'Please enter name of the Engineer.'
    },

    {
        type: 'input',
        name: 'engiID',
        message: 'Please enter ID of the Engineer.'
    },

    {
        type: 'input',
        name: 'engiEmail',
        message: 'Please enter email of the Engineer.'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Please enter GitHub userid of the Engineer.'
    },
]

//for intern:
const internPrompts = [

    {
        type: 'input',
        name: 'internName',
        message: 'Please enter name of the Intern.'
    },

    {
        type: 'input',
        name: 'internID',
        message: 'Please enter ID of the Intern.',
    },

    {
        type: 'input',
        name: 'internEmail',
        message: 'Please enter email of the Intern.'
    },

    {
        type: 'input',
        name: 'school',
        message: 'What school did this intern attend, enter "N/A" if currently in school.',
    },
]


const anotherOne = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Select "Done" to generate your team or select the type of team member to add another employee.',
        choices: ['Engineer', 'Intern', 'Done']
    }
]
//  prompts end



function init() {
        managerPromt();
}

function next() {
    inquirer.prompt(anotherOne).then((response) => {

        console.log(response);
        switch (response.nextEmployee) {
            case 'Engineer':
                engineerPromt();
                break;
            case 'Intern':
                internPromt();
                break;
            case 'Done':
                console.log('your staff is genrating..')
                makeTeam();
        }
    })
}

function managerPromt() {
    inquirer.prompt(managerPrompts).then((response) => {

        let name = response.managerName;
        let id = response.managerID;
        let email = response.managerEmail;
        let office = response.office;


        const manager = new Manager(name, id, email, office);

        teamArray.push(manager);
        console.log(teamArray);

        next();
    })
}

function engineerPromt() {
    inquirer.prompt(engineerPrompts).then((response) => {

        let name = response. engiName;
        let id = response.engiID;
        let email = response.engiEmail;
        let github = response.github;

        const engineer = new Engineer (name, id, email, github);

        teamArray.push(engineer);
        console.log(teamArray);
        next();
    })
}


function internPromt() {
    inquirer.prompt(internPrompts).then((response) => {

        let name = response. internName;
        let id = response.internID;
        let email = response.internEmail;
        let school = response.school;

        const intern = new Intern (name, id, email, school);

        teamArray.push(intern);
        console.log(teamArray);

        next();
    })
}

function makeTeam() {
fs.writeFile(outputPath, render(teamArray), function(err) {
if (err) {
    return console.log(err)
}
})

}

//call the function
init();
