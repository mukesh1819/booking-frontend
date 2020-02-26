function csrfToken(document) {
    return document.querySelector('[name="csrf-token"]') ? document.querySelector('[name="csrf-token"]').content : null;
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

export function userInitials(user) {
    if (user.name == undefined || user.name == "") {
        return "H"
    }
    return user.name[0].toUpperCase()
}