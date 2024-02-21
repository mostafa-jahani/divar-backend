const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require('./src/common/exception/not-found.handler');
const AllExceptionHandler = require('./src/common/exception/all-exception.handler');

async function main() {
    const port = process.env.PORT;
    require("./src/config/mongoose.config");
    app.use(express.json());
    app.use(mainRouter);
    NotFoundHandler(app);
    AllExceptionHandler(app);
    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    })
}


main();