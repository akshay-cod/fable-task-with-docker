const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan")
var mysql = require("mysql");

const Queue = require("bull");

require("dotenv").config();

const queue = new Queue('logs-queue',process.env.ISCONTAINER == "true" ? {
  redis: {
    host: process.env.REDISHOST,
    port: 6379
  }
}: {});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(morgan(':status :method :url :response-time :req[body]'))

const logsRoutes  = require('./user/logs/logs.route');
const { connectToDatabase } = require("../services/database/database.connection");
const { readAndGetArray, readAndAppend } = require("../services/file/fileService");
const LogsModelRepository = require("./user/logs/model/logs.model.repository");
const { saveALog } = require("./user/logs/logs.use.cases");

connectToDatabase();

app.use('/api', logsRoutes);

app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
  );

  setInterval(async () => {
    console.log("redis error",process.env)
    const queuedJobs = await queue.getJobs(["waiting", "delayed"]);
    console.log(queuedJobs.length,"que length")
    
   const filequeue = new Queue('file-writing-queue',process.env.ISCONTAINER == "true" ? {
    redis: {
      host: process.env.REDISHOST,
      port: 6379
    }
  }: {});
   filequeue.add({test:"passed", type:"bulk-upload"},{ removeOnComplete: true, removeOnFail: true });
    console.log("working")
  }, 5000);

  queue.process(async (job, done) => {
    try{
      console.log(job.data);
      if(process.env.DB == "MONGO"){
      const logsRepositoryStorage = new LogsModelRepository();
      const savedALog = await saveALog(logsRepositoryStorage, job.data)
      console.log("saved to mongodb")
      }
      else
      {
      var connection = mysql.createPool({
        host: process.env.HOST,
        port:3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });

   const queryPromise1 = (query) => {
      return new Promise((resolve, reject)=>{
          connection.query(query,  (error, results)=>{
              if(error){
                  return reject(error);
              }
              return resolve(results);
          });
      });
  };

      var sql = `INSERT INTO logs (logs) VALUES ('${JSON.stringify(job.data)}')`;
     // var sql = "SELECT * from logs"
      const ranQuery = await queryPromise1(sql);
      console.log(ranQuery)
      if(ranQuery){
        await connection.end()
      }
    }
      done();
    }
    catch(err){
      console.log(err,"error")
    }
  });

  const fileQueue = new Queue('file-writing-queue',process.env.ISCONTAINER == "true" ? {
    redis: {
      host: process.env.REDISHOST,
      port: 6379
    }
  }: {});
  fileQueue.process(async (job, done) => {
    try{
      console.log(job.data);
      if(job.data.type == "normal"){
        const writeToAFile = await readAndAppend({data:job.data})
      }
      else if(job.data.type == "bulk-upload"){
        let newJobs = await readAndGetArray();
         newJobs.map(async (data)=>{
      await queue.add(data,{ removeOnComplete: true, removeOnFail: true },);
    })
      }
      done();
    }
    catch(err){
      console.log(err,"error")
    }
  });