import Product from '../../models/Product';
import Cart from '../../models/Cart';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "POST":
            await handlePostRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        default:
            res.status(405).send(`Метод ${req.method} не работает.`);
            break;
    }
}

async function handlePostRequest(req, res) {
    try {
        const { name, producer, price, description, mediaUrl } = req.body;
        if (!name || !producer || !price || !description || !mediaUrl) {
            return res.status(422).send('Ошибка с полями');
        }
        const product = await new Product({
            name,
            producer,
            price,
            description,
            mediaUrl
        }).save();
        res.status(201).json(product);
    } catch(error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
}

async function handleGetRequest(req, res) {
    const { _id } = req.query;
    const product = await Product.findOne({ _id });
    res.status(200).json(product);
}

async function handleDeleteRequest(req, res) {
    const { _id } = req.query;
    try {
        await Product.findOneAndDelete({ _id });
        await Cart.updateMany(
            { "products.product": _id },
            { $pull: { products: { product: _id } } }
        )
        res.status(204).json({});
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка! Продукт удален');
    }
}