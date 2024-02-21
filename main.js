const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

async function main() {
    const port = process.env.PORT;
    require("./src/config/mongoose.config");
    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    })
}


main();