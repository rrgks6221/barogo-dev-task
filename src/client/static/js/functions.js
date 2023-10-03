export const myAxios = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: options.body && JSON.stringify(options.body),
  });

  return {
    status: response.status,
    body: response.status === 204 ? {} : await response?.json(),
  };
};

export const getCardNumber = () => {
  return Math.floor(Math.random() * 10000000);
};
