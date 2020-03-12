{//-> Informações (fs)
    /* Modulo do node.js (file system)  trabalha com arquivos do sistemas */
}
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils') // desestruturando as funcões



// create   
exports.post = function (req, res) {
    { //req.body retorna um objeto enviado pelo formulario via post
        /*  req.body =>  {"avatar_url":"https://google.com",
        "name":"Wesley Guerra Moreira",
        "birth":"1990-10-01","gender":"M","services":"Musculação"} */
    }
    {// Object.keys(req.body) Cria um array com a chaves do objeto
        //=>pegando as chave do objeto ["avatar_url","name","birth","gender","services"]
    }
    const keys = Object.keys(req.body)
    //  console.log(req.body) //=> teste pra ver o que esta retornando req.body
    for (key of keys) {
        // console.log(key) //teste
        // console.log(keys)

        if (req.body[key] == "") {
            res.send("Please, fill all fields!")
        }
    }



    //feito a descontrução do array para poder modificar dados criado como let
    let { avatar_url, birth, name, services, gender } = req.body
     
    // req.body.created_at = Date.new, Obs se o array não fosse desconstruido poderia se inserido assim
    birth = Date.parse(birth) // transformando a data nacimento em ex: 1554554
    const created_at = Date.now() // cria uma data que foi cadastrao o intrutctor em formato EX: 157355454
    const id = Number(data.instructors.length + 1) // adicionando em cada objeto + 1 

 
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })
    {// data.instructors.push => funcionalidade do array puxe algo.
        //OBS: pegue os dados e coloque no array instructors dentro data.js
        // Sempre add mais 1 // [{..1..}, {...2..}]
        /* arquivo data.json 
          EX:
            {
                    "instructors": [
                        {
                        "id": 1,
                        "avatar_url": "https://avatars2.githubusercontent.com/u/41512408?s=460&v=4",
                        "name": "Wesley Guerra Moreira",
                        "birth": 654739200000,
                        "gender": "M",
                        "services": "Musculação",
                        "created_at": 1583493948601
                        }

                    ]
           }
        OBS2: a parte "instructors": [] é criada manualmente para ser inserido os dados
        
        */
    }


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('Write file error!')

        //return res.send(data)
        return res.redirect("/instructors")
    })

    {//Informações importantes
        /* 1. writeFile => escreva no arquivo (ex: que vai para data.js)
           2. JSON.stringify => tranformando dados em na formatação JSON (data.js, null, formato)
           3. Callback = função que é executada depois de alguma coisa Ex: um erro.
           4. Foi redirecionado create.njk
        */
    }
} /* final create */




//show
exports.show = function (req, res) {
    {//informação
        // req.query.id => ?id=1, obs pela url
        // req.body => corpo da requisião do formulaio
        // req.parms => intructors/1 
    }
    //console.log(req.params)// => { id: '1' }

    const { id } = req.params // retirando id para ser uma variavel
    const foudInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id // true encontrou o instrutor
   
    })
    if (!foudInstructor) {
        return res.send('Instructor not found')
    }
    
    
    //console.log(foudInstructor) // testando dados antes da formatação
    
    
    const instructor = {
        ...foudInstructor, //-> as variavel abaixo pode escrevido qie está dentro.

        age: age(foudInstructor.birth), //foi criadda uma função externa para tratar a data

        services: foudInstructor.services.split(","), // transformando em array, quebrando após a virgula.
        
        created_at: new Intl.DateTimeFormat('en-GB').format(foudInstructor.created_at), // formação importante transformando data formatode brasil
    }
    { // juntando um array no outro.
        // (...) 3 pontos e dados
    }

   // console.log(instructor) // -> testando dados já formatados


    // return res.send(id) //teste de dados
    return res.render('instructors/show', { instructor }) // encontrado instrutor retorne
    /* informação {intructo} está passando toda informação do intructor de foi passado na url */
} /* final do show */





// edit
exports.edit = function (req, res) {
    const { id } = req.params
    const foudInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id

    })
    if (!foudInstructor) {
        return res.send('Instructor not found')
    }

     const instructor ={
         ...foudInstructor,
         birth: date(foudInstructor.birth)
     }
   

    return res.render('instructors/edit', { instructor })
} /* Final editar */




//put
exports.put = function ( req , res){
    
    const { id } = req.body // retirando id para ser uma variavel
    let index = 0
    
    const foudInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
       
    })
    if (!foudInstructor) {
        return res.send('Instructor not found')
       
    }

    const instructor = {
     ...foudInstructor,
     ...req.body ,  
     birth: Date.parse(req.body.birth)
    }
 
    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return res.send("Write error!")


        return res.redirect(`/instructors/${id}`)
    })
}
