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

router.get('/get-all-orgs',
passport.authenticate("jwt-user", { session: false }),
organizationController.getAllOrganizations)

router.get('/get-relevant-orgs',
passport.authenticate("jwt-user", { session: false }),
organizationController.  getRelevantOrganizations)

router.put('/like-organization',
passport.authenticate("jwt-user", { session: false }),
organizationController.  likeOrganization)

router.put('/dislike-organization',
passport.authenticate("jwt-user", { session: false }),
organizationController.  dislikeOrganization)

router.put('/approve-org',
passport.authenticate("jwt-user", { session: false }),
organizationController.approveOrganization)

router.delete('/delete-org/:id',
passport.authenticate("jwt-user", { session: false }),
organizationController.deleteOrganization)


module.exports = router;
