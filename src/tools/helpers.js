const parseCsvText = (text) => {
  const hasQuotes = (element) =>
    element[0] === element[element.length - 1] && element[0]?.match(/'|"/);
  const reBreakLine = /(\r\n|\r|\n)/g;
  const reValues = /(\s*"[^"]+"\s*|\s*[^,;]+|(,|;))(?=(,|;)|$)/g;

  const matches = text
    .split(reBreakLine)
    .filter((element) => !element.match(reBreakLine) && element.length > 0)
    .map((element) => element.match(reValues))
    .map((values) =>
      values.map((element) =>
        hasQuotes(element.trim())
          ? element.substr(1, element.length - 2).trim()
          : element.trim()
      )
    );
  for (const row in matches) {
    if (row in matches) {
      for (let n = 0; n < row.length; n += 1) {
        matches[row][n] = matches[row][n].trim();
        if (matches[row][n] === ',') {
          matches[row][n] = '';
        }
      }
    }
  }
  return matches;
};

const parseData = ({ text, format, separator, parseQuote, hasTitle }) => {
  if (format.includes('sv')) { // csv / tsv
    const splitted = parseCsvText(text);
    console.log(splitted)
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