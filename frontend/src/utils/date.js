export const getDate = () => {
  let date;
  let today = new Date();
  let month = today.toLocaleDateString("default", { month: "short" });
  let day = String(today.getDate()).padStart(2, "0");
  let year = today.getFullYear();

  date = `${month} ${day}, ${year}`;
  return date;
};
