// Giả sử forecastData là đối tượng chứa thông tin dự báo
const times = [7, 8, 10, 12, 13, 16, 19, 22];
export function getHours(forecastData, hourStart, hourEnd) {
    // Kiểm tra xem forecastData có tồn tại và có đúng cấu trúc không
    if (
        !forecastData ||
        !forecastData.forecast ||
        !forecastData.forecast.forecastday ||
        forecastData.forecast.forecastday.length === 0
    ) {
        return []; // Trả về mảng rỗng nếu dữ liệu không hợp lệ hoặc không tồn tại
    }

    // Lấy dữ liệu giờ của forecastday đầu tiên
    const firstDayHours = forecastData.forecast.forecastday[0].hour;

    // Lọc dữ liệu giờ dựa trên khoảng giờ được cung cấp
    const filteredHours = firstDayHours.filter((hourEntry) => {
        const entryTime = new Date(hourEntry.time_epoch * 1000);
        const entryHour = entryTime.getHours(); // Sử dụng giờ local, thay đổi nếu cần sử dụng giờ UTC
        return times.includes(entryHour);
    });

    return filteredHours; // Trả về mảng các giờ đã được lọc
}
export const getDay = (data) => {
    const dateData = new Date(data.date_epoch * 1000);
    const dayOfweek = dateData.getDay();
    const date = dateData.getDate();
    const month = dateData.getMonth();
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const monthName = months[month];
    return {
        date: date,
        day: days[dayOfweek],
        month: monthName,
    };
};
