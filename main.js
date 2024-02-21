const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mainRouter = require("./src/app.routes");

async function main() {
    const port = process.env.PORT;
    require("./src/config/mongoose.config");
    app.use(express.json());
    app.use(mainRouter);
    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    })
}


main();