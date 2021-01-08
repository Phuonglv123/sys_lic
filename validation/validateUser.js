const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateUser(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.birthday = !isEmpty(data.birthday) ? data.birthday : "";


    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is valid'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is valid';

    }
    if (!validator.isLength(data.password, {min: 6})) {
        errors.password = 'Enter fill up 6 words';
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'password2 is valid';
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'password2 is match';
    }
    if (validator.isEmpty(data.fullName)) {
        errors.fullName = 'fullName is valid';

    }
    if (validator.isEmpty(data.address)) {
        errors.address = 'address is valid';

    }
    if (validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is valid';
    }
    if (!validator.isLength(data.phone, {min: 10})) {
        errors.phone = 'Enter fill up 10 word';
    }
    if (validator.isEmpty(data.birthday)) {
        errors.birthday = 'Birthday is valid';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};
