// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
