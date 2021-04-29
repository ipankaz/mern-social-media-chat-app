const { check, validationResult } = require("express-validator");
exports.validateSignupRequest = [
  check("firstName").isAlpha().withMessage("must be alphabetical").isLength({min:3}).withMessage(" Valid First Name is required"),
  check("lastName").isAlpha().withMessage("must be alphabetical").isLength({min:3}).withMessage(" Valid Last Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").isLength({ min: 6 }).withMessage("Password must me atleast 6 characters long"),
  check("contactNumber").isNumeric().withMessage("Contact Number must be numeric and valid")
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must me atleast 6 characters long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};    