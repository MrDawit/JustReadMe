var inquirer = require("inquirer");
var fs = require('fs');

inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your name?"
  },
  {
    type:"input",
    name:"projectName",
   message:"What is the name of your project?" 
  },
  {
    type:"input",
    name:"description",
   message:"What is the project's description?" 
  },
  {
    type:"input",
    name:"image",
    message:"what is the local location of your image?"
  },
  // {
  //   type:"input",
  //   name:"numberFiles",
  //   message:"How many of the files included do you want to mention in the README?"
  // },
  {
    type:"input",
    name:"files",
    message:"What is the name of the files you want to mention in the README(separate using a space)?"
  },
  {
    type:"input",
    name:"notes",
    message:"what notes do you want included (separate using a comma)?"
  },
  // {
  //   type: "checkbox",
  //   message: "What technologies were used?",
  //   name: "stack",
  //   choices: [
  //     "HTML", 
  //     "CSS", 
  //     "JavaScript", 
  //     "MySQL",
  //     "Bootstrap",
  //     "Jquery",
  //     "Node.js",
  //     "DOM"
  //   ]
  // },
  // {
  //   type: "input",
  //   name: "addTech",
  //   message: "Add any other technologies:"
  // },
  {
    type: "input",
    message: "What is your Github repository address?",
    name: "githubRepo",
  },
  {
    type:"input",
    name:"contact",
    message:"What is your email address?"
  }
]).then(function(data) {

  var filename = data.name.toLowerCase().split(' ').join('') + ".md";
  var singleFile= data.files.split(" ");
  var singleNote= data.notes.split(",");
 //var hope=JSON.stringify(hope1,"\t");
  fs.writeFileSync(filename,"# " + JSON.stringify(data.projectName, null).replace(/"/g, '')+" \r\n\n" , function(err) {

    if (err) {
      return console.log(err);
    }

    console.log("Success!");

  });
  fs.appendFileSync(filename,"<img src='" + data.image +"' >  \r\n\n",function(err){
    if (err) {
      return console.log(err);
    }

    console.log("Success Again!");
  });
for (let i=0;i<numberFiles;i++){
  fs.appendFile(filename,"* "+data.files[i]+)
}
fs.appendFileSync(filename,"## Description \r\n"+data.description+" \r\n\n",function(err){
  if (err) {
    return console.log(err);
  }   
  console.log("Success ^3!");
});


  fs.appendFileSync(filename,"## Files \r\n",function(err){
    if (err) {
      return console.log(err);
    }
    console.log("Success ^4!");
  });


for(var i=0;i<singleFile.length;i++){
    fs.appendFileSync(filename,"* "+singleFile[i]+" \r\n",function(err){
      if (err) {
        return console.log(err);
      }
  
      console.log(singleFile[i]);
    });
  }

  fs.appendFileSync(filename,"\n## Notes \r\n",function(err){
    if (err) {
      return console.log(err);
    }
    console.log("Success ^6!");
  });


  for(var i=0;i<singleNote.length;i++){
    fs.appendFileSync(filename,"* "+singleNote[i]+" \r\n",function(err){
      if (err) {
        return console.log(err);
      }
  
      console.log(singleNote[i]);
    });
  };

  fs.appendFileSync(filename,"\n## Contact \r\n",function(err){
    if (err) {
      return console.log(err);
    }

    console.log("Success =300!");
  });

  fs.appendFileSync(filename,data.name+" \r\n",function(err){
    if (err) {
      return console.log(err);
    }

    console.log("Success =3000!");
  });
  
  

    fs.appendFileSync(filename,data.githubRepo+" \r\n\n",function(err){
      if (err) {
        return console.log(err);
      }
  
      console.log("Success =>Infinity!");
    });


  

  
});
