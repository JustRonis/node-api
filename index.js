 
const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas')

const app = customExpress()

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log('Connection MYSQL - OK')
        Tabelas.init(conexao)
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})

