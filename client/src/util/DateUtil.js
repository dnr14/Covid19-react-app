export const getDateStr = (date) => {
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
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

export const startMonthCheck = (date) => {
  const [yyyy, mm] = date.split("-");
  return `${yyyy}-${mm}-01`;
}

export const endMonthCheck = date => {
  const [yyyy, mm] = date.split("-");
  const idx = mm.indexOf(0);

  const result = mm.indexOf(0) === 0
    ? getDateStr(new Date(yyyy, mm.slice(idx + 1, mm.length), 0))
    : getDateStr(new Date(yyyy, mm, 0));

  return result;
}


export const monthInitailDate = () => {

  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth() - 1, end.getDate());

  const startMonthDate = startMonthCheck(getDateStr(start));
  const endMonthDate = endMonthCheck(getDateStr(end));

  return {
    startData: startMonthDate,
    endData: endMonthDate,
  };
};