import React, { useRef } from 'react';

import { Container, Clear } from './style'


const FilePicker = ({ content, setContent }) => {

  const input = useRef();

  const pickFiles = ({ currentTarget: { files } }) => {
    if (files) {
      const data = Object.values(files);
      // for (const file of data) {
      //   console.log({ file });
      // }
      setContent(prevState => data);
    }
  }

  const clear = e => {
    e.preventDefault();
    // input.current.files = null;
    setContent(null);
    document.querySelector('input[type=file]').value = '';
  }

  return (
    <Container>
      <input type="file" accept=".csv,.tsv,.xlsx,.json" onChange={e => pickFiles(e)} ref={input} multiple />
      <Clear onClick={clear}>Clear files</Clear>
    </Container>
  )
}


export default FilePicker