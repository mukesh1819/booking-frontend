const languageFlagMap = {
    'ENG': 'us',
    'ESP': 'es'
}

export function flagFor(language) {
    return languageFlagMap[language]
}

export function companyDetails() {
    return {
        email: "anup.singh2071@gmail.com",
        code: "+977",
        contact: "9818311488"
    }
}