/*
const  checkLength = (line, maxLength) => line.length <= maxLength;

checkLength('проверяемая строка', 20);


function isPalindrome(str) {
  const line = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = line.split('').reverse().join('');
  return line === reversedStr;
}

isPalindrome('Город Ижевск свеж и дорог');
*/
function isMeetingWithinWorkingHours(startTime, endTime, meetingStart, meetingDuration) {
  const workingStart = parseTime(startTime);
  const workingEnd = parseTime(endTime);
  const meetingStartParsed = parseTime(meetingStart);

  const meetingEnd = addMinutes(meetingStartParsed, meetingDuration);

  if (meetingStartParsed < workingStart || meetingEnd > workingEnd) {
    return false;
  }

  return true;
}

function parseTime(time) {
  const [hours, minutes] = time.split(':').map((part) => parseInt(part, 10));
  return new Date(0, 0, 0, hours, minutes);
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
