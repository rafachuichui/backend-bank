const banksWorldWide = [
    { nombre: "J P Morgan Chase", TotalActivos: 2533 , pais: "Estado Unidos" },
    { nombre: "ICBC", TotalActivos: 25764, pais: "China" },
    { nombre: "Santander", TotalActivos: 1444, pais: "España" },
    { nombre: "Itau",  TotalActivos: 1434, pais: "Brasil" },
    { nombre: "HSBC", TotalActivos: 2521, pais: "Reino Unido" },
    { nombre: "BBVA", TotalActivos: 690., pais: "España" },
]


const Santander = banksWorldWide.find(item => {
    return item.nombre === "Santander"
})
console.log(Santander)


//modifica TotalActivos inicial,una crecimiento del 10% anual,hay que hacerlo asi para conservar TotalActivos del 2019
const totalActivos = banksWorldWide.map(item => {
    const newTotalActivos = item.TotalActivos + item.TotalActivos * 0.10
    return { ...item, newTotalActivos }
})
console.log(totalActivos);


const banksCountry = banksWorldWide.filter(item => {
    return item.pais === "España"
})
console.log(banksCountry);


//si todos los TotalActivos son mayores de 1000
const check = banksWorldWide.every(item => {
    return item.TotalActivos < 1000
})
console.log(check);



// si algun Banco cumple esta condiccion, de tener mas de 20.000 de activos
const someBank = banksWorldWide.some(item => {
    return item.TotalActivos > 20000
})
console.log(someBank)