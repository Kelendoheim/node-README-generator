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
      message: "State if you are open to contributions and what your requirements are for accepting them"
    },
    {
      type: "input",
      name: "tests",
      message: "Please include any tests that can be performed on this project:"
    },
    {
      type: "input",
      name: "authors",
      message: "List your collaborators, if any, with links to their GitHub profiles:"
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
    let selectedLicense = ""
    if (answers.license === "GNU GPLv3"){
        selectedLicense = "GNU"
    } else if (answers.license === "MIT") {
        selectedLicense = "MIT"
    }
    
    const badge = "![license](https://img.shields.io/badge/license-" + selectedLicense + "-green)"
  return `
  # ${answers.title}
  
  ${badge}
  <a name="description"></a>
  ## Description
  ${answers.description}

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Visuals](#visuals)
  * [Contributing](#contributing)
  * [Authors and Acknowledgments](#authors)
  * [Tests](#tests)
  * [Questions](#questions)
  * [License](#license)
  
  <a name="installation"></a>
  ## Installation
  ${answers.installation}
  
  <a name="usage"></a>
  ## Usage
  ${answers.usage}

  <a name="visuals"></a>
  ## Visuals

  
  <a name="contributing"></a>
  ## Contributing
  ${answers.contributing}

  <a name="authors"></a>
  ## Authors and Acknowledgements
  ${answers.authors}
  
  <a name="tests"></a>
  ## Tests
  ${answers.tests}

  <a name="questions"></a>
  ## Questions
  Any questions regarding this project can be sent to ${answers.email} or contacted via https://github.com/${answers.github}
  
  
  <a name="license"></a>
  ## License
  ${answers.license}
  ${badge}
  
  
  `;
}

promptUser()
  .then(function(answers) {
    console.log(answers.license)
    
    const mdFile = generateMD(answers);

    return writeFileAsync("README2.md", mdFile);
  })
  .then(function() {
    console.log("Successfully wrote a new README.md. Please add screenshots in the visual section manually.");
  })
  .catch(function(err) {
    console.log(err);
  });
