class CalendarObject {
  month = null;
  year = null;
  calendar = null;
  constructor(month, year) {
    this.month = month; //First month is 0 (January)
    this.year = year;
    this.calendar = this.createCalendar();
  }
  createCalendar() {
    let countryShift = 6; //TODO: get from country

    let firstDay = new Date(this.year, this.month, 1);
    let lastDay = new Date(this.year, this.month + 1, 0);

    let monthGrid = [];

    let weekrow = Array(7).fill(' ');

    let fw = (firstDay.getDay() + countryShift) % 7;
    for (let i = 1; i <= lastDay.getDate(); i++) {
      if (fw == 0) {
        monthGrid.push(weekrow);
        weekrow = Array(7).fill(' ');
      }
      weekrow[fw] = i;
      fw = (fw + 1) % 7;
    }
    monthGrid.push(weekrow);
    return monthGrid;
  }
}
class CalendarManager {
  static entityInstance = null;

  static getInstance() {
    if (CalendarManager.entityInstance == null) {
      let today = new Date();
      CalendarManager.entityInstance = new CalendarManager(today.getMonth(), today.getFullYear(), '');
    }
    return CalendarManager.entityInstance;
  }

  previousCalendarObj = null;
  currentCalendarObj = null;
  nextCalendarObj = null;
  constructor(currentMonth, year, __name = 'Not singleton') {
    if (__name != '') {
      throw new Error('Cannot create instance of CalendarManager, please use getInstance()');
    }
    //First month is 0 (January) use Date().getMonth() to get current month
    this.previousCalendarObj = new CalendarObject(currentMonth - 1, year);
    this.currentCalendarObj = new CalendarObject(currentMonth, year);

    this.nextCalendarObj = new CalendarObject(currentMonth + 1, year);
  }

  nextMonth() {
    this.currentCalendarObj = this.nextCalendarObj;

    let cPrev = calculatePrevious(this.currentCalendarObj.month, this.currentCalendarObj.year);
    let cNext = calculateNext(this.currentCalendarObj.month, this.currentCalendarObj.year);
    this.previousCalendarObj = new CalendarObject(cPrev.m, cPrev.y);
    this.nextCalendarObj = new CalendarObject(cNext.m, cNext.y);

    return {
      previous: this.previousCalendarObj.calendar,
      current: this.currentCalendarObj.calendar,
      next: this.nextCalendarObj.calendar,

      str: `${this.previousCalendarObj.month + 1}/${this.previousCalendarObj.year} ->[${
        this.currentCalendarObj.month + 1
      }/${this.currentCalendarObj.year}]  ->${this.nextCalendarObj.month + 1}/${this.nextCalendarObj.year} `,
    };
  }
  
  currentMonth() {
    return {
      previous: this.previousCalendarObj.calendar,
      current: this.currentCalendarObj.calendar,
      next: this.nextCalendarObj.calendar,

      str: `${this.previousCalendarObj.month + 1}/${this.previousCalendarObj.year} ->[${
        this.currentCalendarObj.month + 1
      }/${this.currentCalendarObj.year}]  ->${this.nextCalendarObj.month + 1}/${this.nextCalendarObj.year} `,
    };
  }

  previousMonth() {
    this.currentCalendarObj = this.previousCalendarObj;

    let cPrev = calculatePrevious(this.currentCalendarObj.month, this.currentCalendarObj.year);
    let cNext = calculateNext(this.currentCalendarObj.month, this.currentCalendarObj.year);
    this.previousCalendarObj = new CalendarObject(cPrev.m, cPrev.y);
    this.nextCalendarObj = new CalendarObject(cNext.m, cNext.y);

    return {
      previous: this.previousCalendarObj.calendar,
      current: this.currentCalendarObj.calendar,
      next: this.nextCalendarObj.calendar,

      str: `${this.previousCalendarObj.month + 1}/${this.previousCalendarObj.year} ->[${
        this.currentCalendarObj.month + 1
      }/${this.currentCalendarObj.year}]  ->${this.nextCalendarObj.month + 1}/${this.nextCalendarObj.year} `,
    };
  }
}

function calculatePrevious(m, y) {
  //Caluclar el mes anterior
  m = m - 1;
  if (m < 0) {
    m = 11;
    y--;
  }

  return { m: m, y: y };
}
function calculateNext(m, y) {
  m = m + 1;
  if (m > 11) {
    m = 0;
    y++;
  }
  return { m: m, y: y };
}

export function incrementMonth() {
  let c = CalendarManager.getInstance();
  console.log(c.nextMonth());
}
export function decrementMonth() {
  let c = CalendarManager.getInstance();
  console.log(c.previousMonth());
}
export function currentMonth() {
  let c = CalendarManager.getInstance();
  console.log(c.currentMonth());
}
