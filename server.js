// require('dotenv').config();
const { askQuestions } = require('./queries/inquirer');


// const PORT = process.env.PORT || 3001;





function init() {
    askQuestions();
}

init();