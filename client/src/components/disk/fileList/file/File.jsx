import React from 'react';
import './file.scss';
import DirLogo from '../../../../assets/img/directory.svg';
import FileLogo from '../../../../assets/img/directory.svg';

export default function File({file}) {
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? DirLogo : FileLogo} alt=""  className="file__img"/>
        <div className='file__name'>{file.name}</div>
        <div className='file__date'>{file.date.slice(0,10)}</div>
        <div className='file__size'>{file.size}</div>
    </div>
  )
}
