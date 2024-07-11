import winston from "../utils/wisnton.util.js"

function errorHandler (error, req, res, next) {
    const message = `${req.method} - ${req.url} - ${new Date().toLocaleTimeString()} - ${error.message}`
    winston.ERROR(message)
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "CODER API ERROR"
    })
}


export default errorHandler