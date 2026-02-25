const backendErrorMap = {
  "Email is already taken": "auth.register.emailTaken",
  "Invalid email or password": "auth.login.invalidCredentials",
  "Update failed": "profile.updateFailed",
};

export function translateBackendError(message, t) {
  const key = backendErrorMap[message];
  return key ? t(key) : message;
}
