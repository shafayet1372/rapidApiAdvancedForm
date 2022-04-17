import React, { useEffect, useState } from "react";
import db from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import toasterType from "../js/toaster";
import passwordValidation from "../js/passwordValidation";
import checkButtonDisable from "../js/buttondisable";
import FormValidation from "./FormValidation";
import FormController from "./FormController";
const initialValues = {
  name: "",
  email: "",
  password: "",
};
export default function Index() {
  let [values, setValues] = useState(initialValues);
  let [hideSpinner, setSpinner] = useState(true);
  let [showPassError, setPassError] = useState(false);
  let collections = collection(db, "advancesignupform");

  useEffect(() => {
    if (values.password && !showPassError) {
      setPassError(true);
    }
  }, [values.password, values.email]);

  let changeHandler = (e) => {
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  let addData = async () => {
    let { name, email, password } = values;
    try {
      await addDoc(collections, { name, password, email });
      toast("successfully signedup !", toasterType("colored", "success"));
      setSpinner(true);
      setValues(initialValues);
      setPassError(false);
    } catch (e) {
      alert("error");
    }
  };

  let submitHandler = async (e) => {
    e.preventDefault();
    setSpinner(false);
    addData();
  };

  let errorsHandle = () => {
    let { email, password } = values;
    let error = {};
    if (email) {
      if (
        !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(email) &&
        email
      ) {
        error.email = "Invalid Email";
      }
    }
    if (showPassError) {
      if (!password) {
        error.password = "Must Have 8-42 characters";
      }
    }
    return error;
  };

  let passwordStrengthChecker = () => {
    let { password } = values;
    let strengthCounter = 0;
    if (password) {
      strengthCounter = Object.values(passwordValidation(password)).filter(
        (x) => x.valid
      ).length;
    }
    return strengthCounter;
  };

  let passwordValidationShowHandler = () => {
    let { password } = values;
    let validations = passwordValidation(password);

    if (!password) {
      return <FormValidation validationsData={Object.values(validations)} />;
    } else {
      return <FormValidation validationsData={Object.values(validations)} />;
    }
  };

  let buttonDisabled = () => {
    return checkButtonDisable(
      values,
      errorsHandle,
      passwordStrengthChecker,
      passwordValidation
    );
  };

  return (
    <FormController
      submitHandler={submitHandler}
      changeHandler={changeHandler}
      values={values}
      hideSpinner={hideSpinner}
      passwordValidation={passwordValidationShowHandler()}
      errors={errorsHandle()}
      passwordStrength={passwordStrengthChecker()}
      isDisabled={buttonDisabled()}
    />
  );
}
