export const setCountries = countries => ({
    type: "SET_COUNTRIES",
    payload: countries
})

export const setLanguage = language => ({
    type: "SET_LANGUAGE",
    payload: language
})


export const setError = message => ({
    type: "SET_ERROR",
    payload: message
})