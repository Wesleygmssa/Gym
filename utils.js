{//Informação de data
 /* 1. Quando é colocado const today = new Date() está criando um novo obejto data de hoje.
    2.  birthDate = new Date(timestamp) //=> criando outro objeto recebendo a data.
    2.  today.getFullYear(),//=> pegando o ano Ex: 2020
    3.  birthDate.getFullYear()// => pegando o ano da data Ex: 01/10/1990.

    4.  today.getMonth() - birthDate.getMonth() => pegando o mes atual e o que foi passado.
 */
}

module.exports = {


     age: function(timestamp){
    const today = new Date() // criando um obejto de data
    const birthDate = new Date(timestamp) // aniversário

    today.getDate() //= dia do mes
    birthDate.getDate() // => dia que foi passado
    
    let age = today.getFullYear() - birthDate.getFullYear() //Ex: 2020 - 1990 = 30
    const month = today.getMonth() - birthDate.getMonth()   //Ex: mês
 
    if (month < 0 || month == 0 && today.getDate() > birthDate.getDate()) {
        age = age - 1
    }
    return age
},


date: function(timestamp){
  const date = new Date(timestamp)  

  const year = date.getUTCFullYear()// ano yyyy

  const month = `0${date.getUTCMonth() + 1}`.slice(-2) // mes mm

  const day = `0${date.getUTCDate()}`.slice(-2)  // dia dd


  // return yyy-mm-dd
  return `${year}-${month}-${day}`
}




}

