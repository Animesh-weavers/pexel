export default function validate(values) {
  let errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.fname) {
    errors.fname = "First name is required";
  }
  if (!values.lname) {
    errors.lname = "Last name is required";
  }

  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }

  if (!values.repeatpassword) {
    errors.repeatpassword = "Password is required";
  } else if (values.repeatpassword.length < 6) {
    errors.repeatpassword = "Password must be 6 or more characters";
  }

  if (values.password !== values.repeatpassword) {
    errors.repeatpassword = "Password doesnot matched!";
  }

  return errors;
}
