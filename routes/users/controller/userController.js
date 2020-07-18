const User = require("../model/User");
const bcrypt = require("bcryptjs");
const dbErrorHelper = require("../../lib/dbErrorHelpers/dbErrorHelper");
const jwtHelper = require("../authHelpers/jwtHelper");


module.exports= {
    signUp: async (req, res) => {
        try {
          let createdUser = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            expertise: req.body.expertise,
            profession: req.body.profession,
            zip: req.body.zip,
          });
          let genSalt = await bcrypt.genSalt(12);
          let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);
          createdUser.password = hashedPassword;
          await createdUser.save();
          res.json({
            message: "User created",
          });
        } catch (e) {
          res.status(500).json({
            message: dbErrorHelper(e),
          });
        }
      },
      login: async (req, res) => {
        try {
          let foundUser = await User.findOne({
            email: req.body.email,
          }).select("-__v -userCreated");
          if (foundUser === null) {
            throw Error("User not found, please sign up.");
          }
          let comparedPassword = await jwtHelper.comparePassword(
            req.body.password,
            foundUser.password
          );
          if (comparedPassword === 409) {
            throw Error("Check your email and password.");
          }
          let jwtTokenObj = await jwtHelper.createJwtToken(foundUser);
      res.json({
        message: "success",
        jwtToken: jwtTokenObj.jwtToken,
        jwtRefreshToken: jwtTokenObj.jwtRefreshToken,
      });
        } catch (e) {
          res.status(500).json({
            message: dbErrorHelper(e),
          });
        }
      },
      updateProfile: (params, id) => {
        const {username, email} = params;
        return new Promise((resolve, reject) => {
          User.findById(id)
          .then(user => {
            if(username) user.profile.name = username
            if(email) user.email = email
            return user;
          })
          .then(user => {
            user.save().then(user => {
              resolve(user)
            })
          })
          .catch(err=> reject(err))
        }).catch(err=> reject(err))
      }
      
    }