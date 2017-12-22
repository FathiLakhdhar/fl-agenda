(function() {

  /*
  Agenda DOM
  <div class="fl-agenda">
    <span class="ion ion-chevron-left"></span>
    <span class="ion ion-chevron-right"></span>
    <div class="fl-date">
      <span class="fl-day">Fri</span>
      <span class="fl-month-date">Dec 21</span>
    </div>
    <div class="margin-right"></div>
  </div>
  */

  var Calendly = function Calendly(idElem, startDate, endDate) {
    this.startDate = new Date();
    this.endDate = new Date();
    var dateDOMS = [];
    var currentweekdate = new Date();
    var week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    var nbWeek = 0;

    var agendaDOM = document.createElement('div');

    agendaDOM.className = 'fl-agenda';
    agendaDOM.setAttribute("data-week", "This week");
    agendaDOM.setAttribute("data-year", startDate.getFullYear());

    var spanPrev = document.createElement('span');
    spanPrev.className = 'ion ion-chevron-left disabled';
    var spanNext = document.createElement('span');
    spanNext.className = 'ion ion-chevron-right';

    var daysDOM = document.createElement('div');
    daysDOM.style = "display : inline-table;"

    agendaDOM.appendChild(spanPrev);
    agendaDOM.appendChild(spanNext);

    spanPrev.onclick = () => this.prevWeek();
    spanNext.onclick = () => this.nextWeek();


    this.addEventListener = function(label, fn, bool){
      agendaDOM.addEventListener(label, (e)=>fn(e), bool);
    }


    this.nextWeek = function() {
      nbWeek++;
      currentweekdate.setDate(currentweekdate.getDate() + 7);
      spanPrev.className = 'ion ion-chevron-left';
      updateDOM();
    };

    this.prevWeek = function() {
      let today = new Date();
      if (nbWeek > 0) {
        nbWeek--;
        if (nbWeek == 0) spanPrev.className = 'ion ion-chevron-left disabled';
        currentweekdate.setDate(currentweekdate.getDate() - 7);
        updateDOM();
      }
    };

    (function() {
      for (var i = 0; i < 7; i++) {
        var dateDOM = document.createElement('div');
        dateDOM.className = 'fl-date';
        var dayDOM = document.createElement('span');
        dayDOM.className = 'fl-day';
        var textDay = document.createTextNode('');
        var monthDateDOM = document.createElement('span');
        monthDateDOM.className = 'fl-month-date';
        var textMonthDate = document.createTextNode('');

        dateDOMS.push({
          dateDOM,
          dayDOM,
          monthDateDOM,
          textDay,
          textMonthDate
        })

        dayDOM.appendChild(textDay);
        monthDateDOM.appendChild(textMonthDate);
        dateDOM.appendChild(dayDOM);
        dateDOM.appendChild(monthDateDOM);

        var marginRightDOM = document.createElement('div');
        marginRightDOM.className = 'margin-right';

        daysDOM.appendChild(dateDOM);
        daysDOM.appendChild(marginRightDOM);
      }

      //console.log(dateDOMS)
      agendaDOM.appendChild(daysDOM);

    })();

    function updateDOM() {
      updateYearDOM();
      updateNbWeekDOM();
      //week.forEach((s, i) =>
      for (var i = 0; i < 7; i++) {

        var copy_date = new Date(currentweekdate.getTime());
        copy_date.setDate(copy_date.getDate() - copy_date.getDay() + i);
        let today = new Date();


        if ((this.startDate.getFullYear() == copy_date.getFullYear())) {
          if ((this.startDate.getMonth() == copy_date.getMonth())) {
            if ((this.startDate.getDate() > copy_date.getDate())) {
              dateDOMS[i].dateDOM.classList.add("disabled");
              console.log();
            } else {
              dateDOMS[i].dateDOM.classList.remove("disabled");
            }
          } else if ((this.startDate.getMonth() < copy_date.getMonth())) {
            dateDOMS[i].dateDOM.classList.remove("disabled");
          } else {
            dateDOMS[i].dateDOM.classList.add("disabled");
          }
        } else if ((this.startDate.getFullYear() > copy_date.getFullYear())) {
          dateDOMS[i].dateDOM.classList.add("disabled");
        } else dateDOMS[i].dateDOM.classList.remove("disabled");

        if ((today.getDay() == copy_date.getDay()) && (today.getDate() == copy_date.getDate()) && (today.getMonth() == copy_date.getMonth()) && (today.getFullYear() == copy_date.getFullYear())) {
          dateDOMS[i].dateDOM.classList.add('today');
        }else{
          dateDOMS[i].dateDOM.classList.remove('today');
        }

        dateDOMS[i].dateDOM.onclick = (e) => {
          var elem = e.target;
          var event = new Event('flClickDate');
          event.date = copy_date;
          agendaDOM.dispatchEvent(event);
        };

        dateDOMS[i].textDay.textContent = week[i];
        dateDOMS[i].textMonthDate.textContent = copy_date.toString().split(' ')[1] + ' ' + copy_date.toString().split(' ')[2];

      }

    }

    function updateYearDOM() {
      agendaDOM.setAttribute("data-year", currentweekdate.getFullYear());
    }

    function updateNbWeekDOM() {
      if (nbWeek == 1) agendaDOM.setAttribute("data-week", "Next week");
      else if (nbWeek == 0) agendaDOM.setAttribute("data-week", "This week");
      else agendaDOM.setAttribute("data-week", nbWeek + " weeks out");

    }

    (function Init(elm, startDate, endDate) {

      if (elm) this.elem = document.getElementById(elm);
      if (startDate) {
        this.startDate = new Date(startDate.getTime());
        currentweekdate = new Date(startDate.getTime());
      } else {
        this.startDate = new Date();
      }
      if (endDate) {
        this.endDate = new Date(endDate.getTime());
      } else {
        this.endDate = new Date(this.startDate.getTime());
        this.endDate.setFullYear(this.endDate.getFullYear() + 1);
      }
      if (this.elem) {
        this.elem.innerHTML = "";
        updateDOM();
        this.elem.appendChild(agendaDOM);
      }
    })(idElem, startDate, endDate);


  }

  window['Calendly'] = Calendly;
})();


calendly = new Calendly('agenda', new Date(), new Date(2018, 0, 5));


calendly.addEventListener('flClickDate', (e) => alert(e.date), false);
