export const combineDateAndTime = (creation: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = creation.getFullYear();
    const month = creation.getMonth() + 1;
    const day = creation.getDate();

    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
}