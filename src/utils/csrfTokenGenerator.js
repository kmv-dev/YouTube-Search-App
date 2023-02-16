const jwt = {
  header: {
    alg: "H256",
    typ: "JWT",
  },
  payload: {
    iss: "csrfGenerator",
    sub: "auth",
    exp: new Date().toLocaleTimeString("ru-Ru"),
  },
  signature: Math.random().toString(36).substring(2),
};

const base64Encode = (obj) => {
  const base64 = [];
  for (let key in obj) {
    base64.push(`${obj[key]}${Math.random().toString(16).substring(2)}`);
  }
  return base64.join("");
};

export const csrfToken = () => {
  const token = `${base64Encode(jwt.header)}.${base64Encode(jwt.payload)}.${
    jwt.signature
  }`;
  localStorage.setItem("jwtToken", token);
};
