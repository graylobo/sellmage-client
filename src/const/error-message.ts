export const ERROR_MESSAGE = {
  requiredField: {
    userId: "Please enter your User ID.",
    password: "Please enter your Password.",
    name: "Please enter Name.",
    tel: "Please enter your Phone Number.",
    email: "Please enter your E-mail.",
    birth: "Please select your birthday.",
    hscode: "Please enter your HS Code",
    countryCode: "Please select your Country Code",
    airPortCode: "Please enter your AirPort Code",
  },
  patternValidation: {
    userId: "Please enter at least 4 to 20 english and number.",
    email: "Please enter according to the email format.",
    hscode: "The standard HS Code is up to 6 digits.",
  },
  limitLength: {
    password: "The password must be at least 4 and no more than 20.",
    nickname: "Nick Name must be 20 or less.",
    standardHS: "The standard HS Code is up to 6 digits.",
  },
  notFound: {
    userId: "User ID does not exist. Please check again.",
    password: "Password is incorrect. Please check again.",
    isAdmin: "Please check the permissions of the account.",
  },
  exists: {
    userId: "User ID already exists. Please check again.",
    email: "Email already exists. Please check again.",
  },
  notAccess: {
    userId: "The account is inactive. Please contact the administrator.",
  },
};
