// require('dotenv').config();
const { askQuestions } = require('./queries/inquirer');


// const PORT = process.env.PORT || 3001;





function init() {
    console.log(`.--------------------------------------------------------------.`);
    console.log(`| _____                      _____               _             |`);
    console.log(`||_   _|__  __ _ _ __ ___   |_   _| __ __ _  ___| | _____ _ __ |`);
    console.log("|  | |/ _ \\/ _` | '_ ` _ \\    | || '__/ _` |/ __| |/ / _ \\ '__||");
    console.log("|  | |  __/ (_| | | | | | |   | || | | (_| | (__|   <  __/ |   |");
    console.log(`|  |_|\\___|\\__,_|_| |_| |_|   |_||_|  \\__,_|\\___|_|\\_\\___|_|   |`);
    console.log("'--------------------------------------------------------------'");

    askQuestions();
}

init();