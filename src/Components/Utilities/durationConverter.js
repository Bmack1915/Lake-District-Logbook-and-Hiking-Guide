import timeConverter from "./timeConverter";

function durationConverter(duration) {
  const dateString = new Date(duration);
  const hours = dateString.getUTCHours();
  const mins = dateString.getUTCMinutes();
  const convertedDuration = timeConverter(hours * 60 + mins);

  return convertedDuration;
}

export default durationConverter;
