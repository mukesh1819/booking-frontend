function csrfToken(document) {
    return document.querySelector('[name="csrf-token"]').content;
}

export function passCsrfToken(document, axios) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken(document);
}

export function subDays(date, days) {
    const finalDate = new Date(date);
    finalDate.setDate(finalDate.getDate() - days);
    return finalDate;
}

export function addDays(date, days) {
    const finalDate = new Date(date);
    finalDate.setDate(finalDate.getDate() + days);
    return finalDate;
}

export function logout() {
    localStorage.removeItem('token');
}

export function isRefundable(type) {
    if (type == 'T') {
        return "Refundable"
    }
    return "Non - Refundable"
}