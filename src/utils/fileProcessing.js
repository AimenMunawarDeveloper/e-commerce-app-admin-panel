const convertFileObjectToRelativePath = (file) => {
  var reader = new FileReader();
  let path = "";
  reader.onload = function (e) {
    path = e.target.result;
  };
  reader.readAsDataURL(file);
};

export default convertFileObjectToRelativePath;
