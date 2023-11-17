const {S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand, ListObjectsV2Command} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3Client = new S3Client({
    region: "eu-north-1",
    credentials:{
        accessKeyId: "AKIA3M6VGTQ32W2SV5IK",
        secretAccessKey: "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"
    }
})

const getObjectUrl = async(key) =>{
    const command = new GetObjectCommand({
        Bucket: "mynodecloudbucket",
        Key: key
    })

    const url = await getSignedUrl(s3Client,command);
    return url;
}


const uploadObjectUrl = async(filename, ContentType) => {
    const command = new PutObjectCommand({
        Bucket: "mynodecloudbucket",
        Key: `UserUploads/images/${filename}`,
        ContentType: ContentType
    })

    const url = await getSignedUrl(s3Client,command);
    return url;
}

const listObjectUrl = async() => {
    const command = new ListObjectsV2Command({
        Bucket: "mynodecloudbucket",
        key: "UserUploads/"
    })

    const url = await s3Client.send(command)
    return url;
}

const init = async() => {
    // console.log( await uploadObjectUrl(`newImage1${Date.now()}`,'image/png'));
    console.log(await listObjectUrl());
    }
// init();

module.exports = {getObjectUrl, uploadObjectUrl, listObjectUrl};