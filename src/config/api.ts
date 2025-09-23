export const getApiUrl = () => {
  console.log("API URL:", import.meta.env.VITE_SKOOB_API);

  return (
    import.meta.env.VITE_SKOOB_API ||
    `${window.location.protocol}//${window.location.hostname}:3030`
  );
};
