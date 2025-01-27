//This is the middleware that determines if users should have access to certain routes based on if they're logged in or not

let isAuthenticated = (req, res, next)=>{
 if(!req.session.email){
    res.redirect('login')
 }
 else{
   next();
    return;
 }
}

module.exports = isAuthenticated;