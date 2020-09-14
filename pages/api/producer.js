import Producer from '../../models/Producer';

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        default:
            res.status(405).send(`Метод ${req.method} не работает.`);
            break;
    }
}

async function handleGetRequest(req, res) {
    const { _id } = req.query
    const produser = await Producer.findOne({ _id })
    res.status(200).json(produser)
}

async function handleDeleteRequest(req, res) {
    const { _id } = req.query;
    await Producer.findOneAndDelete({ _id });
    res.status(204).json({});
}