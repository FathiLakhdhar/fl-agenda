var options={
  startDate : new Date(2018, 0, 1),
  endDate : new Date(2018, 0, 5),
  holidays: [new Date(2018, 0, 3)],
  weekHolidays: [0, 5]
}

calendly = new Calendly('agenda', options);

calendly.addEventListener('flClickDate', (e) => alert(e.date), false);
