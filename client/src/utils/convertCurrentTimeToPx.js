import moment from "moment";

export const convertCurrentTimeToPx = () => {
  let defaultHeight = 60;
  const time = moment();
  const hours = time.hours();
  const minutes = time.minute();

  return defaultHeight + 120 + "px";
};
