export const formatTableHeader = (key) => {
  let temp = key.split('_');
  var formattedHeader = '';
  temp.forEach((word) => {
    formattedHeader += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
  });
  return formattedHeader;
};
