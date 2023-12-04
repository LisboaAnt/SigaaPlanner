const express = require('express');
const router = express.Router();

//USADO PARA DESCODIFICAR O JWT


module.exports = (jwt) => {
  const express = require('express');
  const router = express.Router();


  //JWT
  router.post('/jwt', (req, res) => {
    const { token } = req.body;

    var x = jwt.decode(token, 'NaoSabo2023', algorithms=['HS256'])
    res.send({x});

  
});return router;};