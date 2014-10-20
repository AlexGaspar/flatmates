/**
 * CheckController
 *
 * @description :: Server-side logic for managing ads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    health: function (req, res, next) {
       res.status(200).json({ welcome: 'flatmates' });
    }
};

