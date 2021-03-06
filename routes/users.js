const  express=require("express");
const router=express.Router();
const passport=require('passport');

const usersController=require ('../controllers/users_controller');
console.log("the users router loaded");


router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

// writing router for the sign in and sign up pages
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

// creating the route for sign up page
router.post('/create',usersController.create);

// creating the route for the sign in page
// router.post('/create-session',usersController.createSession);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

// creating route for the sign out page
router.get('/sign-out',usersController.destroySession);

// sign in by api and social authentication
// the sign in for google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);

module.exports=router;