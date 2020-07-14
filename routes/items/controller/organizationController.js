const dbErrorHelper = require("../../lib/dbErrorHelpers/dbErrorHelper");
const User = require("../../users/model/User");
const Organization = require("../model/Organization");


module.exports = {
    createOrganization: async (req, res) => {
        try {
          const newOrg = new Organization({
            orgName: req.body.itemName,
            rentAmount: req.body.rentAmount,
            description: req.body.description,
            dateInput: req.body.dateInput,
            availability: req.body.availability, 
            createdBy: req.user._id,
          });
          const savedOrg = await newOrg.save();
          const foundUser = await User.findById({ _id: req.user._id });
          foundUser.orgsCreated.push(saveOrg);
          await foundUser.save();
          res.json(savedOrg);
        } catch (e) {
          res.status(500).json({
            message: dbErrorHelper(e),
          });
        }
      },

getAllOrganizations: async (req, res) => {
    try {
        // console.log("user id?", req.user._id )
        let allOrgs = await Organization.find({})
    //    console.log("%%%%%",allItems)
        res.json(allOrgs);
    } catch (e) {
      res.status(500).json({
        message: dbErrorHelper(e),
      });
    }
  },
  
  likeOrganization: async (req, res) => {
    try {
        let org = await Organization.findOne({ apiID: req.body.id });

        console.log(req.body);

        console.log('test');

        let user = await User.findOne({ username: req.body.user.username });

        user.likes.push(org);
        user.save();
        res.send({ org, user });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
},
dislikeOrganization: async (req, res) => {
    try {
        let org = await Organization.findOne({ apiID: req.body.id });

        console.log(req.body);

        let user = await User.findOne({ username: req.body.user.username });

        user.dislikes.push(org);
        user.save();
        res.send(org);
        console.log(user);
    } catch (error) {
        console.log(error);
    }
},


}