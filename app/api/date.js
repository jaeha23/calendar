export default checkDate = () => {
  const myDate = new Date();
  const today = new Date(
    myDate.getFullYear(),
    myDate.getMonth(),
    myDate.getDate(),
    myDate.getHours() + 9,
    myDate.getMinutes(),
    myDate.getSeconds(),
  );

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + '-' + month + '-' + day;
  return dateString;
};
