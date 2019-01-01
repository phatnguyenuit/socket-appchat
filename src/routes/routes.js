const {
  Router
} = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');

const router = Router();

// ## LOGIN SECTION
//When the user sends a post request to this route,
// passport authenticates the user based on the middleware created previously
router.post('/signup',
  authController.passportSignup,
  authController.signup,
);

// ## LOGIN SECTION
router.get('/login', (req, res) => {
  res.render("pages/login", {
    title: 'Login'
  })
});
router.post('/login', authController.login);

// routes
router.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Home",
    chatItems: [{
        user: "Phat Nguyen",
        lastMessage: "Ahihi do ngoc"
      },
      {
        user: "Tai Nguyen",
        lastMessage: "Anh 2 oi!!!"
      },
      {
        user: "Jack Le",
        lastMessage: "Goi Phat gium anh 1 cai"
      },
      {
        user: "Anny Tong",
        lastMessage: "Em yeu anh"
      }
    ]
  });
});

// render only a partial without any layout
router.get("/title", (req, res) => {
  res.render("partials/title", {
    layout: false,
    title: "OK mama"
  });
});


module.exports = router;
