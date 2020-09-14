import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        // Валидация
        if (!isLength(name, {min: 3, max: 10})) {
            return res.status(422).send('Имя должно содержать в себе от 3 до 10 символов');
        } else if (!isLength(password, { min: 8, max: 20})) {
            return res.status(422).send('Пароль должен содержать от 8 до 20 символов');
        } else if (!isEmail(email)) {
            return res.status(422).send('Неправильный формат Email');
        }
        // Проверяем, есть ли юзер в бд
        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).send(`Пользователь с почтой ${email} уже существует!`);
        }
        // Если нет, хешируем пароль
        const hash = await bcrypt.hash(password, 10);
        // Создаем нового пользователя
        const newUser = await new User({
            name,
            email,
            password: hash,
            phone
        }).save();
        // Создаем корзину для нового юзера
        await new Cart({ user: newUser._id }).save();
        // Создаем токен для нового юзера
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Возвращаем токен
        res.status(201).json(token)
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка входа! Попробуйте еще раз.');
    }
}