let helpObj = require("./command/help");
let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");

let inputArr=process.argv.slice(2);
let command=inputArr[0];

switch(command){
    case "tree":
        treeObj.fxnT(inputArr[1]);
        break;
    case "organize":
        organizeObj.fxnO(inputArr[1]);
        break;
    case "help":
        helpObj.fxnH();
        break;
    default:
        console.log("Kindly enter the correct cmd");
        break;
}
