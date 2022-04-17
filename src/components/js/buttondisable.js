let buttonDisabled = (values, errorHandle, passwordStrengthChecker, passwordValidation) => {
    let { password } = values;
    let valuesNotEmpty = Object.values(values).every((x) => x);
    let hasError = Object.values(errorHandle());
    let isPasswordValidate = Object.values(passwordValidation(password)).every(
        (x) => x.valid
    );
    let passwordStrength = passwordStrengthChecker();
    if (
        !hasError.length &&
        isPasswordValidate &&
        passwordStrength == 5 &&
        valuesNotEmpty
    ) {
        return true;
    }
    return false;
}

export default buttonDisabled