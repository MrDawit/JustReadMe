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
    message: "What is the project's live link?"
  },
  {
    type: "input",
    name: "image",
    message: "what is the local location of your image?"
  },
  {
    type: "input",
    name: "files",
    message: "What is the name of the files you want to mention in the README(separate using a comma)?"
  },
  {
    type: "input",
    name: "notes",
    message: "what notes do you want included (separate using a comma)?"
  },
  {
    type: "checkbox",
    message: "What technologies were used?",
    name: "stack",
    choices: [
      "HTML",
      "CSS",
      "JavaScript",
      "MySQL",
      "Bootstrap",
      "Jquery",
      "Node.js",
      "DOM"
    ]
  },
  {
    type: "input",
    name: "addTech",
    message: "Add any other technologies:"
  },
  {
    type: "input",
    message: "What is your Github repository address?",
    name: "githubRepo",
  },
  {
    type: "input",
    name: "contact",
    message: "What is your email address?"
  }
]).then(function (data) {

  var filename = data.name.toLowerCase().split(' ').join('') + ".md";
  var singleFile = data.files.split(",");
  var singleNote = data.notes.split(",");
  var singleAddTech = data.addTech.split(",");
  fs.writeFileSync(filename, "# " + JSON.stringify(data.projectName, null).replace(/"/g, '') + "\r\n" + data.descriptionShort + "\r\n\n");

  if (data.liveLink_yes) {
    fs.appendFileSync(filename, "[Live Link:](" + data.liveLink + ") \r\n\n");
  };

  fs.appendFileSync(filename, "\t <img src='" + data.image + "' >  \r\n\n" + "## Description \r\n" + data.descriptionLong + " \r\n\n## Files \r\n");

  for (var i = 0; i < singleFile.length; i++) {
    fs.appendFileSync(filename, "* " + singleFile[i].replace(/\s/g, '') + " \r\n")
  };
  
  fs.appendFileSync(filename, "\n## Technologies Used \r\n");

  for (var i = 0; i < data.stack.length; i++) {
    fs.appendFileSync(filename, "* " + data.stack[i].replace(/\s/g, '') + " \r\n");
  };

  for (var i = 0; i < singleAddTech.length; i++) {
    fs.appendFileSync(filename, "* " + singleAddTech[i].replace(/\s/g, '') + " \r\n");
  };

  fs.appendFileSync(filename, "\n## Notes \r\n");

  for (var i = 0; i < singleNote.length; i++) {
    fs.appendFileSync(filename, "* " + singleNote[i].replace(/\s/g, '') + " \r\n");
  };

  fs.appendFileSync(filename, "\n## Created By  \r\n" + data.name + " \r\n Github Repository: " + data.githubRepo + " \r\n\n Email: " + data.contact);

  console.log("SUCCESS!")
});
