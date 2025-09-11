function ConvertHandler() {
  const CONVERSIONS = {
    galToL: 3.78541,
    lbsToKg: 0.453592,
    miToKm: 1.60934,
  };

  this.getNum = function (input) {
    // Extract number part before any letters
    const result = String(input).trim().toLowerCase().match(/^[^a-zA-Z]*/)[0];
    if (!result) return 1; // Default to 1 if no number

    // Reject double fractions and decimals (e.g., "3/2/3")
    if ((result.match(/\//g) || []).length > 1) return null;
    if ((result.match(/\./g) || []).length > 1) return null;

    // Handle fraction input
    if (result.includes("/")) {
      const [numerator, denominator] = result.split("/");
      return (!numerator || !denominator || isNaN(numerator) || isNaN(denominator)) ? null : parseFloat(numerator) / parseFloat(denominator);
    }

    return parseFloat(result);
  };

  this.getUnit = function (input) {
    // Extract valid unit from end of input
    const match = String(input).trim().toLowerCase().match(/(gal|l|mi|km|lbs|kg)$/);
    return match ? (match[1] === "l" ? "L" : match[1]) : null; // Capitalise 'L' for liters
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return null;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    // Convert between metric and imperial units, rounded to 5 decimal places
    switch (initUnit.toLowerCase()) {
      case "gal":
        return Number((initNum * CONVERSIONS.galToL).toFixed(5));
      case "l":
        return Number((initNum / CONVERSIONS.galToL).toFixed(5));
      case "mi":
        return Number((initNum * CONVERSIONS.miToKm).toFixed(5));
      case "km":
        return Number((initNum / CONVERSIONS.miToKm).toFixed(5));
      case "lbs":
        return Number((initNum * CONVERSIONS.lbsToKg).toFixed(5));
      case "kg":
        return Number((initNum / CONVERSIONS.lbsToKg).toFixed(5));
      default:
        return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;
