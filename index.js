const generateHTML = require('./src/generateHTML.js');



const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const jest = require('jest');



const Employee = require ('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const dist_dir = path.resolve(__dirname, 'dist');
const finalPath = path.join(dist_dir, 'index.html');

const render = require('./src/generateHTML.js');



const teamInput = [];
const idInput = []



function init() {


    
    function addManager() {
        console.log("Please start to create your team profile");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What's the manager's name?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the team manager's name.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What's the manager's ID?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter manager's ID.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What's the manager's email?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter manager's email.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What's the manager's office number? (format: 0...9)",
                validate: answer =>  {
                    const pass = answer.match(
                        /^[1-9]\w*$/
                    );
                    if (pass) {
                        return true
                    }
                    return "Please enter office number.";
                    }
                }
        ]). then(answers =>{
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamInput.push(manager);
            idInput.push(answers.managerId);
            addTeam();
        });
    }

    
    //
    function addTeam() {

        inquirer.prompt([
            {
                type: "list",
                name: "memberOption",
                message: "What role of employee would you like to add next?",
                choices: [
                    "Engineer",
                    "Intern",
                    "End Application"
                ]
            }
        ]).then(userInput => {
            switch (userInput.memberOption) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generateHTML();
            }
        });
    }


    
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What's the engineer's name?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter Engineer's name";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What's the engineer's ID",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter Engineer's ID.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What's the engineer's email?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter Engineer's email.";
                }
            },
            {
                type: "input",
                name: "engineerGitHub",
                message: "What's the engineer's GitHub username?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the Engineer's GitHub username.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
            teamInput.push(engineer);
            idInput.push(answers.engineerId);
            addTeam();
        });
    }

    
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What's the intern's name?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter Intern's name.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What's the intern's ID",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter Intern's ID.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What's the intern's email?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter Intern's email.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What's the intern's school?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter Intern's school.";
                }
            }
        ]). then(answers =>{
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamInput.push(intern);
            idInput.push(answers.internId);
            addTeam();
        });
    }

    function generateHTML() {
        
        if (!fs.existsSync(dist_dir)) {
            fs.mkdirSync(dist_dir)
        }
        console.log("Generating Team Profile....");
        fs.writeFileSync(finalPath, render(teamInput), "utf-8");
    }

    addManager();
}

init();
         
