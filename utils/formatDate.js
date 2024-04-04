export default function formatDate (date) {
    if (!date) return;

    const originalDate = new Date(date);
    const formattedDate = new Date(originalDate).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const [month, day, year] = formattedDate.split('/');
    return `${month}-${day}-${year}`;
}