function timeConverter(time) {
  const hours = Math.floor(time / 60);
  const mins = Math.round(time % 60);

  return `${hours} H : ${mins}m`;
}

export default timeConverter;
