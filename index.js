const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of this project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please describe your project:"
    },
    {
      type: "input",
      name: "installation",
      message: "Please describe how to install what is needed for this project:"
    },
    {
      type: "input",
      name: "usage",
      message: "Provide instructions and examples for use:"
    },
    {
      type: "list",
      message: "Please choose a lisence:",
      name: "license",
      choices: [
        "MIT",
        "GNU GPLv3"
    ]
    },
    {
      type: "input",
      name: "contributing",
      message: "List your collaborators, if any, with links to their GitHub profiles:"
    },
    {
      type: "input",
      name: "tests",
      message: "Please include any tests that can be performed on this project:"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username:"
    },
    {
      type: "input",
      name: "email",
      message: "Enter a point of contact email for questions:"
    }
  ]);
}


function generateMD(answers) {
    // let selectedLicense = ""
    // if (answers.license = "GNU GPLv3"){
    //     selectedLicense = "GNU"
    // } else if (answers.license = "MIT") {
    //     selectedLicense = "MIT"
    // }
    console.log(answers.license)
    const badge = "![license](https://img.shields.io/badge/license-" + "BREAK" + "-green)"
  return `
  # ${answers.title}
  
  ${badge}
  ## Description
  ${answers.description}

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [License](#license)
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}

  ## Visuals

  
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.tests}

  ## Questions
  Any questions regarding this project can be sent to ${answers.email} or contacted via https://github.com/${answers.github}
  
  
  ## License
  ${answers.license}
  ${badge}
  
  
  `;
}

promptUser()
  .then(function(answers) {
    
    const mdFile = generateMD(answers);

    return writeFileAsync("README.md", mdFile);
  })
  .then(function() {
    console.log("Successfully wrote a new README.md. Please add screenshots in the visual section manually.");
  })
  .catch(function(err) {
    console.log(err);
  });
