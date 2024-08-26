/* 

*/
export const sockTotal = (product) => {
  let sum = 0
  product.forEach((item) => (sum += item.stock))
  return sum
}
