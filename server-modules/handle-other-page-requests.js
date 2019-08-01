const path = require('path');

handleOtherPages = (app, pathName) => {
  app.get('*', (req,res) =>{
    res.sendFile(path.join(pathName));
  });
}

module.exports = handleOtherPages;
