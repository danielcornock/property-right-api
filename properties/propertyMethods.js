exports.setImagePath = req => {
  const url = req.protocol + '://' + req.get('host');
  const randomNum = Math.floor(Math.random() * 3) + 1;
  let imagePath = url + '/images/' + `default-${randomNum}.png`;
  if (req.file) {
    imagePath = url + '/images/' + req.file.filename;
  }

  return imagePath;
};
