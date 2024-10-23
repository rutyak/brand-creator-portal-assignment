const cloudinary = require('cloudinary').v2;
        
cloudinary.config({ 
  cloud_name: 'daguvaxyh', 
  api_key: '318533964178182', 
  api_secret: 'wWEakrFN2381kkhV0cdOevCSIVs'
});

module.exports = cloudinary;