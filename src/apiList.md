#DevConnect API's

//always use the router for the api express router

authRouter

    - POST /signup
    - POST /login
    - POST /logout

ProfileRouter

    - PATCH /profile/view
    - GET /profile/edit
    - PATCH /profile/password

ConnectionRequestRouter
status: ignore, interested, accepted, rejected

    - POST /request/send/interested/:userId
    - POST /request/send/ignored/:userId
    - POST /request/review/accepted/:userId
    - POST /request/review/rejected/:userId

userRouter

    -GET /user/connections
    -GET /user/requests
    -GET /user/feed - gets profiles of the users
