const fileService = require('../services/fileService');
const user = require('../models/user');
const File = require('../models/file');

class FileController {
  async createDir(req, res) {
    try {
      const {name, type, parent} = req.body;
      const newFile = new File({name, type, parent, user: req.user.id});
      const parentFile = await File.findOne({_id: parent});
      if(!parentFile) {
        newFile.path = name;
        await fileService.createDir(newFile);
      } else {
        newFile.path = `${parentFile.path}\\${newFile.name}`;
        await fileService.createDir(newFile);
        parentFile.childs.push(newFile._id);
        await parentFile.save();
      }
      await newFile.save();
      return res.json(newFile);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({user: req.user.id, parent: req.query.parent});
      return res.json(files);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "File reading error!"});
    }
  }
}

module.exports = new FileController();