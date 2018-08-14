const arr=[1,2,3,4]
const ar2=[...arr,6,7]

const asrr=[...[...ar2.slice(0, ar2.indexOf(3)), ...ar2.slice(ar2.indexOf(3) + 1)]]

console.log(asrr)