module.exports = function(isError, data){
    if(isError){
        return {
            SUCCESS: false,
            DATA: data
        };
    }else{
        return {
            SUCCESS: true,
            DATA: data
        };
    }
}
