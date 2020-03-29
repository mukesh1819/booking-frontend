const languageFlagMap = {
    'ENG': 'us',
    'ESP': 'es'
}

export function flagFor(language) {
    return languageFlagMap[language]
}