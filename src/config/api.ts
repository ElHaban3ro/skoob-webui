export const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_SKOOB_API;
  const dynamicUrl = `${window.location.protocol}//${window.location.hostname}:3030`;

  console.log("ENV URL:", envUrl);
  console.log("Dynamic URL:", dynamicUrl);
  console.log("Final URL:", envUrl || dynamicUrl);

  return envUrl || dynamicUrl;
};
