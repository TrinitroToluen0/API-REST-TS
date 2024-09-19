import Joi from "joi";

const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "The 'email' field must be a valid email.",
        "any.required": "The 'email' field is required.",
    }),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")).required().messages({
        "string.pattern.base": "The password must have at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
        "any.required": "The 'password' field is required.",
    }),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "The 'password confirmation' field must match the 'password'.",
        "any.required": "The 'password confirmation' field is required.",
    }),
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        "string.alphanum": "The 'username' can only contain alphanumeric characters.",
        "string.min": "The 'username' must have at least {#limit} characters.",
        "string.max": "The 'username' cannot have more than {#limit} characters.",
        "any.required": "The 'username' field is required.",
    }),
});

export default userSchema;
