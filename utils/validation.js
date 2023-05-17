export const validationEmail = (email) => {
  const regextSt = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regextSt.test(email);
};

export const validateCreateProduct = (product, images) => {
  const sizes = product.sizes;
  const details = product.details;
  const questions = product.questions;

  const checks = [
    {
      msg: "Name, Description, Brand added successfully!",
      type: "success",
    },
  ];

  if (images.length < 3) {
    checks.push({
      msg: `Choose at least 3 images (${3 - images.length} remaining)!`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images.length} images choosen!`,
      type: "success",
    });
  }

  if (!product.color.color) {
    checks.push({
      msg: "Choose a main product color!",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Product color been choosen!",
      type: "success",
    });
  }

  if (!product.color.image) {
    checks.push({
      msg: "Choose a product style image!",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Product style image been choosen!",
      type: "success",
    });
  }

  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].qty == "" || sizes[i].price == "" || sizes[i].size == "") {
      checks.push({
        msg: "Please fill all information on sizes!",
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: "At least one size/qty/price added!",
        type: "success",
      });
    }
  }

  for (let i = 0; i < details.length; i++) {
    if (details[i].name == "" || details[i].value == "") {
      checks.push({
        msg: "Please fill all information on details!",
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: "At least one details added!",
        type: "success",
      });
    }
  }

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].question == "" || questions[i].answer == "") {
      checks.push({
        msg: "Please fill all information on questions!",
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: "At least one questions added!",
        type: "success",
      });
    }
  }

  let s_test = checks.find((c) => c.type == "error");
  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};
