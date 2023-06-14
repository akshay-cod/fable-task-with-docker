var fs = require('fs').promises;

exports.readAndAppend = async ({data:oldData}) => {
   const data = await fs.readFile('queue/queue.json', 'utf8');
  // console.log(data,"data")
   let obj = JSON.parse(data); //now it an object
    obj.table.push(oldData); //add some data
   let json = JSON.stringify(obj); //convert it back to json
   const dataWritten = await fs.writeFile('queue/queue.json', json, 'utf8');
   return true
}

exports.readAndGetArray = async() =>{
  const data = await fs.readFile('queue/queue.json', 'utf8');
  let obj = JSON.parse(data); //now it an object
  let changedObj = {...obj} //add some data
  changedObj.table = [];
  let json = JSON.stringify(changedObj); //convert it back to json
  const dataWritten = await fs.writeFile('queue/queue.json', json, 'utf8');

  let dataForbackup = data
  //console.log(data,"data")
  const dataWrittenForBackup = await fs.writeFile('queue/presentQueue.json', data, 'utf8');

  return obj.table
}