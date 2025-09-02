const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
});

async function uploadFile(file,filename) {
    const response = await imagekit.upload({
        file:file,
        fileName:filename,
        folder: "cohort-ai-social"
    })
    return response;
}

module.exports = uploadFile;