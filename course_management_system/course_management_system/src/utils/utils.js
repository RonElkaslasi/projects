export const convertNumberToDay = (number) => {
  switch (number) {
    case 1 || "1":
      return "Sunday";
    case 2 || "2":
      return "Monday";
    case 3 || "3":
      return "Tuesday";
    case 4 || "4":
      return "Wednesday";
    case 5 || "5":
      return "Thursday";
    case 6 || "6":
      return "Friday";
    case 7 || "7":
      return "Saturday";
    default:
      return null;
  }
};
