const express = require('express');
const request = require('request');
const router = express.Router();
const _ = require('lodash');

router.post('/currentImages', (req, res) => {
  let params = req.body || {};
  currentImages(res, params);
});

// recursive-capable method, in case the results include a "continue" type attribute
function currentImages(res, params = {}, images = []) {
  const default_params = {
    action: "query",
    format: "json",
    generator: "images",
    gimlimit: "500",
    iiprop: "url|user",
    prop: "imageinfo",
    titles: "New Jersey"
  };
  params = _.merge({}, default_params, params);
  if(_.isEmpty(params.titles))
    params.titles = default_params.titles;
  let opts = {
    method: 'GET',
    uri: 'https://en.wikipedia.org/w/api.php',
    qs: params,
    json: true
  };
  request(opts, (err, rsp, body) => {
    try {
      if(err || !body || !body.query || !body.query.pages) {
        res.status(500).send(err || 'Server Error');
        return images;
      }
      images = _.concat(images, _.map(body.query.pages, (image) => {
        image.latestInfo = image.imageinfo[0];
        return image;
      }));
      if(body.continue && body.continue.gimcontinue) {
        params.gimcontinue = body.continue.gimcontinue;
        currentImages(res, params, images);
        return images;
      }
      res.send({images});
    }
    catch(e) {
      console.log(e);
      res.status(500).send(e);
      return images;
    }
  });
}

module.exports = router;
