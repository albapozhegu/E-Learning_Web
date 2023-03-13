const fs = require('fs');

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

exports.uploadImage = async function(req, res, next) {
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({message: "No files were uploaded."})
            
        const file = req.files.file;

        if(file.size / 1024 ** 2 > 2){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message: "Size too large."})
        } 

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message: "File format is incorrect."})
        }

        next()
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}


