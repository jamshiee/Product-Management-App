import axios from 'axios';

const CLOUDINARY_CLOUD_NAME = 'dsauzk2jp'; // Replace this with your actual cloud name

const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'product_images'); 
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export { uploadToCloudinary };
