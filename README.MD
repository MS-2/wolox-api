ACLARACIONES



en primera api testeada principalmente con postman , el view Index funciona para registrar usuarios e iniciar sesion pero no queria complicarme mucho con el manejo de la sesion y el storage del token , defini un enviroment en postman que solo sea necesario pasarle el token que genera el usuario a la hora de loguarse para que lo comparte entre todas las rutas, todas requieren la validacion del token para funcionar 

utilizo babel para compilar el javascript vanilla de nodejs a ecmaS6 principalmente para utilizar la sintaxis de import/export es preferencia personal el codigo se asemeja mas a react/angular/vue framewoks del lado de cliente y me permite mantener una nomenclatura mas clara 

los comandos principales para arrancar a la app 

npm install y despues

    -npm start para arrancar la build compilada (es mas rapida y optima) es necesario primero hacer npm run build

    -npm run dev para iniciar en modo desarrollo (la recomendable para iniciar mas rapido) puerto 4000

    -npm run test para correr test automaticos usando supertest y mocha (solo para las rutas de Auth)

    -npm run build  para generar la carpeta del proyecto compilada

    finalmente el archivo db para conectar la base de datos

    app es para instalar las dependencias de express

    y en config lo utilizo para las variables de entorno o locales 

    todo inicia desde el index
