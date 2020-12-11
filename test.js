
const inquirer = require("inquirer");
const fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    }, {
        type: "input",
        name: "tests",
        message: "What tests are included (separate with a coma)?"
    }, {
        type: "input",
        name: "contributors",
        message: "Who else is contributing to this project (separate with a comma)?"
    },
    {
        type: "input",
        name: "contributors_links",
        message: "What contributing links do you want to include for this project (separate with a comma)?"
    },

]).then(function (data) {
    //variables
    var filename = data.name.toLowerCase().split(' ').join('') + ".md";
    // var badge = "![License: " + data.license + "](https://img.shields.io/badge/License-" + data.license + "-red.svg)";
    // var singleImage = data.images.split(",");
    var singleContributor = data.contributors.split(",");
    var singleContributorLink = data.contributors_links.split(",");
    var singleTest = data.tests.split(",");
    // var singleInstall = data.install.split(",");
    // var singleUsage = data.usage.split(",");


    //add contributors
    fs.appendFileSync(filename, "\n## Contributing \r\n" + data.name + "\r\n\t![Github Repository: ](" + data.githubRepo + ")\r\n\t![Email: ]<" + data.contact + ">\r\n\t## Contributors \r\n");
    console.log("FILENAME: " + filename + " , DATA.NAME: " + data.name + " , DATA.GITHUBREPO: " + data.githubRepo + " , DATA.CONTACT: " + data.contact);
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
