const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 5000;


APP.use(EXPRESS.static('gamebox/static'));
APP.use(EXPRESS.static('gamebox'));
APP.use(EXPRESS.static('favicon'));


APP.get('/', (req, res) => res.sendFile('home.html', {root: `${ __dirname }/gamebox`}));


APP.listen(PORT, () => console.log(`gamebox active on port: ${ PORT }`));