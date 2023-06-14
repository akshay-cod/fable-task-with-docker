exports.saveALog = async (logsModalRepository, data) => {
    try{
        const savedAlog = await logsModalRepository.save(
           {logs:data}
         );
         return savedAlog;
    }
    catch(err){
        return err
    }
}
