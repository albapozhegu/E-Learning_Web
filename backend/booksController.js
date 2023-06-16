const conn = require('./mySqlConnection')
const { uploadImage } = require("./services/commonService");
const { cloudinary } = require('./configs/cloudinaryConfig');
const {uploadfs} = require('./middlewares/fileStorageMiddleware')
const {v4: uuidv4} =require('uuid');
const path = require('path');


//change to save to MySql database

exports.addBooks = async(req, res) => {
          const { title,description, authour,cover,price} = req.body;
         
           let coverUrl = null;
            
        const file = req.files.cover;
        const alterFileName = uuidv4()+file.name;
          const fpath = __dirname + "/uploads/books/" + alterFileName;
         console.log(fpath, process.env.API_BASE_URL)
       
           // const fpath = __dirname + "/uploads/" + file.name;
              file.mv(fpath, (err) => {
                if (err) {
                    console.log(err)
                  return res.status(500).send(err);
                }
                coverUrl = process.env.API_BASE_URL +"/public/books/"+ alterFileName;
                 const sql = `INSERT INTO books(title,description, authour ,cover,price) VALUES(?)`;
                 const values =[ title, description, authour, coverUrl, price];

                conn.query(sql,[values],(error, result)=>{
                if (error) res.status(500).json({error, message: 'Could not add book' })
                if(result){
                 return res.status(200).json({ message: 'Book added successfully' })
            }
          })
            });
         
           
/*
          
          */
   
}

exports.getBooks = (req, res) => {
    const sql =`SELECT * FROM books`;
    conn.query(sql,(error,result)=>{
        if (error) res.status(500).json({error, message: 'Could not fetch books' })
        if(result){
            return res.status(200).json({ books :result, message: `${result.length} books found` })
        }
    })
   
}


exports.getBookById = (req, res) => {
    const sql =`SELECT * FROM books WHERE books.id = ?`;
    const values = [req.params.id]
    conn.query(sql,[values],(error,result)=>{
        if (error) res.status(500).json({ message: 'Could not find book' })
        if(result ){
            const book = result.length>0&&result[0]||null
            return res.status(200).json({ book, message: `${result.length} book found` })
        }
    })
   
}



exports.updateBooks = (req, res) => {
    const bookId = req.params.id;
    const { title,description, authour ,price} = req.body;
    const sql = `UPDATE books SET title = ?, description= ?, price= ?, authour=? WHERE books.id = ?`
    const values = [title,description, price, authour];

    conn.query(sql,[...values, bookId],(error,result)=>{
        if (error) res.status(500).json({ message: 'Could not update books' })
        if(result){
            return res.status(200).json({ message: 'Book updated successfully' })
        }
    })
}

exports.updateBookCover=(req, res)=>{
     const bookId = req.params.id;
       let coverUrl = null;
            
        const file = req.files.cover;
        const alterFileName = uuidv4()+file.name;
          const fpath = __dirname + "/uploads/books/" + alterFileName;
       
            file.mv(fpath, (err) => {
                if (err) {
                    console.log(err)
                  return res.status(500).send(err);
                }
                coverUrl = process.env.API_BASE_URL +"/public/books/"+ alterFileName;
                 const sql = `UPDATE books SET cover = ? WHERE books.id = ?`;
                 const values =[coverUrl];

                conn.query(sql,[...values, bookId],(error, result)=>{
                if (error) res.status(500).json({error, message: 'Could not update book cover image' })
                if(result){
                 return res.status(200).json({ message: 'Book updated successfully' })
            }
          })
            });


}

exports.deleteBooks = (req, res) => {
    const bookId = req.params.id;
    const sql = `DELETE FROM books WHERE books.id = ?`;
    const values =[bookId];
     conn.query(sql,[values],(error,result)=>{
        if (error) res.status(500).json({ message: 'Could not delete book' })
        if(result){
            return res.status(200).json({message: 'Book deleted successfully' })
        }
    })

}
