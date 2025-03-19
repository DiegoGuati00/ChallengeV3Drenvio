const { config } = require('./config/config');
const { app } = require('./app');


const PORT = config.APP_PORT;
app.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`);
});

