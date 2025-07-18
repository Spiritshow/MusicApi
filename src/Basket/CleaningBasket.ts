import express from 'express';
import { authenticateToken, IReqAuth } from '../UserInfo/helpers';
import { pool } from '../ConfConst/DB';

const cleaningbasket = express.Router();

cleaningbasket.delete('/cleaningbasket', authenticateToken, async(req: IReqAuth, res) => {
    const id_user = req.user?.id;
    
    try {
        const QueryCleaningBasket = pool.query(`
            DELETE FROM basket 
            WHERE id_user = $1;`,
            [id_user]
        )
        
        res.json('OK')
    } catch (error) {
        console.log("Ошибка при очистке корзины пользователя")
        res.status(400);
    }
})

export default cleaningbasket;