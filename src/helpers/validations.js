export function phoneValidate(yup) {
    return yup
        .string()
        .typeError('Not a valid number')
        .matches(new RegExp('[0-9]{7}'))
        .length(10, 'Number length should be exactly 10');
}