

const {cloudinary} = require("../config/cloudConfig")

const cloudUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder: "users"},
            (error, result) => {
                if(error) reject(error)
                    else resolve(result.secure_url)
            }
        )
        stream.end(fileBuffer)
    })
}

module.exports = {cloudUpload}