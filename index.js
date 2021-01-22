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
    const user = new User()
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

function login(){
    const acc = terminal.question("Digite o número da conta\n:")
    if(check_acc(acc).exist){
        console.log("Conta encontrada!");
        console.log(`Vinculada ao CPF: ${check_acc(acc).cpf}`);
    }else{
        console.log("Error 404: Conta não encontrada!");
    }
    const pass = terminal.question("Digite a senha\n :")
    if(check_pass(acc,pass)){
        console.log("Conta validada!")
        pause(2000)
        console.log("Entrando na conta...")
        pause(3000)
    }else{
        console.log("Senha incorreta!")
    }
}

function logged(acc){
    const index = ag01.users.accounts.map(value => value.acc).indexOf(acc)
    const balance = ag01.users.accounts[index].cash
    console.log(`SALDO: ${balance}`)
    console.log("1) SAQUE")
    console.log("2) DEPÓSITO")    
    console.log("3) TRANSFERÊNCIA")
    const r = terminal.question(": ")
    switch(r){
        case 1:
            const value = terminal.question("Digite o valor\n: ")
            if(withdraw(acc, index, value)){
                pause(3000)
                console.log("Saque efetuado com sucesso!")
            }else{
                console.log("Saldo insuficiente!")
            }
            break
        case 2:
            const value = terminal.question("Digite o valor\n: ")
            deposit(acc, index, value)
            break
        case 3:
            const index = terminal.question("Digite o número da conta\n: ")
            const target = terminal.question("Digite o número da conta\n: ")
            const value = terminal.question("Digite o valor\n: ")
            transference(acc, index, value, target)
            break
        default:
            console.log("Opção inexistente, favor selecione uma das opções disponíveis")
    }
}
function withdraw(acc, index, value){
    const balance = ag01.users.accounts[index].cash
    if(balance -= value > 0){
        balance -= value
        return true
    }else{
        return false
    }

}
function deposit(acc, index, value){
    const balance = ag01.users.accounts[index].cash
    console.log("Aguarde...");
    pause(3000)
    console.log(("Depósito realizado com sucesso!"))
    console.log(`Saldo anterior: ${balance}`)
    balance += value
    console.log(`Saldo atual: ${balance}`)
}
function transference(acc, index, value, target){

}
function check_cpf(cpf){
    if(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g.exec(cpf) != null){
        return true
    }else{
        return false
    }
}
function check_acc(acc){
    const accounts = ag01.users.accounts.map(value => value.acc)
    if(acc in accounts){       
        return {
            exist: true,
            cpf: ag01.user.accounts.cpf[accounts.indexOf(acc)],
            index: accounts.indexOf(acc)
        }
    }else{
        return false
    }
}
function check_pass(acc, index, pass){
    const passwords = ag01.users.accounts.map(value => value.pass)

    if(pass == passwords[index]){
        return true
    }else{
        return false
    }
}
function User(){
    return{
        id: ag01.users.accounts.length,
        name: "",
        cpf: "",
        acc: `10${ag01.users.accounts.length > 9 ? ag01.users.accounts.length : `0${+ag01.users.accounts.length}`}`,
        pass: "",
        cash: 0 
    }
}

function pause(sec) {
	var dt = new Date();
	while ((new Date()) - dt <= sec) { /* Não faz nada*/ }
}