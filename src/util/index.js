/* 

*/
export const sockTotal = (products) => {
  let sum = 0
  products.forEach((item) => (sum += item.stock))
  return sum
}
