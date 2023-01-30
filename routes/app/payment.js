const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Appauth");
const PaymentController = require("../../controllers/app/paymentController");

router.post(
  "/order-with-rozorpay",
  NotLoggedIn,
  PaymentController.order_with_rozorpay
);
router.post(
  "/order-with-rozorpay-api",
  NotLoggedIn,
  PaymentController.order_with_rozorpayApi
);
router.post(
  "/checkout-with-rozorpay",
  NotLoggedIn,
  PaymentController.checkout_with_rozorpay
);
router.get("/test1", NotLoggedIn, async (req, res) => {
  // const payment = await instance.orders.fetch('order_GwlV48Q7gVg7Vf');
  res.send(invNum);
});

function receipt_id() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
