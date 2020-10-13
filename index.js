var inquirer = require("inquirer");
var fs = require('fs');

inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your name?"
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
  }
]).then(function(data) {

  var filename = data.name.toLowerCase().split(' ').join('') + ".md";

  fs.writeFile(filename, JSON.stringify(data.stack, null, '\t'), function(err) {

    if (err) {
      return console.log(err);
    }

    console.log("Success!");

  });
});
