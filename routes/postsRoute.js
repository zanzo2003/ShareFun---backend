const express = require('express');
const router = express.Router();
const {cloudinary} = require('../cloudinary');
const post = require('../models/postModel');
const moment = require('moment');

router.post('/addpost', async(req,res)=>{

    try {

        const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
            folder: 'Social Media - Images',
            use_filename : true
        });
        req.body.image = uploadResponse.url;
        const newpost = new post(req.body);
        await newpost.save();
        res.send('Post added successfully');
        
    } catch (error) {

        return res.status(400).json(error);
        
    }

});


router.get("/getallposts", async(req, res)=>{


    try {

        const posts = await post.find().populate('user').sort({createdAt: -1}).exec();
        res.send(posts);
        
    } catch (error) {
        res.status(400).json(error);  
    }
})



router.post("/likeorunlikepost", async (req, res) => {
    try {
      const posts = await post.findOne({ _id: req.body.postid });
      var likes = posts.likes;
  
      if (likes.find((obj) => obj.user == req.body.userid)) {
        const temp = likes.filter(
          (obj) => obj.user.toString() !== req.body.userid
        );
  
        posts.likes = temp;
        await post.updateOne({ _id: req.body.postid }, posts);
        res.send("Post unliked successfully");
      } else {
        likes.push({
          user: req.body.userid,
          date: moment().format("MMM DD yyyy"),
        });
  
        posts.likes = likes;
  
        await post.updateOne({ _id: req.body.postid }, posts);
        res.send("Post liked successfully");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  });


  router.post("/addcomment", async (req, res) => {
    try {

      const posts = await post.findOne({ _id: req.body.postid });
      var comments = posts.comments;
  
      comments.push({
        user: req.body.userid,
        date: moment().format("MMM DD yyyy"),
        comment: req.body.comment,
      });
  
      posts.comments = comments;
      await post.updateOne({ _id: req.body.postid }, posts);
      res.send("Comment added successfully");

    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  });


  router.post("/editpost", async (req, res) => {
    try {
      await post.updateOne({_id : req.body._id} , req.body)

      res.send("Post updated successfully");

    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  });

  router.post("/deletepost", async(req, res) => {

    try {
      await post.deleteOne({_id : req.body._id})
      res.send('Post deleted successfully');
    } catch (error) {
      return res.status(400).json(error);
    }
    
  });

  


module.exports = router