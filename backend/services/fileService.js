const fs = require("fs");
const File = require("../models/file");
const config = require("config");

class FileService {


  createDir(file) {
    const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`;
    return new Promise(((resolve, reject) => {
      try {
        if(!fs.existsSync(filePath)) { //if file doesn't exist';
          fs.mkdirSync(filePath, { recursive: true });
          return resolve({message: "File was created!"});
        } else {
          return reject({message: "File already exist!"});
        }
      } catch (error) {
        return reject({message: error.message});
      }
    }))
  }
}


module.exports = new FileService();