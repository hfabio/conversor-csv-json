import React, { useState, useEffect } from 'react';

import { Page } from './style';
import FilePicker from './components/FilePicker';
import DownloadFile from './components/DownloadFile';

import parseData from './tools/helpers';


const App = () => {

  const [content, setContent] = useState(null);
  const [parsedContent, setParsedContent] = useState([]);
  const [separator, setSeparator] = useState(',');
  const [parseQuote, setParseQuote] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);


  useEffect(() => {
    if (content && content.length > 0) {
      setParsedContent([]);
      for (const file of content) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const format = file.name.split('.').pop();
          const new_format = parseData({ text: e.target.result, format, separator, parseQuote, hasTitle });
          setParsedContent(prevState => [...prevState, {
            name: `${file.name.replace(`.${format}`, '')}.${format.toLowerCase().includes('json') ? 'csv' : 'json'}`,
            data: new_format
          }]);
        }
        reader.readAsText(file);
      }
    } else {
      setParsedContent([]);
    }
  }, [content, separator, parseQuote, hasTitle])

  return (
    <Page>
      <section>
        <div>
          <label htmlFor="has_header">Your file includes a title?</label>
          <input type="checkbox" name="has_header" id="has_header" value={hasTitle} checked={hasTitle} onChange={() => setHasTitle(prevState => !prevState)} />
        </div>
        <div>
          <label htmlFor="parse_quote">Do you want to parse quotes? (remove escaped quotes)</label>
          <input type="checkbox" name="parse_quote" id="parse_quote" value={parseQuote} checked={hasTitle} onChange={() => setParseQuote(prevState => !prevState)} />
        </div>
        <div>
          <label htmlFor="separator">Define your cell separator</label>
          <input type="text" name="separator" id="separator" value={separator} onChange={({ currentTarget: { value } }) => setSeparator(value)} />
        </div>
      </section>
      <FilePicker content={content} setContent={setContent} />
      <section>
        {parsedContent?.map(({ name, data }, index) => <DownloadFile key={`${index}-${name}`} name={name} data={data} />)}
      </section>
    </Page>
  )
}


export default App