import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

export async function uploadFile(file, fileName) {
    try {
        const response = await imagekit.upload({
        file: file,
        fileName: fileName,
        folder: "EdGine_Images"
    })
    return response;
    } catch (error) {
        console.error("Error uploading file to ImageKit:", error);
        throw error;
    }
}

