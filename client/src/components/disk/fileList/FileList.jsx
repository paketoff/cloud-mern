import React from 'react';
import './fileList.scss';
import { useSelector } from 'react-redux';
import File from "./file/File";

export default function FileList() {

  const files = useSelector(state => state.files.files).map(file => <File key={file.id} file={file}/>);

  return (
    <div className='filelist'>
      <div className='filelist__header'>
        <div className='filelist__name'>File name</div>
        <div className='filelist__date'>File date</div>
        <div className='filelist__size'>File size</div>
      </div>
      {files}
    </div>
  )
}
