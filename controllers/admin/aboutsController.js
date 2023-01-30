const Abouts = require("../../models/Abouts");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

class aboutsController {
  static list = async (req, res) => {
    try {
      let abouts = await Abouts.findOne();
      const admin = await Adminauth.find({});
      return res.render("admin/abouts", {
        title: abouts ? abouts.title : "",
        sub_title: abouts ? abouts.sub_title : "",
        description: abouts ? abouts.description : "",
        image: abouts ? abouts.image : "",

        admin,
      });
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      const web_testimonial = await Abouts.findOne();
      
      if (web_testimonial) {
        upload(req, res, async function (err) {
          await Abouts.findOneAndUpdate(
            {},
            {
              title: req.body.title.trim(),
              sub_title: req.body.sub_title.trim(),
              description: req.body.description.trim(),
              image: req.file.filename,
              updated_at: Date.now(),
            }
          );
          return res.send({
            error: false,
            message: "Web Testimonial added successfully",
          });
        });
      } else {
        upload(req, res, async function (err) {
          const web_testimonial = Abouts({
            title: req.body.title.trim(),
            sub_title: req.body.sub_title.trim(),
            description: req.body.description.trim(),
            image: req.file.filename,
          });
          await web_testimonial.save();
          return res.send({
            error: false,
            message: "Web Testimonial added successfully",
          });
        }); 
      }
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const web_testimonial = await Abouts.findOne({
        _id: req.body.id,
      });
      if (!web_testimonial) {
        return res.send({
          error: true,
          message: "Web Testimonial not found",
        });
      }

      fs.unlinkSync(root + "/public/uploads/abouts/" + web_testimonial.image);
      await Abouts.deleteOne({
        _id: req.body.id,
      });
      return res.send({
        error: false,
        message: "Web Testimonial deleted successfully",
      });
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/abouts/"),
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: imageFilter,
}).single("image");

module.exports = aboutsController;
