import * as yup from "yup";

const validationSchema = yup.object({
  sur_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Surname has just A to Z or a to z characters")
    .test(
      "no-special-chars",
      "Special characters and numbers are not allowed in Surname",
      (value) => {
        if (value) {
          return /^[A-Za-z\s]+$/.test(value);
        }
        return true;
      }
    ),
  first_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "First name has just A to Z or a to z characters")
    .test(
      "no-special-chars",
      "Special characters and numbers are not allowed in First Name",
      (value, context) => {
        if (context.parent.first_name) {
          return /^[A-Za-z\s]+$/.test(value);
        }
        return true;
      }
    ),
  last_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Last name has just A to Z or a to z characters")
    .test(
      "no-special-chars",
      "Special characters and numbers are not allowed in Last Name",
      (value, context) => {
        if (context.parent.last_name) {
          return /^[A-Za-z\s]+$/.test(value);
        }
        return true;
      }
    ),
  mobile_number: yup
    .string()
    .matches(/^\d+$/, "Mobile number must contain only numbers")
    .test(
      "min-10-digits",
      "Mobile number must be at least 10 digits",
      (value) => {
        return value.length === 10;
      }
    ),
  joining_date: yup
    .date()
    .test("required", "Joining date is required", function (value) {
      return value !== null && value !== undefined;
    }),
});

const validation = async (formData) => {
  const requiredFields = [
    "sur_name",
    "first_name",
    "last_name",
    "mobile_number",
    "joining_date",
  ];
  const missingFields = requiredFields.filter((field) => !formData[field]);

  if (missingFields.length === requiredFields.length) {
    return {
      isValid: false,
      errors: { allFieldsRequired: "All fields are required" },
    };
  }

  if (!formData.sur_name) {
    return {
      isValid: false,
      errors: { sur_name: "Surname is required" },
    };
  } else if (!/^[A-Za-z\s]+$/.test(formData.sur_name)) {
    return {
      isValid: false,
      errors: {
        sur_name: "Special characters and numbers are not allowed in Surname",
      },
    };
  } else if (!formData.first_name) {
    return {
      isValid: false,
      errors: { first_name: "First Name is required" },
    };
  } else if (!/^[A-Za-z\s]+$/.test(formData.first_name)) {
    return {
      isValid: false,
      errors: {
        first_name:
          "Special characters and numbers are not allowed in First Name",
      },
    };
  } else if (!formData.last_name) {
    return {
      isValid: false,
      errors: { last_name: "Last Name is required" },
    };
  } else if (!/^[A-Za-z\s]+$/.test(formData.last_name)) {
    return {
      isValid: false,
      errors: {
        last_name:
          "Special characters and numbers are not allowed in Last Name",
      },
    };
  } else if (!formData.mobile_number) {
    return {
      isValid: false,
      errors: { mobile_number: "Mobile Number is required" },
    };
  } else if (!/^\d+$/.test(formData.mobile_number)) {
    return {
      isValid: false,
      errors: {
        mobile_number: "Mobile number must contain only numbers",
      },
    };
  } else if (formData.mobile_number.length !== 10) {
    return {
      isValid: false,
      errors: {
        mobile_number: "Mobile number must be 10 digits",
      },
    };
  } else if (!formData.joining_date) {
    return {
      isValid: false,
      errors: { joining_date: "Joining date is required" },
    };
  }

  try {
    await validationSchema.validate(formData, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (errors) {
    const validationErrors = {};
    errors.inner.forEach((error) => {
      const field = error.path;
      validationErrors[field] = error.message;
    });
    return { isValid: false, errors: validationErrors };
  }
};

export { validationSchema, validation };
