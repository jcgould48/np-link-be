const express = require('express');
const router = express.Router();
var passport = require("passport");
const organizationController = require("./controller/organizationController")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/create-org", 
// passport.authenticate("jwt-user", { session: false }),
organizationController.createOrganization);

// router.get('/all-orgs',
// passport.authenticate("jwt-user", { session: false }),
// organizationController.getAllOrganizations)


module.exports = router;
