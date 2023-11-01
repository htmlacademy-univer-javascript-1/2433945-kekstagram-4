/* eslint-disable no-console */
/*const  checkLength = (line, maxLength) => line.length <= maxLength;

checkLength('проверяемая строка', 20);


function isPalindrome(str) {
  const line = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = line.split('').reverse().join('');
  return line === reversedStr;
}

isPalindrome('Город Ижевск свеж и дорог');
*/

function checkMeetingTime(startOfWorkday, endOfWorkday, startOfMeeting, meetingDuration) {
  const startOfWorkdayMinutes = convertTimeToMinutes(startOfWorkday);
  const endOfWorkdayMinutes = convertTimeToMinutes(endOfWorkday);
  const startOfMeetingMinutes = convertTimeToMinutes(startOfMeeting);
  const endOfMeetingMinutes = startOfMeetingMinutes + meetingDuration;

  if (startOfMeetingMinutes >= startOfWorkdayMinutes && endOfMeetingMinutes <= endOfWorkdayMinutes) {
    return true;
  } else {
    return false;
  }
}

function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

console.log(checkMeetingTime('8:00', '17:30', '14:00', 90)); // true
console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));     // true
console.log(checkMeetingTime('8:00', '14:30', '14:00', 90)); // false
console.log(checkMeetingTime('14:00', '17:30', '8:0', 90));  // false
console.log(checkMeetingTime('8:00', '17:30', '08:00', 900)); // false
