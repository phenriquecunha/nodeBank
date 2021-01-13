const readline = require('readline')
const ag01 = {
    canceled = require('./data/ag01/canceled.json'),
    info = require('./data/ag01/info.json'),
    users = require('./data/ag01/users.json')
}
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
loop = true
while(loop){
    const menu = "===BANK===\n1) Criar conta\n2) Acesso a conta\n3) Cancelar conta\n: "
    terminal.question(menu, option => {
        switch(option){
            case 1:
                register()
                break
            case 2:
                login()
                break
            case 3:
                delete_acc()
                break
            default:
    
        }
        terminal.close()
    })
}

function register(){
    let nome, nasc, cpf
    terminal.question("Digite o nome completo: \n:", r => {
        nome = r
        terminal.close()
    })
    terminal.question("Digite sua data de nascimento: \n:", r => {
        nasc = r
        terminal.close()
    })
    terminal.question("Digite seu cpf\n:", r => {
        cpf = r
        terminal.close()
    })
    if(check_cpf(cpf)){
        console.log("Conta criada!")
        console.log(`AG:01 ; ACC:$`)
    }
    
}


const check_cpf = function(cpf){
    if(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g.exec(cpf) != null){
        return true
    }else{
        return false
    }
}