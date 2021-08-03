
const deepEquals = (target, source) => {
  let result = target;
  if (typeof target === "object" && typeof source === "object") {
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        if (target[key] !== source[key]) {
          result = source;
        }
      }
    }
  }
  return result;
};

export default deepEquals;