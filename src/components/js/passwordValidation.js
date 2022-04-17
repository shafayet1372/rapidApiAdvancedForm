let passwordValidation = (password) => {
    let validations = {
        number: {
            text: "At least 1 number ",
            valid: false,
        },
        lowerCase: {
            text: "At least 1 lowercase letter",
            valid: false,
        },
        upperCase: {
            text: "At least one uppercase letter",
            valid: false,
        },
        specialChar: {
            text: "At least one special character",
            valid: false,
        },
        length: {
            text: "Must have 8-42 characters",
            valid: false,
        },
    };
    if (/(?=.*[a-z])[a-z]/.test(password)) {
        validations.lowerCase.valid = true;
    }
    if (/(?=.*[A-Z])[A-Z]/.test(password)) {
        validations.upperCase.valid = true;
    }
    if (/(?=.*[^\w*])[^\w]/.test(password)) {
        validations.specialChar.valid = true;
    }
    if (password.length >= 8 && password.length <= 42) {
        validations.length.valid = true;
    }
    if (/(?=.*[0-9])[0-9]/.test(password)) {
        validations.number.valid = true;
    }
    return validations;
}

export default passwordValidation