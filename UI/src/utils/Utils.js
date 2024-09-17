///called like this Build..([1,0],["exerciseId",1],[["categoryId",1]])

export default function useUtils() {
  function BuildQueryJson(paging, sorting, filters) {
    return {
      paging: {
        take: paging[0],
        skip: paging[1],
      },
      sorting: {
        sortBy: sorting[0],
        sortDirection: sorting[1],
      },
      filters: filters.map((filter) => {
        return {
          propertyDBName: filter[0],
          value: filter[1],
        };
      }),
    };
  }

  function parseDate(date) {
    return date.split("T")[0];
  }

  function stringFormat(template, ...args) {
    if (!template) {
      return "";
    }

    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    return template.replace(/\{(\d+)\}/g, (match, index) => {
      return args[index] !== undefined ? args[index] : match;
    });
  }

  function getPath() {
    return window.location.href.split(":")[2].slice(4);
  }

  function parseTimeSpan(timeSpanStr) {
    const timeSpanParts = timeSpanStr.split(":");

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (timeSpanParts.length === 3) {
      const [dayHour, min, sec] = timeSpanParts;
      if (dayHour.includes(".")) {
        const dayHourParts = dayHour.split(".");
        days = parseInt(dayHourParts[0], 10);
        hours = parseInt(dayHourParts[1], 10);
      } else {
        hours = parseInt(dayHour, 10);
      }
      minutes = parseInt(min, 10);
      seconds = parseInt(sec, 10);
    } else if (timeSpanParts.length === 2) {
      [hours, minutes] = timeSpanParts.map((part) => parseInt(part, 10));
    }

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  async function fetchDataForScroll(setter, index, asyncGet) {
    var newData = await asyncGet();
    setter((oldData) => [...oldData, ...newData.slice(index)]);
  }
  return { BuildQueryJson, parseDate, stringFormat, getPath, parseTimeSpan, fetchDataForScroll };
}
