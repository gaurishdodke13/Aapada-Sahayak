function formatTimestamp(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(date.getTime() + 24 * 60 * 60 * 1000).toDateString() === now.toDateString();

    if (isToday) {
        return `Today at ${formatTime(date)}`;
    } else if (isYesterday) {
        return `Yesterday at ${formatTime(date)}`;
    } else {
        return `${formatDate(date)} at ${formatTime(date)}`;
    }
}

function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default formatTimestamp;