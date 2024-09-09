export default {
  general: {
    isRequired: "This field is required",
    maxLength: (charLimit) => `Must not be over ${charLimit} characters long`,
    minLength: (charLimit) => `Must be at least ${charLimit} characters long`,
    isEmail: "This field must be a valid email",
  },
  userRegistration: {
    passwordsMustMatch: "The two passwords do not match",
  },
};
