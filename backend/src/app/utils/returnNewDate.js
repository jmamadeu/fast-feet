const { format } = require('date-fns');

module.exports = {
  getNow: format(new Date(), 'yyyy-mm-dd H:m:i'),
};
