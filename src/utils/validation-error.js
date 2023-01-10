const { StatusCodes } = require('http-status-codes');
const AppError = require('./error-handler')

class ValidationError extends AppError{
    constructor(error){
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        super(
            errorName,
            'Not able to validate data sent in request',
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
}

module.exports = ValidationError;