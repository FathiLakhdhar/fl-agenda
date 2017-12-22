(function() {

    function Calendly(idElem, date) {

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



      self = this;


      if (document.getElementById(idElem)) {
        this.elem = document.getElementById(idElem);
      }
      if (date) this.d = date;

      this.currentweekdate = new Date(this.d.getTime());

      var agendaDOM = document.createElement('div');
      this.agendaDOM = agendaDOM;
      agendaDOM.className = 'fl-agenda';
      agendaDOM.setAttribute("data-week", "This week");

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


      var week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
      var nbWeek = 0;

      this.setDate = (nd) => this.d = nd;
      this.nextWeek = () => {
        nbWeek++;
        this.currentweekdate.setDate(this.currentweekdate.getDate() + 7);
        spanPrev.className = 'ion ion-chevron-left';
        if(nbWeek == 1){
          agendaDOM.setAttribute("data-week", "Next week");
        }else if(nbWeek == 0){
          agendaDOM.setAttribute("data-week", "This week");
        }else{
          agendaDOM.setAttribute("data-week", nbWeek+" weeks out");
        }
        this.updateDOM();
      };
      this.prevWeek = () => {
        let today = new Date();
        
        if ((this.currentweekdate.getMonth() == today.getMonth()) && (this.currentweekdate.getDate() > today.getDate()) || (this.currentweekdate.getFullYear() > today.getFullYear())) {
          if(nbWeek != 0) nbWeek--;
          this.currentweekdate.setDate(this.currentweekdate.getDate() - 7);
          if(nbWeek == 1){
            agendaDOM.setAttribute("data-week", "Next week");
          }else if(nbWeek == 0){
            agendaDOM.setAttribute("data-week", "This week");
          }else{
            agendaDOM.setAttribute("data-week", nbWeek+" weeks out");
          }
          this.updateDOM();

          } else {
            spanPrev.className = 'ion ion-chevron-left disabled';
          }

        };

        this.updateDOM = function() {
          daysDOM.innerHTML = "";
          week.forEach((s, i) => {
            var dateDOM = document.createElement('div');
            dateDOM.className = 'fl-date';

            var dayDOM = document.createElement('span');
            dayDOM.className = 'fl-day';
            var monthDateDOM = document.createElement('span');
            monthDateDOM.className = 'fl-month-date';

            var cd = new Date(this.currentweekdate.getTime());
            cd.setDate(cd.getDate() - cd.getDay() + i);
            let today = new Date();
            if ((today.getDay() > cd.getDay()) && (today.getDate() > cd.getDate()) && (today.getMonth() == cd.getMonth())) {
              dateDOM.className = 'fl-date disabled';
            }
            if ((today.getDay() == cd.getDay()) && (today.getDate() == cd.getDate()) && (today.getMonth() == cd.getMonth())) {
              dateDOM.className = 'fl-date today';
            }

            dateDOM.onclick = (e) => {
              var elem = e.target;
              var event = new Event('flClickDate');
              event.date = cd;
              agendaDOM.dispatchEvent(event);
            };

            dayDOM.innerText = week[i];
            monthDateDOM.innerText = cd.toString().split(' ')[1] + ' ' + cd.toString().split(' ')[2];
            dateDOM.appendChild(dayDOM);
            dateDOM.appendChild(monthDateDOM);

            var marginRightDOM = document.createElement('div');
            marginRightDOM.className = 'margin-right';
            daysDOM.appendChild(dateDOM);
            daysDOM.appendChild(marginRightDOM);

          });
          agendaDOM.appendChild(daysDOM);
        }



        this.Init = function(e, da) {
          if (e) this.elem = document.getElementById(e);
          if (da) this.d = da;
          this.elem.innerHTML = "";

          this.updateDOM();
          this.elem.appendChild(agendaDOM);
        }


      }
      calendly = Object.create(new Calendly('calendly', new Date()), {
        init: (e, d) => console.log('init')
      });
      window['calendly'] = calendly;
    })();


  calendly.Init('calendly', new Date(2018, 0, 12));

  calendly.agendaDOM.addEventListener('flClickDate', (e)=> alert(e.date), false);
