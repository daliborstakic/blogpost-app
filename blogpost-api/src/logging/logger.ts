const levels = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

const getTimestamp = (): string => {
  return new Date().toISOString();
};

const log = (level: string, component: string, message: string, data?: any) => {
  const timestamp = getTimestamp();
  const logMessage = `[${timestamp}] [${level}] [${component}] - ${message}`;
  if (data) {
    console.log(`${logMessage} |`, data);
  } else {
    console.log(logMessage);
  }
};

export const Logger = {
  info: (component: string, message: string, data?: any) =>
    log(levels.INFO, component, message, data),
  warn: (component: string, message: string, data?: any) =>
    log(levels.WARN, component, message, data),
  error: (component: string, message: string, data?: any) =>
    log(levels.ERROR, component, message, data),
};
