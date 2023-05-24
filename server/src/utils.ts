export function validateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export function validateHash(str: string) {
  const regexExp = /^[a-f0-9]{64}$/gi;

  return regexExp.test(str);
}
