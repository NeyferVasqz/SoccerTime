const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dq0v872ng",
  api_key: "986426792647645",
  api_secret: "HXnd7M3pgwzXz8I19Q7NZINTR-w",
  secure: true,
});

//subir imagen de locales
async function uploadImageLocal(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "locales",
  });
}

//eliminar imagen
async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

module.exports = {uploadImageLocal, deleteImage};
