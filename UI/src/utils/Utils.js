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

  return { BuildQueryJson, parseDate, stringFormat, getPath };
}
