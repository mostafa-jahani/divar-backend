function NotFoundHandler (app) {
    app.use((req, res, use) => {
        res.status(404).json({
            message: "Not Found Route!"
        })
    })
}


module.exports = NotFoundHandler;