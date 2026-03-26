const multer = require("multer");
const fs = require("fs");

const uploader = (type="image") => {
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const path = "./public/uploads";
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });

  let allowedExt = ["jpg", "jpeg", "png", "webp"];
  let fileSize = 3000000;

  if (type==='doc') {
    allowedExt = ["pdf", "docx", "doc", "txt", "json"];
    fileSize = 5000000;
  }

    if (type === "mixed") {
      allowedExt = [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif",
        "pdf",
        "doc",
        "docx",
        "txt",
        "json",
        "csv",
        "xlsx",
      ];
      fileSize = 5000000; // max file size
    }

  const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    if (allowedExt.includes(ext.toLowerCase())) {
      cb(null, true);
    } else {
      cb({
        code: 415,
        message: "File type not allowed, Allowed types are" + allowedExt,
        name: "FILE_UPLOAD_ERROR",
      });
    }
  };

  return multer({
    storage: myStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: fileSize,
    },
  });
};

module.exports = uploader;
