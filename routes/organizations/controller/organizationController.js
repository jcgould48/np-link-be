const dbErrorHelper = require("../../lib/dbErrorHelpers/dbErrorHelper");
const User = require("../../users/model/User");
const Organization = require("../model/Organization");


module.exports = {
  createOrganization: async (req, res) => {
        try {
          const newOrg = new Organization({
            orgName: req.body.itemName,
            email: req.body.email,
            description: req.body.description,
            pitch: req.body.pitch, 
            helpNeeded:req.body.helpNeeded,
            hashTags:req.body.hashTags,
            createdBy: req.user._id,
          });
          console.log("controller", newOrg)
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

getRandomPic: async(req,res,next) => {
  try {
     // const randomPic = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.ACCESS_KEY}`)
     // return res.json({picture: {...randomPic.data}})
     return res.json({picture: {...testPic.picture}})
  } catch (error) {
     console.log(error)
  }
},


}


const testPic = {
  "picture": {
  "id": "3iB--pWZ1fQ",
  "created_at": "2020-04-01T10:44:44-04:00",
  "updated_at": "2020-04-07T01:03:56-04:00",
  "promoted_at": "2020-04-01T12:30:02-04:00",
  "width": 3744,
  "height": 5616,
  "color": "#FDFAF4",
  "description": "Fire Fighter climbs a ladder above a crowded street to reach a building engulfed in flames.",
  "alt_description": "red double decker bus on road near brown concrete building during daytime",
  "urls": {
  "raw": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMyMH0",
  "full": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMyMH0",
  "regular": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMyMH0",
  "small": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMyMH0",
  "thumb": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMyMH0"
  },
  "links": {
  "self": "https://api.unsplash.com/photos/3iB--pWZ1fQ",
  "html": "https://unsplash.com/photos/3iB--pWZ1fQ",
  "download": "https://unsplash.com/photos/3iB--pWZ1fQ/download",
  "download_location": "https://api.unsplash.com/photos/3iB--pWZ1fQ/download"
  },
  "categories": [],
  "likes": 38,
  "liked_by_user": false,
  "current_user_collections": [],
  "user": {
  "id": "YxAXFh3SywE",
  "updated_at": "2020-04-14T10:31:43-04:00",
  "username": "reallygoodjames",
  "name": "James Fitzgerald",
  "first_name": "James",
  "last_name": "Fitzgerald",
  "twitter_username": "reallygoodjames",
  "portfolio_url": "https://www.instagram.com/reallygood.graphics/",
  "bio": "Really Good at all things media and messaging",
  "location": "Brooklyn",
  "links": {
  "self": "https://api.unsplash.com/users/reallygoodjames",
  "html": "https://unsplash.com/@reallygoodjames",
  "photos": "https://api.unsplash.com/users/reallygoodjames/photos",
  "likes": "https://api.unsplash.com/users/reallygoodjames/likes",
  "portfolio": "https://api.unsplash.com/users/reallygoodjames/portfolio",
  "following": "https://api.unsplash.com/users/reallygoodjames/following",
  "followers": "https://api.unsplash.com/users/reallygoodjames/followers"
  },
  "profile_image": {
  "small": "https://images.unsplash.com/profile-1559660369842-67b87fd1e8e4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
  "medium": "https://images.unsplash.com/profile-1559660369842-67b87fd1e8e4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
  "large": "https://images.unsplash.com/profile-1559660369842-67b87fd1e8e4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
  },
  "instagram_username": "reallygood.graphics",
  "total_collections": 5,
  "total_likes": 3,
  "total_photos": 121,
  "accepted_tos": true
  },
  "exif": {
  "make": "Canon",
  "model": "Canon EOS 5D Mark II",
  "exposure_time": "1/500",
  "aperture": "2.0",
  "focal_length": "50.0",
  "iso": 5000
  },
  "location": {
  "title": "New York, NY, USA",
  "name": "New York, NY, USA",
  "city": "New York",
  "country": "United States",
  "position": {
  "latitude": 40.712775,
  "longitude": -74.005973
  }
  },
  "views": 284086,
  "downloads": 488
  }
}