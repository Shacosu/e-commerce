// Middlewares para manejar los errores
const notFound = (req, res, next) => {
    const error = new Error(`No encontrado - ${req.originalUrl}`);
    res.status(404);
    next(error);
};


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "desarrollo" ? null : err.stack
    })
};

export { notFound, errorHandler };