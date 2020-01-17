const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');
// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            // Filtrar as conexões que estão a no maximo 10km de distância e que o novo dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    },

    async update(req, res) {
        const {
            name,
            github_username,
            avatar_url,
            bio,
            latitude,
            longitude,
            techs
        } = req.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const techsArray = parseStringAsArray(techs);

        const usernameGit = { github_username };
        const dev = await Dev.findOneAndUpdate(
            usernameGit,
            {
                name,
                avatar_url,
                bio,
                location,
                techs: techsArray
            },
            {
                new: true,
                useFindAndModify: false
            }
        );

        return res.json(dev);
    },

    async destroy(request, response) {
        await Dev.findByIdAndRemove(request.params.id)

        return response.send()
    }
}