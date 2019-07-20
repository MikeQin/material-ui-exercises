const sentenceCase = str => {
  return new Promise((resolve, reject) => {
    if (str) {
      resolve(str.charAt(0).toUpperCase() + str.slice(1));
    } else {
      reject("string is null");
    }
  });
};

const titleCase = str => {
  str = str.split(" ");

  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
};

async function convertStr(title, sentence) {
  const x = await titleCase(title);
  const y = await sentenceCase(sentence);
  return [x, y];
}

export default convertStr;
