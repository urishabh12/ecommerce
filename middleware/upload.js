const multer = require("multer");

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Images");
  },

  filename: function(req, file, callback) {
    callback(null, req.body.email + "_" + file.fieldname + "_" + Date.now());
  }
});

var upload = multer({
  storage: Storage
});

exports.Storage = Storage;
exports.upload = upload;
