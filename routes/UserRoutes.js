const router = require('express').Router();
const User = require('../models/UserModel');
const {v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.APP_SECRET;


// Middlewares
const { verifyUser } = require('../middlewares/Auth');

// Get user's data. // only the one who is logged in can access this GET.
// GET: http://localhost:8000/api/v1/user/data
// needs to have a token in the Bearer Token in the header.
router.get( '/data', verifyUser, ( request, response ) => {

    const token = request.headers.authorization.split(' ')[1];
    let decoded = jwt.decode( token, SECRET );
    const userdata = {
        userId: decoded.userId,
        username: decoded.username,
        firstName: decoded.firstName,
        middleName: decoded.middleName,
        lastName: decoded.lastName,
        avatarImageUrl: decoded.avatarImageUrl,
        bgImageUrl: decoded.bgImageUrl,
        role: decoded.role
    };
    decoded = null;

    let responseMessage = `GET /user/data`;
    console.log({ status: 200, message: responseMessage });
    return response.status( 200 ).send( { message: responseMessage, data: userdata } );

});


// POST: http://localhost:8000/api/v1/user/login
// POST request : { username: '', password: '' }
router.post( '/login', ( request, response ) => {

    // check for username
    if( request.body.username ) {
        
        User.findOne({ username: request.body.username }).then( dbResponse => {
            // if username does not exist
            if( !dbResponse ) {
                console.log({ status: 404, error: `Invalid credentials!` });
                return response.status( 404 ).send( { error: `Invalid credentials!` } );
            } else {
            // else username exist

                // check for password
                bcrypt.compare( request.body.password, dbResponse.password ).then( isValid => {
                    if( !isValid ){
                        console.log({ status: 404, error: `Invalid credentials!` });
                        return response.status( 404 ).send({ error: `Invalid credentials!` });
                    }else{
                        // Create the token
                        const token = jwt.sign( {
                            id: dbResponse._id,
                            userId: dbResponse.userId,
                            tokedId: dbResponse.tokenId,
                            firstName: dbResponse.firstName,
                            middleName: dbResponse.middleName,
                            lastName: dbResponse.lastName,
                            avatarImageUrl: dbResponse.avatarImageUrl,
                            bgImageUrl: dbResponse.bgImageUrl,
                            role: dbResponse.role,
                            username: dbResponse.username,
                            email: dbResponse.email
                        }, SECRET );
                        console.log({ status: 200, message: 'Login success!', token: token });
                        return response.status( 200 ).send( { message: 'Login success!', token: token, userId: dbResponse.userId, username: dbResponse.username } );
                    }
                });
            }
        });
    } else {
        console.log({ status: 400, error: 'Bad Request!' });
        return response.status( 400 ).send( { error: 'Bad Request!' } );
    }
});


// POST http://localhost:8000/api/v1/user/register
// POST request : { email: '', username: '', password: '' }
router.post( '/register', ( request, response ) => {

    // check if email or username already exist
    User.find({ $or: [ { email: request.body.email }, { username: request.body.username } ] }).then( dbResponse => {

        // if exist return error 400 response.
        if( dbResponse.length > 0 ){
            // A record in the db has an email or has the username
            let responseMessage = `Username or Email already registered!`;
            console.log({ status: 400, error: responseMessage });
            return response.status( 400 ).send( { error: responseMessage } );
        } else {
            // Else no user in the db has that email or username, proceed in creating account for that user.
            // else create user then return 201 response.

            // encrypt the password.
            bcrypt.hash( request.body.password, 10 ).then((hash, err) => {

                const genTokenId = `Tid-` + uuidv4();
                const genUserId = `Uid-` + uuidv4();
                const genSearchId = `sid-` + uuidv4();
                const addNewUser = new User({
                    userId: genUserId,
                    tokenId: genTokenId,
                    searchId: genSearchId,
                    email: request.body.email,
                    username: request.body.username,
                    password: hash,
                    role: "user",
                    status: 'active'
                });

                if( err ) {
                    console.error(err);
                }

                addNewUser.save().then( data => {
                    let responseMessage = `User successfully registered!`;
                    console.log({ status: 201, message: responseMessage });
                    response.status( 201 ).send({ message: responseMessage });
                });
            });
        }
    });

});


// PUT http://localhost:8000/api/v1/user/update
// { "userId": "", "username": "", "updateUser" : {} }
router.put( '/update', ( request, response ) => {

    const thisUserId = request.body.userId;
    const thisUsername = request.body.username;
    const updateUser = request.body.updateUser;

    User.updateOne({$or:[{userId: thisUserId},{username: thisUsername}]}, {$set: updateUser }).then( dbResponse => {
        console.log(dbResponse);
        // if modifiedCount > 0 means there are records that has been updated
        if( dbResponse.modifiedCount > 0 ) {
            let responseMessage = `User with ID ${thisUserId} Successfully Updated!`;
            console.log({ status: 200, message: responseMessage });
            response.status( 200 ).send({ message: responseMessage, data: dbResponse });
        } else {
        // no user has been updated.
            let responseMessage = `User not existing!`;
            console.log({ status: 404, error: responseMessage });
            response.status( 404 ).send({ error: responseMessage });
        }
    })

});


// PUT http://localhost:8000/api/v1/user/:searchId/set?status=inactive/active
router.put( '/:searchId/set', ( request, response ) => {

    const paramsSearchId = request.params.searchId;
    const queryStatus = request.query.status;
    let updateUser = { status: queryStatus };
    const isQuery = request.url.includes('?');

    // this is to make sure the the request is changing from active to inactive only & vise versa.
    if( queryStatus === 'inactive' ) {
    } else if( queryStatus === 'active' ) {
    } else {
        console.log({ status: 400, error: 'Bad Request!' });
        return response.status( 400 ).send( { error: 'Bad Request!' } );
    }

    // check if have query, return error if none.
    if( isQuery ) {
        if( paramsSearchId ) {

            User.updateOne({searchId: paramsSearchId}, {$set: updateUser}).then( dbResponse => {
                if( dbResponse.modifiedCount > 0 ) {
                    let responseMessage = `User has been set to ${queryStatus}!`;
                    console.log({ status: 202, message: responseMessage });
                    response.status( 202 ).send({ message: responseMessage, data: dbResponse });
                } else {
                    let responseMessage = `No record has been set!`;
                    console.log({ status: 404, error: responseMessage });
                    response.status( 404 ).send({ error: responseMessage });
                }
            });
    
        } else {
            // else no params
            console.log({ status: 400, error: 'Bad Request!' });
            return response.status( 400 ).send( { error: 'Bad Request!' } );
        }
    } else {
        // else not a query
        console.log({ status: 400, error: 'Bad Request!' });
        return response.status( 400 ).send( { error: 'Bad Request!' } );
    }

});

//Uid-38949ef4-ceb8-4de3-9566-e87e82b973e4
// DELETE http://localhost:8000/api/v1/user/delete
// { "userId": ""} or {"username": "" } or { "userId": "", "username": "" }
router.delete( '/delete', ( request, response ) => {

    const thisUserId = request.body.userId;
    const thisUsername = request.body.username;

    User.deleteOne({$or:[{userId: thisUserId},{username: thisUsername}]}).then( dbResponse => {
        if( dbResponse.deletedCount > 0 ) {
            let responseMessage = `User has been deleted!`;
            console.log({ status: 200, message: responseMessage });
            response.status( 200 ).send({ message: responseMessage, data: dbResponse });
        } else {
            let responseMessage = `Not found!`;
            console.log({ status: 404, error: responseMessage });
            response.status( 404 ).send({ error: responseMessage });
        }
    })

});


module.exports = router;