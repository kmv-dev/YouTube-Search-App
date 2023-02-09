export const customB64Encode = (obj) => {
  const base64 = [];
  for (let key in obj) {
    base64.push(`${obj[key]}${Math.random().toString(16).substring(2)}`);
  }
  return base64.join("");
};
