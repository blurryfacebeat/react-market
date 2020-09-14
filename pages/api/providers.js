import Provider from '../../models/Provider';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    const providers = await Provider.find();
    res.status(200).json(providers);
};