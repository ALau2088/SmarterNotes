if(process.env.NODE_ENV === 'production'){
  module.exports = {
    mongoURI:'mongodb://ALau:ALau7658@ds123454.mlab.com:23454/vidjot-prod'
  }
} else {
  module.exports = {
    mongoURI:'mongodb://localhost/vidjot-dev'
  }
}
