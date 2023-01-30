const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const Post = require("../../models/Post");
const Likes = require("../../models/Likes");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
require("dotenv").config();
const jwt = require("jsonwebtoken");

class postController {
  static add_post = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an file");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        var image = req.file.filename;

        var text = req.body.text;

        const user = req.login_user;
        if (!user) return res.status(401).send("User not found");

        let post = {
          image: image,
          text: text,
          user_id: user._id,
        };

        let saveObj = post;
        await Post.create(saveObj);

        let returnObj = {
          message: "Success",
          data: {
            image: image,
            text: text,
            user_id: user._id,
          },
        };
        // sending notification start
        const notification = Notification({
          user: req.id,
          type: "Post-added",
          data: {
            time: Date.now(),
          },
        });
        await notification.save();
        if (req.app.socket) req.app.socket.emit("Post-added");

        // sending notification end
        res.send(returnObj);
      });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .send("Something went wrong please try again later");
    }
  };
  static like_post = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      var token = req.body.token;
      var post_id = req.body.post_id;
      var is_liked =
        req.body.is_liked && req.body.is_liked == "true"
          ? Boolean(req.body.is_liked)
          : false;

      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("User not found");

      let findData = {
        post_id: post_id,
        user_id: user._id,
      };

      let findRec = await Likes.findOne(findData);
      if (findRec) {
        findRec.is_liked = is_liked;
        findRec.save();
      } else {
        let saveObj = findData;
        saveObj.is_liked = is_liked;
        await Likes.create(saveObj);
      }
      let returnObj = {
        message: "Success",
        data: {
          post_id: post_id,
          user_id: user._id,
          is_liked: is_liked,
        },
      };
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Post Liked",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Post Liked");

      // sending notification end
      res.send(returnObj);
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
  static comment_post = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      var token = req.body.token;
      var post_id = req.body.post_id;
      var comment = req.body.comment;
      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("User not found");

      let findData = {
        post_id: post_id,
        comment: comment,
        user_id: user._id,
      };

      let saveObj = findData;
      await Comment.create(saveObj);

      let returnObj = {
        message: "Success",
        data: {
          post_id: post_id,
          comment: comment,
          user_id: user._id,
        },
      };
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Post Comment",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Post Comment");

      // sending notification end
      res.send(returnObj);
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/post"),

  filename: function (req, file, cb) {
    var fileExt = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${fileExt}`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 2000000,
  // },
  fileFilter: imageFilter,
}).single("image");

module.exports = postController;
