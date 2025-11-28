const fs = require('fs').promises;
(async () => {

    try{
//   await fs.writeFile('note.txt', 'Node writes files');
  const text = await fs.readFile('note.txt', 'utf8');
  console.log(text);

}
catch(err) {

    console.error('FS error: ', err.code, err.message)
}





})();


//if the file exist the output will correct