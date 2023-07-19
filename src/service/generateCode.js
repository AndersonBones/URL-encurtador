
const GenerateCode = () =>{
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkolmnopqrstuvwxyz1234567890'
    let code = '';

    for(var i=0; i<5; i++){
        code+=characters[Math.trunc(Math.random() * characters.length)]
    }

    return code
}

module.exports = {GenerateCode}
