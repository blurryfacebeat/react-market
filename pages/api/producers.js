import Producer from '../../models/Producer';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    const producers = await Producer.find();
    res.status(200).json(producers);
};