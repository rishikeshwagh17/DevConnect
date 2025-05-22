//Date - 14-05-2025
today i write the middlewares in the file and how to use them in case of authorization

Date - 15/16-05-2025
learn about the how to use mongoose and create a DB connection method using mongoose
1.create a cluster on mongoDB atlas
2.install mongoose library
3.connect your application to the database "connection-url/devCommunity"
4.call the connectDB function and connect to database before starting application on 7777

later learn about the schema generation using the mongoose
//created a userSchema and user model
created a api call of signup using the dummy object data and pass it to the userModel instance
and call the save method on userModel instance to make a post api call using postman and send the correct response at last

# DevConnect API's

//always use the router for the api express router

## authRouter

    - POST /signup
    - POST /login
    - POST /logout

## ProfileRouter

    - PATCH /profile/view
    - GET /profile/edit
    - PATCH /profile/password

## ConnectionRequestRouter

status: ignore, interested, accepted, rejected

    - POST /request/send/interested/:userId
    - POST /request/send/ignored/:userId
    - POST /request/review/accepted/:userId
    - POST /request/review/rejected/:userId

## userRouter

    -GET /user/connections
    -GET /user/requests
    -GET /user/feed - gets profiles of the users
