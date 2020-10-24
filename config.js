const ENV = parseArguments(process.argv).env || 'dev';
const PORT = process.env.PORT || 3000;

function parseArguments(args) {
  const slicedArgs = args.slice(2);
  const regExp = /^-(\w+)/;

  return slicedArgs.reduce((acc, item) => {
    const [key, property] = item.split('=')
    const cleanedKeyFromDigits = key.match(regExp)[1];

    return acc[cleanedKeyFromDigits] = property;
  }, {});
}

module.exports = {
  ENV,
  PORT,
}