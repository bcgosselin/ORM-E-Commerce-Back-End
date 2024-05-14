// import / requirements
const router = require('express').Router();
const apiRoutes = require('./api');

//middleware
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// export
module.exports = router;