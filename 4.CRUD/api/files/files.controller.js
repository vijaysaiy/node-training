
export const upload = (req, res) => {
  res.json({ status: "success", data: { filename: req.file.filename } });
};

export const download = (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads" });
};
