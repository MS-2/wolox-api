import request from 'supertest';
import faker from 'faker';
import app from '../src/index';


// name: faker.name.firstName(),
// email: faker.internet.email(),
// pass: faker.internet.password()
// tsting endpoints signIn signUp auth routes

it('responde token de usuario en formato json', done => {
    const data = {
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        moneda: "ars"
    }
    request(app)
        .post('/api/auth/signup')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', "text/html; charset=utf-8")
        // console.log(response)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
});


describe('logueo de usuario administrador', function () {
    it('responde token de usuario', done => {
        const data = {
            username: "messi",
            password: "asdasdasd"
        }
        request(app)
            .post('/api/auth/signin')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200)
            .expect(res => {
                // console.log(res.text)
                let token = res.text;
                console.log("el TOKEN : ", token)
            })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


});


// it('responde con el objeto creado', done=>{
//     const producto = {        
//         "name": "xbox series s ",
//         "category": "consola",
//         "price":"299",
//         "imgURL": "foto"    
//     }
//     request(app)
//         .post('/api/products')
//         .send(producto)
//         .set('Authorization', 'bearer token ') 
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(res => {
//             console.log(res)
//         })
//         .end((err) => {
//             if (err) return done(err);
//             done();
//           });
// });

