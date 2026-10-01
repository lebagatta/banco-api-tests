const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencia.json');

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        });

        it('Deve retornar 201 quando o valor for igual ou superior a 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias };
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar 422 quando o valor for inferior a 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias };
            bodyTransferencias.valor = 7;
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(422);
        });
    });

    describe('GET /transferencias', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        });

        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.page).to.equal(107);
            expect(resposta.body.limit).to.equal(10);
            expect(resposta.body.transferencias).to.have.lengthOf(10);
        });

        it('Deve retornar sucesso com 200 quando o ID for válido', async () => {
            const listagem = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token);

            const idTransferencia = listagem.body.transferencias[0].id;
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/' + idTransferencia)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('object');
            expect(resposta.body.id).to.equal(idTransferencia);
            expect(resposta.body.conta_origem_id).to.be.a('number');
        });
    });
});