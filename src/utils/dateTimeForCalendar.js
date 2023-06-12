export function dateTimeForCalendar({
  startDate,
  startDateTime,
  endDate,
  endDateTime,
}) {
  const padZero = (value) => (value < 10 ? `0${value}` : value);

  const startDateParts = startDate.split("/");
  const endDateParts = endDate.split("/");

  const year = startDateParts[2];
  const month = padZero(parseInt(startDateParts[1], 10));
  const day = padZero(parseInt(startDateParts[0], 10));

  const [startHour, startMinute] = startDateTime.split(":");
  const hour = padZero(parseInt(startHour, 10));
  const minute = padZero(parseInt(startMinute, 10));

  const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000`;

  const event = new Date(Date.parse(newDateTime));
  const start = event;

  const endYear = endDateParts[2];
  const endMonth = padZero(parseInt(endDateParts[1], 10));
  const endDay = padZero(parseInt(endDateParts[0], 10));

  const [endHour, endMinute] = endDateTime.split(":");
  const endHourValue = padZero(parseInt(endHour, 10));
  const endMinuteValue = padZero(parseInt(endMinute, 10));

  const endDateTimeString = `${endYear}-${endMonth}-${endDay}T${endHourValue}:${endMinuteValue}:00.000`;

  const endEvent = new Date(Date.parse(endDateTimeString));
  const end = endEvent;

  return {
    start,
    end,
  };
}
