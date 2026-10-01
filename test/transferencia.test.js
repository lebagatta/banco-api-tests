const request = require('supertest');
const { expect } = require('chai');
require( 'dotenv').config()
async function obterToken() {
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            username: 'julio.lima',
            senha: '123456'
        });

    expect(respostaLogin.status).to.equal(200);
    return respostaLogin.body.token;
}

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar 201 quando o valor for igual ou superior a 10,00', async () => {
           const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'application/json')
                .send({
                     username: 'julio.lima',
                     senha: '123456'
                           })
           
            const token = respostaLogin.body.token
            

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token
                });

            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar 422 quando o valor for inferior a 10,00', async () => {
        const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'application/json')
                .send({
                     username: 'julio.lima',
                     senha: '123456'
                           })
           
            const token = respostaLogin.body.token
            

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token
                });

            expect(resposta.status).to.equal(422);   
        });
    });
});