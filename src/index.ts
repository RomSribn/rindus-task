const app = require('./app');
const { appConfig }  = require('@config/env');

const { port } = appConfig;

app.listen(port, () => console.log(`Server started on port ${port}`));