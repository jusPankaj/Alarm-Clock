// function to get the current time in exact hours, minutes, seconds
function getCurrentTime() {
  var date = new Date();
  var hours = date.getHours();
  hours = hours % 12;
  hours < 10 ? "0" + hours : hours;
  var minutes = date.getMinutes();
  minutes < 10 ? "0" + minutes : minutes;
  var seconds = date.getSeconds();
  seconds < 10 ? "0" + seconds : seconds;
  var session = hours >= 12 ? "PM" : "AM";

  let liveTime = formatOfTime(hours) + ":" + formatOfTime(minutes) + ":" + formatOfTime(seconds) + " " + session;
  return liveTime;
}

//function to display the current time on web
function displayTime() {
  const currentTime = getCurrentTime();
  document.getElementById("clockDisplay").textContent = currentTime;
}

//format of the time to lead the zero  or not
function formatOfTime(unit){
    return unit < 10 ? '0' + unit : unit;
}

// Show notification of alarm
function showNotification(text) {
  alert(text);
}

//function to clear the input values once we add it to the list
function clearAlarmInputs(){
  document.getElementById('inputHrs').value = '';
  document.getElementById('inputMins').value = '';
  document.getElementById('inputSecs').value = '';
  document.getElementById('inputSession').value = 'AM';
}

//function to sort the alarms
let alarmsArray = [];

function sortAlarms() {
  alarmsArray.sort((a, b) => {
    //splitting the time string into components

    const [timeA, sessionA] = a.split(" ");
    const [hoursA, minutesA, secondsA] = timeA.split(":");
    const [timeB, sessionB] = b.split(" ");
    const [hoursB, minutesB, secondsB] = timeB.split(":");

    //comparing the sessions (AM/PM)

    if (sessionA != sessionB) {
      if (sessionA === "AM") {
        return -1;
      } else {
        return 1;
      }
    }

    //comparing hours
    if (parseInt(hoursA) < parseInt(hoursB)) {
      return -1;
    }
    if (parseInt(hoursA) > parseInt(hoursB)) {
      return 1;
    }

    //comparing minutes
    if (parseInt(minutesA) < parseInt(minutesB)) {
      return -1;
    }
    if (parseInt(minutesA) > parseInt(minutesB)) {
      return 1;
    }

    //comparing seconds
    if (parseInt(secondsA) < parseInt(secondsB)) {
      return -1;
    }
    if (parseInt(secondsA) > parseInt(secondsB)) {
      return 1;
    }

    // if hours, minutes and seconds all are same
    return 0;
  });
}

//function to add the alarm to the list
function addAlarmToList(alarmValue) {
  const alarmList = document.getElementById("alarmList");
  const alarmItem = document.createElement("li");
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";

  alarmItem.innerText = alarmValue;
  let strValue = alarmValue.toString();
  alarmItem.id = strValue;
  // console.log(alarmItem)

  alarmList.append(alarmItem);
  alarmItem.append(deleteBtn);
  alarmsArray.push(alarmValue);
  // console.log(alarmsArray);
  sortAlarms();

  deleteBtn.addEventListener("click", (e) => {
    deleteAlarm(alarmItem,e);
    alarmList.removeChild(deleteBtn);
  });
}


//function to set the alarm
function setAlarm() {
  var hr = parseInt(document.getElementById("inputHrs").value);
  var min = parseInt(document.getElementById("inputMins").value);
  var sec = parseInt(document.getElementById("inputSecs").value);
  var sess = document.getElementById("inputSession").value;

  // console.log('abc', hr, min, sec,sess);

  let setAlarmTime = formatOfTime(hr) + ":" + formatOfTime(min) + ":" + formatOfTime(sec) + " " + sess;

  if((hr!=null &&!isNaN(hr)) || (min != null && !isNaN(min))|| (sec !=null) && !isNaN(hr)){
    addAlarmToList(setAlarmTime);
    showNotification("Alarm Set");
    clearAlarmInputs();
  }else{
    showNotification("It can not be null");
  }
  
}

//function to Trigger the Alarm
function checkAndTriggerAlarm() {
  let currentTime = getCurrentTime();
  
  if (alarmsArray[0] == currentTime) {
    showNotification("Wake Up Mate, You have things to do");
     
    // deleteAlarm(alarmsArray[0]); 
    let currAlarm = alarmsArray[0].toString();
    // console.log(currAlarm);
    const currId = document.getElementById(currAlarm);
    // console.log(currId)
    const alarmList = document.getElementById("alarmList");
    alarmList.removeChild(currId);
    alarmsArray.splice(0,1);

  }
}

// Function to delete the alarm
function deleteAlarm(alarmItem,e) {
  const alarmList = document.getElementById("alarmList");
  const value = e.target.value;
  const index = alarmsArray.findIndex((target)=>{
    return target == value;
  });
  alarmsArray.splice(index,1)
  alarmList.removeChild(alarmItem);
}

// update the time every second so that it get exact current time
setInterval(displayTime, 1000);

// Function to check alarm every second
setInterval(checkAndTriggerAlarm, 1000);
