const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
const PASSWORD_REGEX =
  /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
export { EMAIL_REGEX, PASSWORD_REGEX };
