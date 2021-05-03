import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
    let error = {...err };
    console.log(error);
    error.message = err.message;

    if (err.code === 11000) {
        const message = 'User already exists';
        res.status(500).send({  message:message });
        error = new ErrorResponse(message, 400);
        console.log(error)
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        res.status(500).send({  message:message });
        console.log(message)
        error = new ErrorResponse(message, 400);

    }

    res.status(error.statusCode || 500).send({
        success: false,
        error: error.message || 'Server Error' 
    })
}

export  default errorHandler;