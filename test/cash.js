export default function cash(price, cash, cid) {
    const currencyUnits = [
      ["PENNY", 0.01],
      ["NICKEL", 0.05],
      ["DIME", 0.10],
      ["QUARTER", 0.25],
      ["ONE", 1.00],
      ["FIVE", 5.00],
      ["TEN", 10.00],
      ["TWENTY", 20.00],
      ["ONE HUNDRED", 100.00]
    ];
  
    let totalCaj = cid.reduce((sum, currency) => sum + currency[1], 0);
    totalCaj = parseFloat(totalCaj.toFixed(2)); 
  
    let cambio = cash - price;
    cambio = parseFloat(cambio.toFixed(2)); 
    let result = { status: "", change: [] };
  
    if (totalCaj < cambio) {
      result.status = "INSUFFICIENT_FUNDS";
      return result;
    }
  
    if (totalCaj === cambio) {
      result.status = "CLOSED";
      result.change = cid;
      return result;
    }
  
    let arrayRes = [];
    for (let i = currencyUnits.length - 1; i >= 0; i--) {
      let nomMoneda = currencyUnits[i][0];
      let valorMoneda = currencyUnits[i][1];
      let disponible = cid[i][1];
      let dev = 0;
  
      while (cambio >= valorMoneda && disponible >= valorMoneda) {
        cambio -= valorMoneda;
        disponible -= valorMoneda;
        dev += valorMoneda;
        cambio = parseFloat(cambio.toFixed(2));
      }
  
      if (dev > 0) {
        arrayRes.push([nomMoneda, dev]);
      }
    }
  
    if (cambio > 0) {
      result.status = "INSUFFICIENT_FUNDS";
      result.change = [];
      return result;
    }
  
    result.status = "OPEN";
    result.change = arrayRes;
    return result;
}