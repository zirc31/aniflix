const jwt = require('jsonwebtoken');
const SECRET = process.env.APP_SECRET;

const verifyUser = ( request, response, next ) => {

    // Get the token from the request.
    const token = request.headers.authorization.split(' ')[1];

    // Decode the Token, and verify if the token is valid.
    const decoded = jwt.decode( token, SECRET );

    if( decoded ) {
        // if Token valid, allow access.
        console.log(`Middleware: Token valid, User passed, GET /user/data unlocked !`);
        next();
    } else {
        // else Token invalid, return error 401.
        console.log({ status: 401, error: 'Unauthorized' });
        response.status( 401 ).send({ error: 'Unauthorized' });
    }
}

module.exports = { verifyUser };