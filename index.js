var inquirer = require("inquirer");
var fs = require('fs');

inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your name?"
  },
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?"
  },
  {
    type: "input",
    name: "descriptionShort",
    message: "What is the project's description(short version)?"
  },
  {
    type: "input",
    name: "descriptionLong",
    message: "What is the project's description(detailed version)?"
  },
  {
    type: "confirm",
    name: "liveLink_yes",
    message: "Is there a live link to this project?"
  },
  {
    type: "input",
    name: "liveLink",
    message: "What is the project's live link (e.g.-'http:\\UserName.github.io\index.html')?"
  },
  {
    type: "input",
    name: "images",
    message: "what are the local locations of your individual images (separate with a comma. e.g.-'.\assests\image.png, .\assets\image2.png')?"
  },
  {
    type: "input",
    name: "install",
    message: "What are your notes on how to install this project (separate with a comma)?"
  },
  {
    type: "input",
    name: "usage",
    message: "What are your notes on how to use this project (separate with a comma)?"
  },
  {
    type: "input",
    name: "contributors",
    message: "Who else is contributing to this project (separate with a comma)?"
  },
  {
    type: "input",
    name: "contributors_links",
    message: "What contributing links do you want to include for this project (separate with a comma)?"
  },
  {
    type: "checkbox",
    message: "Which license do you have for this project?",
    name: "licence",
    choices: [
      "MIT",
      "GNU AGPLv3",
      "other",
      "none"
    ]
  },
  {
    type: "input",
    name: "other",
    message: "What type of license do you have, if you selected 'other' from the previous question?"
  },
  {
    type: "input",
    name: "license_address",
    message: "Where is the license file for this project (e.g.-'.\license.txt')?"
  },
  {
    type: "input",
    name: "githubRepo",
    message: "What is your Github repository address?",
  },
  {
    type: "input",
    name: "contact",
    message: "What is your email address?"
  }
]).then(function (data) {
//variables
  var filename = data.name.toLowerCase().split(' ').join('') + ".md";
  var badge = "![License: " + data.license + "](https://img.shields.io/badge/License-" + data.license + "-red.svg)";
  var singleImage = data.images.split(",");
  var singleContributor = data.contributors.split(",");
  var singleContributorLink = data.contributors_links.split(",");
  var singleTest = data.tests.split(",");
  var singleInstall = data.install.split(",");
  var singleUsage = data.usage.split(",");

//create readme file, include license badge, title and short description
  fs.writeFileSync(filename, badge + "\r\n# Title: " + JSON.stringify(data.projectName, null).replace(/"/g, '').replace(/\s/g, '') + "\r\n" + data.descriptionShort + "\r\n\n");
//add the live link to file
  if (data.liveLink_yes) {
    fs.appendFileSync(filename, "\t![Live Link: ](" + data.liveLink + ") \r\n\n");
  };
//add the full description and table of contents
  fs.appendFileSync(filename, "## Description \r\n" + data.descriptionLong + " \r\n\n## Table of Contents \r\n\t [Installation](#installation) \n\t [Usage](#usage) \n\t [License](#license) \n\t [Contributing](#contributing) \n\t [Tests](#tests) \n\t [Questions](#questions) \n\n");
//add install notes
  fs.appendFileSync(filename, "## Install \r\n");
  if (singleInstall == null || undefined) {
    fs.appendFileSync(filename, "\t* none \r\n");
  }
  for (var i = 0; i < singleInstall.length; i++) {
    fs.appendFileSync(filename, "\t* " + singleInstall[i].replace(/\s/g, '') + " \r\n")
  };
//add usage notes including pics
  fs.appendFileSync(filename, "## Usage \r\n");
  if (singleUsage == null || undefined) {
    fs.appendFileSync(filename, "\t* none \r\n");
  }
  for (var i = 0; i < singleUsage.length; i++) {
    fs.appendFileSync(filename, "\t* " + singleUsage[i].replace(/\s/g, '') + " \r\n")
  };
  for (var i = 0; i < singleImage.length; i++) {
    fs.appendFileSync(filename, "\t ![Image](img src='" + singleImage[i].replace(/\s/g, '') + "')  \r\n\n");
  };
  //add licence
  if (data.license = "MIT") {
    fs.appendFileSync(filename, "\n## License \r\n\t* Licensed under the ![MIT](" + data.license_address + ") license.");
  }
  if (data.license = "GNU AGPLv3") {
    fs.appendFileSync = (filename, "\n## License \r\n\t* Licensed under the ![GNU AGPLv3](" + data.license_address + ") license.");
  };
  if (data.license = "other") {
    fs.appendFileSync = (filename, "\n## License \r\n\t* Licensed under the ![" + data.other + "](" + data.license_address + ") license.");
  };
//add contributors
  fs.appendFileSync(filename, "\n## Contributing \r\n" + data.name + "\r\n\t![Github Repository: ](" + data.githubRepo + ")\r\n\t![Email: ]<" + data.contact + ">\r\n\t## Contributors \r\n");

  if (singleContributor == null || undefined) {
    fs.appendFileSync(filename, "\t* none \r\n");
  }
  for (var i = 0; i < singleContributor.length; i++) {
    fs.appendFileSync(filename, "\t* " + singleContributor[i].replace(/\s/g, '') + " \r\n");
  }; 

  fs.appendFileSync(filename, "\r\n");
  for (var i = 0; i < singleContributorLink.length; i++) {
    fs.appendFileSync(filename, "\t* " + singleContributorLink[i].replace(/\s/g, '') + " \r\n");
  };
//add tests
fs.appendFileSync(filename, "## Tests \r\n");
  if (singleTest == null || undefined) {
    fs.appendFileSync(filename, "\t* none \r\n");
  }
  for (var i = 0; i < singleTest.length; i++) {
    fs.appendFileSync(filename, "\t* " + singleTest[i].replace(/\s/g, '') + " \r\n");
  };
//add questions section
  fs.appendFileSync(filename, "## Questions \r\n" + "Send questions to: ![Email: ]<" + data.contact + ">\r\n");



  console.log("Your ReadMe file should be in this project's root directory!");
});
