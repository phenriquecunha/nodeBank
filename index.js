const terminal = require('readline-sync')
const fs = require('fs')
const { dir } = require('console')
const path_users = `${__dirname}/data/ag01/users.json`
const path_info = `${__dirname}/data/ag01/info.json`
const ag01 = {}
ag01.canceled = require('./data/ag01/canceled.json')
ag01.info = require('./data/ag01/info.json')
ag01.users = require('./data/ag01/users.json')

loop = true
while(true){
    const menu = "===BANK===\n1) Criar conta\n2) Acesso a conta\n3) Cancelar conta\n: "
        let option = terminal.question(menu)
        switch(option){
            case '1':
                register()
                break
            case '2':
                login()
                break
            case '3':
                delete_acc()
                break
            default:
                console.log("Opção incorreta!")
        }
}
    
function register(){
    const user = {
        id: ag01.users.accounts.length,
        name: "",
        cpf: "",
        acc: `10${ag01.users.accounts.length > 9 ? ag01.users.accounts.length : `0${+ag01.users.accounts.length}`}`,
        pass: "",
        cash: 0 
    }
    user.name = terminal.question("Digite o nome completo\n: ")
    user.cpf = terminal.question("Digite seu cpf(no formato 000.000.000-00)\n: ")
    user.pass = terminal.question("Escolha sua nova senha\n: ",{hideEchoBack: true})
    if(check_cpf(user.cpf)){
        ag01.users.accounts.push(user)
        fs.writeFileSync(path_users, JSON.stringify(ag01))
        console.log("Conta criada!")
        console.log(`AG:01 ; ACC:${user.acc}`)
    }else{
        terminal.question("cpf invalido")
    }
}

function check_cpf(cpf){
    if(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g.exec(cpf) != null){
        return true
    }else{
        return false
    }
}