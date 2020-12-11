const inquirer = require("inquirer");
const fs = require('fs');


inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "rawlist",
        message: "Which license do you have for this project?",
        name: "license",
        choices: [
            "MIT",
            "GNU AGPLv3",
            "other",
            "none"
        ]
    },

]).then(function (data) {

    //variables
    let filename = data.name.toLowerCase().split(' ').join('') + ".md";
    //  var badge = "![License: " + data.license + "](https://img.shields.io/badge/License-" + data.license + "-red.svg)";
    //  var singleImage = data.images.split(",");
    //  var singleContributor = data.contributors.split(",");
    //  var singleContributorLink = data.contributors_links.split(",");
    //  var singleTest = data.tests.split(",");
    //  var singleInstall = data.install.split(",");
    //  var singleUsage = data.usage.split(",");

    console.log("license TYPE: " + data.license);
//why wont this codeblock work?
    // if (data.license = "GNU AGPLv3") {
    //     fs.appendFileSync(filename, "\n## License \r\n\t* Licensed under the ![GNU AGPLv3](" + data.license_address + ") license.");
    // } else if (data.license = "MIT") {

    //     console.log("why do u keep losing?");
    //     fs.appendFileSync(filename, "\n## License \r\n\t* Licensed under the ![MIT](" + data.license_address + ") license.");
    // } else if (data.license = "other") {
    //     fs.appendFileSync(filename, "\n## License \r\n\t* Licensed under the ![" + data.other + "](" + data.license_address + ") license.");
    // } else {
    //     return console.log("none");
    // };


    switch (data.license) {
        case "MIT":
            fs.appendFileSync(filename, "\n## License \r\n\t* Licensed under the ![MIT](" + data.license_address + ") license.");
            break;
        case "GNU AGPLv3":
            fs.appendFileSync(filename, "\n## License \r\n\t* Licensed under the ![GNU AGPLv3](" + data.license_address + ") license.");
            break;
        case "other":
            fs.appendFileSync(filename, "\n## License \r\n\t* Licensed under the ![" + data.other + "](" + data.license_address + ") license.");
            break;
        default:
            //CHANGE THIS TO SOMETHING MEANINGFUL
            console.log("none")
    }

    console.log("Your ReadMe file should be in this project's root directory!");
});
