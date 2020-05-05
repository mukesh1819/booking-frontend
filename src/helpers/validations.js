export function phoneValidate(yup) {
    return yup
        .string()
        .typeError('Not a valid number')
        .matches(new RegExp("^\\d+$"), 'Not a valid number')
        .length(10, 'Number length should be exactly 10');
}

export function textValidate(yup){
    return yup
        .string()
        .typeError('Not a valid text')
        .matches(/^[A-Za-z ]+$/, 'Please enter a valid text');
}

export function alphaNumericValidate(yup){
    return yup
        .string()
        .typeError('Not a valid number pr text')
        .matches(/^[ A-Za-z0-9_@.]*$/, 'Please enter a valid text or number');
}

export function numberValidate(yup){
    return yup
        .string()
        .typeError('Not a valid text')
        .matches(new RegExp("^\\d+$"), 'Please enter a valid text');
}