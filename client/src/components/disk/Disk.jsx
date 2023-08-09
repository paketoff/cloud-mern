import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from '../../actions/file';
import FileList from "./fileList/FileList";
import './disk.scss';

export default function Disk() {

  const dispatch = useDispatch();

  const currentDir = useSelector(state => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir]);

  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back'>
          Go Back
        </button>
        <button className='disk__create'>
          Create Folder
        </button>
      </div>
      <FileList/>
    </div>
  )
}

