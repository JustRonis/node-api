const moment = require('moment')
const conexao = require('../infra/conexao')

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >=5

        const validacoes= [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: "A data deve ser maior ou igual a data atual"
            },
            {
                nome: 'Cliente',
                valido: clienteValido,
                mensagem: "O nome do cliente deve conter ao menos 5 caracteres"
            },
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existeErros = erros.length
        if(existeErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?'
            conexao.query(sql, atendimentoDatado,(erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(resultados);
                }
            })
        }

 
    }
}

module.exports = new Atendimento