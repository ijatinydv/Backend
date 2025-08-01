# Middleware

## Three properties
- Request ke data ko modify krr skte hai
- Response send krr skte hai


## Middleware syntax
- app.use((req,res,next)=>{
    console.log("This middleware is between the app and router")
    next()
})
- If you don't call next then request will not go forward...means console.log run then it stops it will not go the router