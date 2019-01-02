const passport = require("passport");
const jwt = require("jsonwebtoken");

const passportSignup = passport.authenticate("signup", {
  session: false
});

const signup = (req, res, next) => {
  res.json({
    message: "Signup successful",
    user: req.user
  });
};

const passportLogin = (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    console.dir(err, user, info);
    if (err) {
      return res.json(err);
    }
    if (!user) {
      console.log(req);
      return res.render('pages/login', {
        ...req.body,
        error: info
      });
      // return res.json(info);
    }
    req.login(
      user, {
        session: false
      },
      error => {
        if (error) return next(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = {
          _id: user._id,
          email: user.email
        };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({
            user: body
          },
          "my_secret"
        );
        //Send back the token to the user
        return res.json({
          token
        });
      }
    );
  })(req, res, next);
};

/*
Note : We set { session : false } because we don't want to store the user details in a session.
We expect the user to send the token on each request to the secure routes.
This is especially useful for API's, it can be used to track users, block , etc...
But if you plan on using sessions together with JWT's to secure a web application,
that may not be a really good idea performance wise, more details about this here:
https://scotch.io/bar-talk/why-jwts-suck-as-session-tokens#why-do-jwts-suck

Reference: https://scotch.io/@devGson/api-authentication-with-json-web-tokensjwt-and-passport
*/

const login = (err, req, res) => {
  console.log("call em!");
  if (err) {
    console.log(err);
    res.send("Login Fail!");
  } else {
    res.send("Success");
  }
};

module.exports = {
  passportSignup,
  passportLogin,
  login,
  signup
};
