import Provider from '../../models/Provider';

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
    const provider = await Provider.findOne({ _id })
    res.status(200).json(provider)
}

async function handleDeleteRequest(req, res) {
    const { _id } = req.query;
    await Provider.findOneAndDelete({ _id });
    res.status(204).json({});
}