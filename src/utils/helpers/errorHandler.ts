export const handlePuppeteerError = (error: Error) => {
  // Log the error
  console.error("Puppeteer Error:", error.message);
  // Re-throw the error
  throw error;
};
