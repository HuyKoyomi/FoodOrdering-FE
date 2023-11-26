import _ from "lodash";
export function formatCurrency(
  amount = 0,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) {
  try {
    let currency = amount;
    // Parse sang số có số lượng hàng thập phân bằng 'decimalCount'
    currency = _.round(currency, decimalCount);

    // Parse sang format tiền
    currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(amount)
      .replaceAll(/(\$)+|(\.00)+/g, "");

    // Thay dấu hàng nghìn
    currency = _.join(
      _.map(currency.split(","), (item) => {
        // Thay dấu hàng thập phân
        if (_.includes(item, ".")) {
          return item.replace(".", decimal);
        }
        return item;
      }),
      thousands
    );

    return currency + "₫";
  } catch (e) {
    console.error(e);
    return amount + "₫";
  }
}


export function genDate(format, inputDate) {
  var date = new Date();
  if (inputDate) {
    date = new Date(inputDate);
  }
  var day = checkZero(date.getDate() + '');
  var month = checkZero(date.getMonth() + 1 + '');
  var year = checkZero(date.getFullYear() + '');
  var hour = checkZero(date.getHours() + '');
  var minutes = checkZero(date.getMinutes() + '');
  var seconds = checkZero(date.getSeconds() + '');
  //replace the day
  format = format.replace('DD', day.toString());
  format = format.replace('MM', month.toString());
  if (format.indexOf('YYYY') > -1) {
    format = format.replace('YYYY', year.toString());
  } else if (format.indexOf('YYY') > -1) {
    format = format.replace('YYY', year.toString());
  } else if (format.indexOf('YY') > -1) {
    format = format.replace('YY', year.toString().substr(2, 2));
  }
  format = format.replace('HH', hour.toString());
  format = format.replace('mm', minutes.toString());
  format = format.replace('ss', seconds.toString());
  return format;
}

function checkZero(data) {
  if (data.length == 1) {
    data = '0' + data;
  }
  return data;
}