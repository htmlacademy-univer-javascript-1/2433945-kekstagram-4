const  checkLength = (line, maxLength) => line.length <= maxLength;

checkLength('проверяемая строка', 20);


function isPalindrome(str) {
  const line = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = line.split('').reverse().join('');
  return line === reversedStr;
}

isPalindrome('Город Ижевск свеж и дорог');
