export const formatDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat('es-ES').format(date);
    return formattedDate;
}