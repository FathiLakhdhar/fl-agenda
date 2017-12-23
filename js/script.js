var options={
  startDate : new Date(),
  endDate : new Date(2018, 0, 2)
}

calendly = new Calendly('agenda', options);

calendly.addEventListener('flClickDate', (e) => alert(e.date), false);
