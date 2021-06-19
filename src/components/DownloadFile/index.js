import React from 'react';

import { Container, Image, Title } from './style'

import CsvIcon from '../../assets/csv-file.png';
import JsonIcon from '../../assets/json-file.png';


const DownloadFile = ({ name, data }) => {

  const downloadFile = () => {
    const blob = name.includes('csv') ? new Blob([data], { type: 'text/csv' }) : new Blob([JSON.stringify(data)], { type: 'text/json' });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, name);
    } else {
      const element = document.createElement('a');
      element.href = window.URL.createObjectURL(blob);
      element.download = name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  return (
    <Container onClick={downloadFile} title={`Download ${name}`}>
      <Image src={name.split('.').pop() === 'json' ? JsonIcon : CsvIcon}></Image>
      <Title>{name.length > 20 ? `${name.substring(0, 17)}...` : name}</Title>
    </Container>
  )
}


export default DownloadFile