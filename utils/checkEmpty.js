const validator= require("validator")

exports.checkEmpty = (config) => {
let isError = false , error = []
for (const key in config) {
      if(validator.isEmpty(config[key])){
        isError = true
        error.push(`${key} Is Required`)
      }
    }
   return {isError, error}
}