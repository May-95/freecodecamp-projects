const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Should correctly read a whole number input", () => {
    const result = convertHandler.getNum("5kg");
    assert.equal(5, result);
  });

  test("Should correctly read a decimal number input", () => {
    const result = convertHandler.getNum("2.3kg");
    assert.equal(2.3, result);
  });

  test("Should correctly read a fractional input", () => {
    const result = convertHandler.getNum("3/2kg");
    assert.equal(3 / 2, result);
  });

  test("Should correctly read a fractional input with a decimal", () => {
    const result = convertHandler.getNum("2.5/2kg");
    assert.equal(2.5 / 2, result);
  });

  test("Should correctly return an error on a double-fraction", () => {
    const result = convertHandler.getNum("3/2/3kg");
    assert.equal(null, result);
  });

  test("Should correctly default to a numerical input of 1 when no numerical input is provided", () => {
    const result = convertHandler.getNum("kgs");
    assert.equal(1, result);
  });

  test("Should correctly read each valid input unit", () => {
    const result = convertHandler.getUnit("2.5/2kg");
    assert.equal("kg", result);
  });

  test("Should correctly return an error for an invalid input unit", () => {
    const result = convertHandler.getUnit("2.5/2ka");
    assert.equal(null, result);
  });

  test("Should return the correct return unit for each valid input unit", () => {
    const result = convertHandler.getReturnUnit("gal");
    assert.equal("L", result);
  });

  test("Should correctly return the spelled-out string unit for each valid input unit", () => {
    const result = convertHandler.spellOutUnit("kg");
    assert.equal("kilograms", result);
  });

  test("Should correctly convert gal to L", () => {
    const result = convertHandler.convert(2, "gal");
    assert.equal(7.57082, result);
  });

  test("Should correctly convert L to gal", () => {
    const result = convertHandler.convert(7.57082, "l");
    assert.equal(2.00000, result);
  });

  test("Should correctly convert mi to km", () => {
    const result = convertHandler.convert(2, "mi");
    assert.equal(3.21868, result);
  });

  test("Should correctly convert km to mi", () => {
    const result = convertHandler.convert(3.21868, "km");
    assert.equal(2.00000, result);
  });

  test("Should correctly convert lbs to kg", () => {
    const result = convertHandler.convert(3, "lbs");
    assert.equal(1.36078, result);
  });

  test("Should correctly convert kg to lbs", () => {
    const result = convertHandler.convert(1.360776, "kg");
    assert.equal(3.00000, result);
  });
});
