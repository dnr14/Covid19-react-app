export const getDateStr = (date) => {
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate() - 1}`.padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const lastWeek = () => {
  const day = new Date();
  const dayOfMonth = day.getDate();
  day.setDate(dayOfMonth - 6);
  return getDateStr(day);
};


export default function getInitialDate() {
  const toDay = new Date();
  return { startData: lastWeek(), endData: getDateStr(toDay) };
};

export const hyphenRemove = (date) => {
  const regex = /-/gi;
  return Object.keys(date).reduce((acc, current) => {
    acc[current] = date[current].replaceAll(regex, "");
    return acc;
  }, {});
};


export const validation = (date) => {
  const isFalse = false;

  const is7DayDifferenceChecked = (date) => {
    const _7DayTime = 518400000;
    const { startData, endData } = date;
    const startTime = new Date(startData).getTime();
    const endTime = new Date(endData).getTime();
    const difference = endTime - startTime;

    if (difference > _7DayTime) {
      return true;
    }
    return false;
  };
  const isDateCheck = (date) => Object.keys(date).reduce((acc, current) => date[acc] > date[current]);
  const isDataEmptyCheck = (date) => {
    for (const key in date) {
      if (Object.hasOwnProperty.call(date, key)) {
        if (date[key] === "") return date[key] ?? true;
      }
    }
    return false;
  };

  if (is7DayDifferenceChecked(date) || isDateCheck(date) || isDataEmptyCheck(date)) {
    return !isFalse;
  }
  return isFalse;
};

export const groupBy = function (data, key) {
  return data.reduce(function (carry, el) {
    const group = `${el.createDt.split("-")[0]}-${el.createDt.split("-")[1]}`;

    if (carry[group] === undefined) {
      carry[group] = [];
    }

    carry[`${group}`].push(el);
    return carry;
  }, {});
};