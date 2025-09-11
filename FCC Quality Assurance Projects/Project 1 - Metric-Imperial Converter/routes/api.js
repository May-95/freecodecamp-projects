"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) return res.send("invalid number and unit");
    if (!initNum) return res.send("invalid number");
    if (!initUnit) return res.send("invalid unit");

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      ),
    });
  });
};
