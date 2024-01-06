// Your code here
const createEmployeeRecord = ([firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents]) =>{
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

const createEmployeeRecords = employeeData => employeeData.map(createEmployeeRecord);

const createTimeInEvent = (employeeRecord, dateStamp) => {
    const [date, time] = dateStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
  
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: `${year}-${month}-${day}`,
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
    const [date, time] = dateStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
  
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: `${year}-${month}-${day}`,
    };
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    }
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    return ((timeOutHour - timeInHour)/100);
  }

const wagesEarnedOnDate = (employeeRecord, date) => {
const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
const payRate = employeeRecord.payPerHour;

return hoursWorked * payRate;
}

const allWagesFor = employeeRecord => {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    let totalWages = 0;
  
    for (const date of datesWorked) {
      totalWages += wagesEarnedOnDate(employeeRecord, date);
    }
  
    return totalWages;
}

const calculatePayroll = employeeRecords => {
    let totalPayroll = 0;
  
    for (const employeeRecord of employeeRecords) {
      totalPayroll += allWagesFor(employeeRecord);
    }
  
    return totalPayroll;
}