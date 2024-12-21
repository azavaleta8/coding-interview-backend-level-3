import mongoose, { Document, Schema, Model } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
import { Item } from '../types/ItemType';


// Define the schema for the Item model
const itemSchema: Schema<Item> = new Schema({
    _id: {
        type: Number
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
itemSchema.plugin(AutoIncrement);

// Create the Item model
export const ItemModel: Model<Item> = mongoose.model<Item>('Item', itemSchema);