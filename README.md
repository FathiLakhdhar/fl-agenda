# fl-agenda
Plugin Agenda JavaScript
![Capture Plugin Agenda JavaScript](https://github.com/FathiLakhdhar/fl-agenda/blob/master/Capture.png)

## Exemple
### style
```
<link rel="stylesheet" href="css/ionicons.min.css">
<link rel="stylesheet" href="css/calendly.css">
```

### html
```
    <div id="agenda"></div>
```

### script
```
<script src="js/calendly.js"></script>
<script src="js/script.js"></script>
```
create script.js
```javascript
var options={
  startDate : new Date(2018, 0, 1),
  endDate : new Date(2018, 0, 5),
  holidays: [new Date(2018, 0, 3)],
  weekHolidays: [0, 5]
}

calendly = new Calendly('agenda', options);

calendly.addEventListener('flClickDate', (e) => alert(e.date), false);
```
