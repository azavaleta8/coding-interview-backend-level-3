import mongoose, { Document, Schema, Model } from 'mongoose';
import AutoIncrementID from 'mongoose-sequence';

// Define the interface for the Item document
interface Item extends Document {
    _id: number;
    name: string;
    price: number;
}

// Define the schema for the Item model
const itemSchema: Schema<Item> = new Schema({
    _id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
}, { timestamps: true });

// Apply the auto-increment plugin to the schema
itemSchema.plugin(AutoIncrementID, { field: '_id' });

// Create the Item model
export const Item: Model<Item> = mongoose.model<Item>('Item', itemSchema);