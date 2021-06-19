const parseData = ({ text, format, separator, parseQuote, hasTitle }) => {
  if (format.includes('sv')) { // csv / tsv
    const splitted = text.split('\n')
      .map(line =>
        line.split(separator)
          .map(cell => parseQuote ? cell.replace(/(\"|\'|\n|\r)/g, '') : cell.replace(/(\n|\r)/gi, ''))
      );
    const fixData = txt => isNaN(txt) ? txt : Number(txt);
    if (hasTitle) {
      return new Array(splitted.length - 1).fill(splitted[0])
        .map((keys, index) => keys.reduce((acc, curr) => ({ ...acc, [curr]: fixData(splitted[index + 1][splitted[0].indexOf(curr)]) }), {}));
    } else { // doesn't have a title
      return new Array(splitted.length - 1).fill(0)
        .map((_, index) => splitted[index].reduce((acc, curr, idx) => ({ ...acc, [idx]: fixData(curr) }), {}));
    }
  } else if (format === 'json') { // json to csv
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        const headers = Object.keys(data[0]);
        const content = [
          headers,
          ...data.map(element => headers.map(key => element[key]))
        ].map(row => `"${row.join('","')}"`).join('\n')
        return content;
      } else {
        return Object.values().map(row => `"${row.join('","')}"`);
      }
    } catch (error) {
      console.log('Error parsing the json file', error)
    }
  }
};


export default parseData;