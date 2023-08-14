import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles } from '../../actions/file';
import FileList from "./fileList/FileList";
import './disk.scss';
import Popup from './Popup';
import { setPopupDisplay } from '../../reducers/fileReducer';

export default function Disk() {

  const dispatch = useDispatch();

  const currentDir = useSelector(state => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir]);

  function createDirHandler() {
    // dispatch(createDir(currentDir, 'test'));
    dispatch(setPopupDisplay('flex'));
  }

  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back'>
          Go Back
        </button>
        <button className='disk__create' onClick={() => createDirHandler()}>
          Create Folder
        </button>
      </div>
      <FileList/>
      <Popup/>
    </div>
  )
}

