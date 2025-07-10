import jwt from 'jsonwebtoken';
import JWT_SECRET from '../ConfConst/SecretKey';
import { IUser } from '../Types/User';


function generateToken(user: IUser) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "7d",
  });
}
export default generateToken;