const { CloudinaryConfig } = require("../config/config");
const { fileDelete } = require("../utilities/helper");

const cloudinary = require("cloudinary").v2;

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: CloudinaryConfig.cloudName,
      api_key: CloudinaryConfig.apiKey,
      api_secret: CloudinaryConfig.apiSecret,
    });
  }

  fileUpload = async (filepath, dir = "") => {
    try {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        filepath,
        {
          unique_filename: true,
          folder: "task-manager/" + dir,
        },
      );
      // deleting local one after uploading in cloudinary
      fileDelete(filepath)

      

      const imageUrl = cloudinary.url(public_id, {
        transformation: [
          {width: "150", height:"150"},
          {format: "auto"}
        ]
      })
      return {
        publicId: public_id,
        publicUrl: secure_url,
        thumbUrl: imageUrl
      };
    } catch (error) {
      console.log(error, "Cloudinary error");
      throw error;
    }
  };


  replaceFile = async(oldPublicId, newFilePath, dir="") =>{
    if(oldPublicId){
      await cloudinary.uploader.destroy(oldPublicId)
    }

    return await this.fileUpload(newFilePath, dir)
  }
}

module.exports = CloudinaryService;
