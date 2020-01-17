const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SeachController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/search', SeachController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs/:id', DevController.destroy);
routes.put('/devs', DevController.update);

module.exports = routes;