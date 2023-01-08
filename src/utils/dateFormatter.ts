const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function dateFormatter(date: Date) {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = months[date.getMonth()];

  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${day} ${month} at ${hour}:${minutes}`;
}
