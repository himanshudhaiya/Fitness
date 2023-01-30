const Web_Slider = require("../../models/Web_Slider");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

class Web_SliderController {
  static list = async (req, res) => {
    try {
      const web_slider = await Web_Slider.findOne();
      const admin = await Adminauth.find();
      return res.render("admin/web_slider", {
        admin, 
        title: web_slider ? web_slider.title : "",
        description: web_slider ? web_slider.description : "",
        image: web_slider ? web_slider.image : "",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      const web_slider = await Web_Slider.findOne();
      if (web_slider) {
        upload(req, res, async function (err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
              } else if (!req.file) {
                return res.send("Please upload an image");
              } else if (err instanceof multer.MulterError) {
                console.log(err);
                return res.send(err);
              } else if (err) {
                console.log(err);
                return res.send(err);
              }
          await Web_Slider.findOneAndUpdate(
            {},
            {
              $set: {
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                image: req.file.filename,
              },
            }
          );
        });
        return res.send({
          message: "Web Slider Updated Successfully",
        });
      } else {
        upload(req, res, async function (err) {
            // if (req.fileValidationError) {
            //     return res.send(req.fileValidationError);
            //   } else if (!req.file) {
            //     return res.send("Please upload an image");
            //   } else if (err instanceof multer.MulterError) {
            //     console.log(err);
            //     return res.send(err);
            //   } else if (err) {
            //     console.log(err);
            //     return res.send(err);
            //   }
          const web_slider = new Web_Slider({
            title: req.body.title,
            description: req.body.description.trim(),
            image: req.file.filename,
          });
          await web_slider.save();
        });
        return res.send({
          message: "Web Slider Added Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      await Web_Slider.findOneAndDelete({ _id: req.body.id });
      return res.send({
        message: "Web Slider Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/uploads/web_slider"),
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
}).single("logo");

module.exports = Web_SliderController;
