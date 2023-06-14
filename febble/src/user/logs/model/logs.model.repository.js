const { DataBaseMainClass } = require("../../../../services/database/main-class/main.class");
const logsModel = require("./logs.model")
const LogsModelRepository = class LogsModelRepository extends DataBaseMainClass{
    constructor() {
     super(logsModel);
      this.model = logsModel
    }
  };

module.exports =  LogsModelRepository;