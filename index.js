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
    message: "If yes, What is the project's live link (e.g.-'http:\\UserName.github.io\index.html')(otherwise,press ENTER)?"
  },
  {
    type: "input",
    name: "images",
    message: "What are the local locations of your individual images (separate with a comma. e.g.-'.\assests\image.png, .\assets\image2.png')?"
  },
  {
    type: "input",
    name: "install",
    message: "What are your notes on how to INSTALL this project (separate with a comma)?"
  },
  {
    type: "input",
    name: "usage",
    message: "What are your notes on how to USE this project (separate with a comma)?"
  },
  {
    type: "input",
    name: "tests",
    message: "What tests are included (separate with a coma)?"
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
    type: "rawlist",
    message: "Which license is being used for this project?",
    name: "license",
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
    message: "if you selected 'other', what type of license do you have (otherwise,press ENTER)?"
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
  var badge = "![License: " + data.license + "](https://img.shields.io/badge/License-" + data.license.replace(/\s/g, '-') + "-red.svg)";
  var singleImage = data.images.split(",");
  var singleContributor = data.contributors.split(",");
  var singleContributorLink = data.contributors_links.split(",");
  var singleTest = data.tests.split(",");
  var singleInstall = data.install.split(",");
  var singleUsage = data.usage.split(",");

  //create readme file, include license badge, title and short description
  fs.writeFileSync(filename, badge + "\r\n# " 
  + JSON.stringify(data.projectName, null).replace(/"/g, '').replace(/\s/g, '') + "\r\n" + data.descriptionShort + "\r\n\n");

  //add the live link to file
  if (data.liveLink_yes) {
    fs.appendFileSync(filename, "Live Link: " + data.liveLink + " \r\n\n");
  };
  //add the full description and table of contents
  fs.appendFileSync(filename, "## Description \r\n" + data.descriptionLong 
  + " \r\n\n## Table of Contents \r\n - [Installation](#installation) \n - [Usage](#usage) \n - [License](#license) \n - [Contributor's Links](#contributor's_links) \n - [Contributors](#contributors) \n\n - [Tests](#tests) \n - [Questions](#questions) \n\n");

  //add install notes
  fs.appendFileSync(filename, "## Install \r\n");
  if (singleInstall == null || undefined) {
    fs.appendFileSync(filename, "* none \r\n");
  };
  for (var i = 0; i < singleInstall.length; i++) {
    fs.appendFileSync(filename, "* " + singleInstall[i] + " \r\n")
  };
  //add usage notes including pics
  fs.appendFileSync(filename, "## Usage \r\n");
  if (singleUsage == null || undefined) {
    fs.appendFileSync(filename, "* none \r\n");
  };
  for (var i = 0; i < singleUsage.length; i++) {
    fs.appendFileSync(filename, "* " + singleUsage[i] + " \r\n")
  };
  for (var i = 0; i < singleImage.length; i++) {
    fs.appendFileSync(filename, "\t![Image" + i + "](" + singleImage[i].replace(/\s/g, '') + ")  \r\n\n");
  };
  //add licence
  switch (data.license) {
    case "MIT":
      fs.appendFileSync(filename, "\n## License \r\n* Licensed under the ![MIT](" + data.license_address + ") license.");
      break;
    case "GNU AGPLv3":
      fs.appendFileSync(filename, "\n## License \r\n* Licensed under the ![GNU AGPLv3](" + data.license_address + ") license.");
      break;
    case "other":
      fs.appendFileSync(filename, "\n## License \r\n* Licensed under the ![" + data.other + "](" + data.license_address + ") license.");
      break;
    default:
      fs.appendFileSync(filename, "\n## License \r\n* Licensed under the ![...]( ... ) license.");
  }
  //add contributors
  fs.appendFileSync(filename, "\n## Contributor's links \r\n" + data.name + "\\nGithub Repository: " 
  + data.githubRepo + "\\nEmail: " + data.contact + "\n## Other Contributors \r\n");

  if (singleContributor == null || undefined) {
    fs.appendFileSync(filename, "* none \r\n");
  };

  for (var i = 0; i < singleContributor.length; i++) {
    fs.appendFileSync(filename, "* " + singleContributor[i]+ " \r\n");
  };

  fs.appendFileSync(filename, "\r\n");
  for (var i = 0; i < singleContributorLink.length; i++) {
    fs.appendFileSync(filename, "* " + singleContributorLink[i].replace(/\s/g, '') + " \r\n");
  };
  //add tests
  fs.appendFileSync(filename, "## Tests \r\n");
  if (singleTest == null || undefined) {
    fs.appendFileSync(filename, "* none \r\n");
  };
  for (var i = 0; i < singleTest.length; i++) {
    fs.appendFileSync(filename, "* " + singleTest[i] + " \r\n");
  };
  //add questions section
  fs.appendFileSync(filename, "## Questions \r\n" + "Send questions to:\\n Email: " + data.contact + "\r\n");

  console.log("Your ReadMe file should be in this project's root directory!");
});
