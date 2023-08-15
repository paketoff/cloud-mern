import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles } from '../../actions/file';
import FileList from "./fileList/FileList";
import './disk.scss';
import Popup from './Popup';
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';

export default function Disk() {

  const dispatch = useDispatch();

  const currentDir = useSelector(state => state.files.currentDir);

  const dirStack = useSelector(state => state.files.dirStack);

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir]);

  function createDirHandler() {
    // dispatch(createDir(currentDir, 'test'));
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back' onClick={() => backClickHandler()}>
          Go Back
        </button>
        <button className='disk__create' onClick={() => createDirHandler()}>
          Create Folder
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
          <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id='disk__upload-input' className="disk__upload-input" />
        </div>
      </div>
      <FileList/>
      <Popup/>
    </div>
  )
}

