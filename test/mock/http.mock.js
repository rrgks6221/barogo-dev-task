export const mockReq = {
  path: 'path',
  params: {},
  body: {},
};

export const mockRes = {
  status() {
    return this;
  },

  json() {
    return this;
  },
};

export const mockNext = jest.fn();
