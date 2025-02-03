//This is the middleware that determines if users should have access to certain routes based on if they're logged in or not

let isAuthenticated = (req, res, next)=>{
 if(!req.session.email){
    return res.status(401).json({message: 'Please login to access this resource' })
 }
 else{
   next();
    return;
 }
}

module.exports = isAuthenticated;