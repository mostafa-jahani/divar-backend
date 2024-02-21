function AllExceptionHandler (app) {
    app.use((err, req, res, use) => {
        let statusError = err?.status ?? err?.statusCode ?? err?.code;
        if (!statusError || isNaN(+statusError) || statusError > 511 || statusError < 200) status = 500;
        res.status(statusError).json({
            message: err?.message ?? err?.stack ?? "InternalServerError!"
        })
    })
}


module.exports = AllExceptionHandler;