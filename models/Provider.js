import mongoose from 'mongoose';
import shortid from 'shortid';

const { String, Number } = mongoose.Schema.Types;

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        unique: true,
        default: shortid.generate()
    },
    description: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    }
});

export default mongoose.models.Provider || mongoose.model("Provider", ProviderSchema)