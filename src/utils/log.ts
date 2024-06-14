const Log = Object.freeze({
  ...console,
  // config: {},
  // setConfig: (config: any) => {
  //   Log.config = config;
  // },
  error: (...args: any[]) => console.error("[ERROR]", ...args),
  log: (...args: any[]) => console.log("[LOG]", ...args),
  warn: (...args: any[]) => console.warn("[WARN]", ...args),
  info: (...args: any[]) => console.info("[INFO]", ...args),
  debug: (...args: any[]) => console.debug("[DEBUG]", ...args),
});

export default Log;
