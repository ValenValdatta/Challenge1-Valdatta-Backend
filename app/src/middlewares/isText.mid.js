function isText (req, res, next) {
    try {
        const {title} = req.body
        if (!title) {
            const err = new Error("instert title")
            err.statusCode = 400
            throw err
        } else {
            return next()
        }
    } catch (error) {
        return next(error)
    }
}

export default isText;