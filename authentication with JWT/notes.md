# Authentication - how it works
- whenever a user login the website the server create a token that is given to the user... that save in the cookies of the website.
- And whenever user want to access the website...user send the request to the server with the copy of the token...which help the server to authenticate the user.
- The token expire after specific period of time
- whenever we clear the cookies of the site then the token is earsed and then we have to relogin in the website...as we can see we have to login website in some regular interval



post /register --> user create/register krna
POST /login --> check username & password then loggedin the user
GET /user --> get user data [protected]
GET /logout --> loggedout