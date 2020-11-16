export default function getColor(course) {
  let color;
  switch (course) {
    case "COMPSCI 4HC3":
      color = "blue";
      break;
    case "SFRWENG 1234":
      color = "red";
      break;
    default:
      color = "pink"
      break;
  }

  return color;
}