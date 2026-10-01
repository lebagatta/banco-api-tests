const request = require('supertest');
const { expect } = require('chai');
require( 'dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token

        beforeEach(async () => {
            token = await obterToken('julio.lima','123456')
        });

        it('Deve retornar 201 quando o valor for igual ou superior a 10,00', async () => {
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