export const routeNotFoundHandler = async (req, res) => {
  res.json({ status: "failure", message: `Cannot ${req.method} ${req.path}` });
};
