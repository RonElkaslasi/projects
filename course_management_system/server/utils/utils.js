const getClassDates = (startDate, endDate, dayClass) => {
  const classDates = [];

  let date = new Date(startDate);

  while (date <= endDate) {
    const dayOfWeek = date.getDay() + 1;
    if (dayClass.includes(dayOfWeek)) classDates.push(new Date(date));

    date = new Date(date.setDate(date.getDate() + 1));
  }

  return classDates;
};

module.exports = { getClassDates };
