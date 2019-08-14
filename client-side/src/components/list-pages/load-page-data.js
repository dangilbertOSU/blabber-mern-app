export const callBackendAPI = async (user) => {
  const response = await fetch(`/api/${user}/pages`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  return body;
};
