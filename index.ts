import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import postRoutes from './routes/post';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const server = new Server(); 

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//FileUpload
server.app.use(fileUpload({useTempFiles: true}));

//configurar corss
server.app.use(cors({origin: true, credentials: true}));

//rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

//conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram',
    {useNewUrlParser: true, useCreateIndex: true}, (err)=>{
        if (err)throw err;
        console.log('base de datos online');
    })

//levantarserver
server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.port}`);
});