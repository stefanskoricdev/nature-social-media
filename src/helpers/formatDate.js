export const formatDate = (dateInMs) => {
  const currentDate = new Date(dateInMs);

  const formatedDate = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };

  return formatedDate;
};
