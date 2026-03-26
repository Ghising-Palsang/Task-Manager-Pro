const CloudinaryService = require("./cloudinary.service");


class fileUploadService {
  svc;
  constructor() {
    this.svc = new CloudinaryService();
  }
}

const fileUploadSvc = new fileUploadService();
module.exports = fileUploadSvc;
