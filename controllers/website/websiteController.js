const Faq = require("../../models/Faq");
const Transformations = require("../../models/Transformations");
const Testimonial = require("../../models/Testimonial");
const Fit_Provides = require("../../models/Fit_Provides");
const Team = require("../../models/Team");
const Package = require("../../models/Package");
const Plan = require("../../models/Plan");
const PackageInclude = require("../../models/PackageInclude");
const Contact = require("../../models/Contact");

const Web_Contact = require("../../models/Web_Contact");
const Web_Faq = require("../../models/Web_Faq");
const Web_services = require("../../models/Web_services");
const Setting_Footer = require("../../models/Setting_Footer");
const Web_Apart = require("../../models/Web_Apart");
const Web_Testimonial = require("../../models/Web_Testimonial");

const Web_Slider = require("../../models/Web_Slider");
const Food_Type = require("../../models/Food_Type");
const Abouts = require("../../models/Abouts");
const Talk_To_Expert = require("../../models/Talk_To_Expert");
const View_Full_Answer = require("../../models/View_Full_Answer");
const Counting = require("../../models/Counting");
const Setting = require("../../models/Setting");

class WebsiteController {
  static index = async (req, res) => {
    try {
      const transformations = await Transformations.find();
      const testimonials = await Testimonial.find();
      const fit_provides = await Fit_Provides.find();
      const web_Faq = await Web_Faq.find();
      const web_services = await Web_services.find();
      const setting_footer = await Setting_Footer.find();
      const web_apart = await Web_Apart.find();
      const web_Testimonial = await Web_Testimonial.find();
      const web_slider = await Web_Slider.find();
      const food_type = await Food_Type.find();
      const abouts = await Abouts.find();
      const talk_to_expert = await Talk_To_Expert.find();
      const view_full_answer = await View_Full_Answer.find();
      const counting = await Counting.find();
      const data = await Setting.findOne();
      return res.render("website/index", {
        testimonials,
        fit_provides,
        transformations,
        web_Faq,
        web_services,
        setting_footer,
        web_apart,
        web_Testimonial,
        web_slider,
        food_type,
        abouts,
        talk_to_expert,
        view_full_answer,
        counting,
        food_type_title: data ? data.food_type_title : "",
        web_service_title: data ? data.web_service_title : "",
        web_service_description: data ? data.web_service_description : "",
        transformation_title: data ? data.transformation_title : "",
        transformation_description: data ? data.transformation_description : "",
        steps_title: data ? data.steps_title : "",
        steps_description: data ? data.steps_description : "",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static food = async (req, res) => {
    try {
      let foodID = req.body.id;
      const food_type = await Food_Type.findOne({
        _id: foodID,
      });
      return res.send(food_type);
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later ");
    }
  };

  static addcontact = async (req, res) => {
    try {
      //Create data
      let data = req.body;
      const web_contact = Web_Contact({
        contact_name: data.contact_name,
        email: data.email,
        country: data.country,
        city: data.city,
        phone: data.phone,
        gender: data.gender,
        concern: data.concern,
        time: data.time,
      });
      //save data
      await web_contact.save();
      return res.send({
        message: "Please Thank you for contacting us",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static about = async (req, res) => {
    try {
      const team = await Team.find();
      return res.render("website/about", {
        team,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static package = async (req, res) => {
    try {
      const packages = await Package.find();
      return res.render("website/package", {
        packages,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static contact = async (req, res) => {
    try {
      return res.render("website/contact");
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static contactAdd = async (req, res) => {
    try {
      //Create data
      let data = req.body;

      const contact = Contact({
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });
      //save data
      await contact.save();
      return res.send({
        message: "Contact added successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static gallery = async (req, res) => {
    try {
      return res.render("website/gallery");
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static team = async (req, res) => {
    try {
      const team = await Team.find();
      return res.render("website/team", {
        team,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static plan = async (req, res) => {
    try {
      const plan = await Plan.find().populate("package_id");
      const packageInclude = await PackageInclude.find({}).populate(
        "package_id"
      );
      // console.log(plan.package_id)
      return res.render("website/plan", {
        packageInclude,
        plan,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static faq = async (req, res) => {
    try {
      const faq = await Faq.find();
      return res.render("website/faq", {
        faq,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
}

module.exports = WebsiteController;
