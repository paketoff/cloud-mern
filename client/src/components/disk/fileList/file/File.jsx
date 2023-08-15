import React from 'react';
import './file.scss';
import DirLogo from '../../../../assets/img/directory.svg';
import FileLogo from '../../../../assets/img/directory.svg';
import {useDispatch, useSelector} from 'react-redux';
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";

export default function File({file}) {

  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);

  function openDirHandler(file) {
    if(file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  return (
    <div className='file' onClick={openDirHandler(file)}>
      <img src={file.type === 'dir' ? DirLogo : FileLogo} alt=""  className="file__img"/>
        <div className='file__name'>{file.name}</div>
        <div className='file__date'>{file.date.slice(0,10)}</div>
        <div className='file__size'>{file.size}</div>
    </div>
  )
}
