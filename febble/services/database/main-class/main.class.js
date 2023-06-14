module.exports.DataBaseMainClass = class DataBaseMainClass {
    constructor(model) {
      this.model = model
    }

    save(query) {
        let newSave = new this.model(query)
        return newSave.save();
    }
  
    list(query, sort, start, limit, string) {
      return this.model.find(query)
      .sort(sort || {createdAt: -1})
      .skip(parseInt(start || 0))
      .limit(parseInt(limit == "noLimit" ? {} : limit  || 10)).populate(string || "");
    }

    findOne(query, populate) {
        return this.model.findOne(query).populate(populate || "");
    }

    updateOne(query,data) {
      return this.model.updateOne(query,data)
    }

    hardDeleteOne(query) {
      return this.model.deleteOne(query)
    }

    aggregate(pipeline) {
      return this.model.aggregate(pipeline)
    }

  };