const numberDiscount = 5 //quantity 10
const codeDrink = 3 //code category of drink
const codeBakingCooking = 5 //code category of banking cooking
const discount5000 = 5000 //totalPrint £ 50,00

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatMoney(number) {
  return number?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function convertMoneyNumber(money) {
  return Number(money.toString().split('.').join(''))
}

export function countMoney(array) {
  return Math.round( array.reduce((array, num) => array + num))
}

export function countPrintMoney(listOrder) {
  const total = [0]
  const dataOrder = listOrder.map((elem) => {
    const itemCost = Number((Math.round(elem.itemPrice * elem.itemQuantity).toFixed(2)).toString().split('.').join(''))
    let itemDiscount = null

    /** discount 10% if quantity >= 10 of drink */
    if (Number(codeDrink) === Number(elem.itemCodeCategory) && Number(elem.itemQuantity) >= Number(numberDiscount)) {
      console.log('discount drink')
      itemDiscount = itemCost - itemCost * 10 / 100
    }
    /** discount 500 */
    if (codeBakingCooking === Number(elem.itemCodeCategory) && itemCost >= discount5000) {
      console.log('discount banking cooking')
      itemDiscount = itemCost - 500
    }
    total.push(itemDiscount ? +itemDiscount : +itemCost)
    return { ...elem, itemCost, itemDiscount}
  });
  return { total, dataOrder}
}
