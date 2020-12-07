const captureWebsite = require('capture-website');
const fs = require('fs');
const AWS = require('aws-sdk');
// Enter copied or downloaded access ID and secret key here
const ID = 'PUT_YOUR_SECRET_ID_FROM_AWS_CREDENTIALS';
const SECRET = 'PUT_YOUR_SECRET_KEY_FROM_AWS_CREDENTIALS_LARGER_THAN_ID';
// The name of the bucket that you have created
const BUCKET_NAME = 'capturethumbnails';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});
const url = 'http://localhost:9001/p/g.7wMYLN6M3GxmS3hh%24m3fof7opcts1j1y41cdxq';
// const thumbnail = `tnfolder/${url}.png`;
const thumbnail = 'tnfolder/24m3fof7opcts1j1y41cdxq';

const options ={
    emulateDevice: 'iPhone X',
    delay : 15,
    height : 720,
    width : 720,
    hideElements: [
            'div#chaticon',
            'div#editbar'
        ]};

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: thumbnail, // File name you want to save as in S3
    Body: fileContent
    };
    console.log("Uploading files to the bucket");
            s3.upload(params, function(err, data) {
                if (err) {
                    throw err;
                }
                console.log(`File uploaded successfully. ${data.Location}`);
            });
        };

captureWebsite.file(url, thumbnail, options).then((res)=>{
    uploadFile(thumbnail);
    //write code for delete
});
