const Web_Testimonial = require("../../models/Web_Testimonial");
const Adminauth = require("../../models/Adminauth");

class Web_TestimonialController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const web_Testimonial = await Web_Testimonial.find({});
        return res.render("admin/web_Testimonial", {
            web_Testimonial,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
    
    static add = async (req, res) => {
        try {
            const web_Testimonial = new Web_Testimonial({
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            });
            await web_Testimonial.save();
            return res.send({
                message: "User Say Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static update = async (req, res) => {
        try {
        const web_Testimonial = await Web_Testimonial.findOne({
            _id: req.body.editid,
        })
        await Web_Testimonial.findOneAndUpdate(
            {
            _id: web_Testimonial._id,
            },
            {
            $set: {
                title: req.body.edittitle.trim(),
                description: req.body.editdescription.trim(),
                updated_at: Date.now(),
            },
            }
        );
        return res.send({
            message: "User Say Updated Successfully",
        });
        } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        const web_Testimonial = await Web_Testimonial.findByIdAndDelete(req.body.id);
        return res.send({
            message: "User Say Deleted Successfully",
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    }
}

module.exports = Web_TestimonialController;