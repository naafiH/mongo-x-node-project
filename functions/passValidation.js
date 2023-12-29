function checkValidation(req, res, next) {
    const mailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}<>])[A-Za-z\d!@#$%^&*(),.?":{}<>]{8,}$/;

    const { fname, lname, email, password } = req.body;
    const currectPass = passValidation.test(password);
    const currectMail = mailValidation.test(email);

    if (currectMail && currectPass) {
        next();
    } else {
        const passerr = "errorpassword";
        console.log(passerr);
        res.redirect(`/signup?err=${passerr}`);
    }
}

module.exports = checkValidation;