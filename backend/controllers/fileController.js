const fileService = require('../services/fileService');
const user = require('../models/user');
const File = require('../models/file');
const config = require("config");
const fs = require("fs");

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

  async uploadFile(req, res) {
    try {
      const file = req.files.file;

      const parent = await File.findOne({user: req.user.id, _id: req.body.parent});

      const user = await User.findOne({_id: req.user.id});

      if(user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({messagae: "There no free space on your disk!"});
      }

      user.usedSpace = user.usedSpace + file.size;

      let path;
      if(parent) {
        path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${config.get('filePath')}\\${user._id}\\${file.name}`;
      }

      if(fs.existsSync(path)) {
        return res.status(400).json({messagae: "File already exists!"});
      }

      file.mv(path);

      const type = file.name.split('.').pop(); //extension
      const dbFile = new File({
        name: file.name,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: user._id,
      });

      await dbFile.save();
      await user.save();

      res.json(dbFile);

    } catch (e) {
      console.log(e);
      return res.status(500).json({message: "File upload error!"});
    }
  }
}

module.exports = new FileController();