const dbErrorHelper = require("../../lib/dbErrorHelpers/dbErrorHelper");
const User = require("../../users/model/User");
const Organization = require("../model/Organization");
const Data = require("../data.json")


module.exports = {
  createOrganization: async (req, res) => {
        try {
          // console.log("controller1")
          const newOrg = new Organization({
            orgName: req.body.orgName,
            poc: req.body.poc,
            email: req.body.email,
            city: req.body.city,
            description: req.body.description,
            pitch: req.body.pitch, 
            helpNeeded:req.body.helpNeeded,
            hashTags:req.body.hashTags,
            approved:false,
            // createdBy: req.user._id,
          });
          console.log("controller", newOrg)
          const savedOrg = await newOrg.save();
          // const foundUser = await User.findById({ _id: req.user._id });
          // foundUser.orgsCreated.push(saveOrg);
          // await foundUser.save();
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

  getRelevantOrganizations: async (req, res) => {
    try {
      
      let userExpertise= req.user.expertise 
      
      let filter = {
        helpNeeded: userExpertise,
        approved: true
      };

      relevantOrgs= Data.filter(function(item) {
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
            return false;
        }
        return true;
      });
        // console.log("Success Data", relevantOrgs )
   
        res.json(relevantOrgs);
    } catch (e) {
      res.status(500).json({
        message: dbErrorHelper(e),
      });
    }
  },
  
  likeOrganization: async (req, res) => {
    try {

      // console.log("id", req.body.id);

      const foundUser = await User.findById({ _id: req.user._id });
        let likedOrgs = await Data.filter(item=>item.id === req.body.id );
        
        // console.log('test', org)
       foundUser.likes.push(likedOrgs);
       foundUser.save();
        res.send(likedOrgs);
        // console.log(user);
    } catch (error) {
        console.log(error);
    }
},
dislikeOrganization: async (req, res) => {
  try {
    const foundUser = await User.findById({ _id: req.user._id });
      let org = await Data.filter(item=>item.id === req.body.id );

      console.log("oooorrrg",org);
    //  foundUser.dislikes.push(org);
    //  foundUser.save();
      res.send(org);
  } catch (error) {
      console.log(error);
  }
},



approveOrganization: async(req, res)=>{
  try {
    const itemID = req.body._id;
    console.log("ITEM", req.body)
    let updatedOrganization = await Organization.findByIdAndUpdate(
      {
        _id: itemID,
      },
      { approved: true }
    );
    res.json(updatedOrganization);
  } catch (e) {
    res.status(500).json(dbErrorHelper(e));
  }
},

deleteOrganization: async (req, res) => {
  try {
      const itemID = req.params.id;
      // console.log("ITEMBE", itemID)
      
      let deletedOrganization= await Organization.findByIdAndDelete({ _id: itemID});
      res.json(deletedOrganization);
    } catch (e) {
      res.status(500).json(dbErrorHelper(e));
    }
},
}
