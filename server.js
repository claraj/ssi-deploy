const express = require('express')
const apiRoutes = require('./routes/api')

// Create web application server
const app = express()

app.use(express.json())

app.use('/api', apiRoutes)

app.use(function(req, res, next) {
    res.status(404).send('Sorry, not found.')
    // todo - can't find a matching route
})

app.use(function(err, req, res, next) {
    console.log(err)
    res.status(500).send('Server error')
})


// Start server running 
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})

