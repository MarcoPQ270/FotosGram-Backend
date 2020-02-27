import Token from '../classes/token';
import{Response, Request, NextFunction} from 'express'

export const verificaToken = (req: any, res: Response, next: NextFunction) =>{
    const userToken = req.get('x-token') || '';
    Token.comprobarToken(userToken).then((decoded: any) =>{
        req.usuario = decoded.usuario
        next();
    })
    .catch(err =>{
        res.json({
            ok: false,
            mensaje:'token no es correcto'
        });
    });
}