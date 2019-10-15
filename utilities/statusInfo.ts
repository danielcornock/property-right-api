const timeLog = (message: string) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
};

export default timeLog;
