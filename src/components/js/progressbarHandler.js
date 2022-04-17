let progressbarHandler = (passwordStrength) => {
    let strengthCounter = passwordStrength;
    let type = null;
    let progress = null;
    let bgColor = "white";
    if (strengthCounter == 1) {
        type = "bad";
        progress = 25;
        bgColor = "danger";
    } else if (strengthCounter == 2) {
        type = "weak";
        progress = 50;
        bgColor = "warning";
    } else if (strengthCounter == 3) {
        type = "good";
        progress = 100;
        bgColor = "success";
    } else if (strengthCounter >= 4) {
        type = "strong";
        bgColor = "success";
        progress = 100;
    }
    return {
        strengthCounter, type, progress, bgColor
    }
}

export default progressbarHandler