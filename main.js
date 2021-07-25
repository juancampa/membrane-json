import jsonata from 'jsonata';

export const Root = {
  json: ({ args: { value } }) => {
    return JSON.parse(value) || null;
  },
}

export const Json = {
  eval: ({ obj, args: { expr } }) => {
    if (typeof expr !== 'string') {
      throw new Error("Missing expr");
    }
    // TODO: remove the extra parsing. It's required for cases where the root is
    // an array for some reason. Probably an issue with wrapper_object
    const value = jsonata(expr).evaluate(JSON.parse(JSON.stringify(obj)));
    print(`EVALUATING ${expr} on ${obj} (${typeof obj}): ${value}`)
    return value;
  },
  json: ({ obj }) => {
    return JSON.stringify(obj);
  },
  string: ({ obj }) => {
    if (typeof(obj) === "string") {
      return obj;
    }
    return null;
  },
  float: ({ obj }) => {
    if (typeof(obj) === "number") {
      return obj;
    }
    return null;
  },
  int: ({ obj }) => {
    if (typeof(obj) === "number" && Number.isInteger(obj)) {
      return obj;
    } else if (typeof(obj) === "string") {
      try {
        return Number.parseInt(obj);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  boolean: ({ obj }) => {
    if (typeof(obj) === "bool") {
      return obj;
    }
    return null;
  }
}
