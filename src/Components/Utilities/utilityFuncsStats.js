export default function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const difficulties = [
  "All",
  "Easy",
  "Easy/Moderate",
  "Moderate",
  "Moderate/Hard",
  "Hard",
  "Very Hard",
  "Severe",
];

export const areas = [
  "Southern",
  "Northern",
  "Eastern",
  "Western",
  "Central",
  "Far Eastern",
  "North Western",
];
