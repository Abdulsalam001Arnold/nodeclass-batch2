

function errorHandler(err, req, res, next) {
    console.error("Error: ", err)
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        error: true,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
        cause: err.cause
    })
    next()
}

module.exports = {errorHandler}