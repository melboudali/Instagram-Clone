const timeDifference = (previousTimestamp: string) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = Number(new Date()) - Number(previousTimestamp);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months';
  } else {
    return Math.round(elapsed / msPerYear) + ' years';
  }
};

export default timeDifference;
