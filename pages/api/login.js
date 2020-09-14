import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb()

export default async (req, res) => {
    const { email, password } = req.body;
    try {
        // Проверяем, есть ли пользователь с такой почтой
        const user = await User.findOne({ email }).select('+password');
        // Если нет - возвращаем ошибку
        if (!user) {
            return res.status(404).send('Пользователя с таким почтовым ящиком не существует');
        }
        // Проверяем, совпадает ли пароль с тем, что есть в БД
        const passwordsMatch = await bcrypt.compare(password, user.password);
        // Если совпадает, то создаем токен
        if (passwordsMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // Отправляем токен клиенту
            res.status(200).json(token);
        } else {
            res.status(401).send('Пароль не совпадает');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка входа!');
    }
}