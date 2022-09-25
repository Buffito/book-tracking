require("dotenv").config();

const app = require('./app');

const host = process.env.HOST;
const port = process.env.PORT;

async function main(){
    app.listen(port);
    console.log(`Server Started on http://${host}:${port}`);
}

main();