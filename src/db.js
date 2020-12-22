import mongoose from 'mongoose';
import config from "./config";
mongoose.connect(config.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
        .then(db => console.log("conectado a mongo : ", db.connection.host + ':' + db.connection.port))
        .catch(error => console.log(error))

