const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dzrvphsoc', 
  api_key: '566582746469324', 
  api_secret: 'Am-ksePiheYIYQT2FQsbGJcoCbw' 
});

module.exports = {cloudinary};