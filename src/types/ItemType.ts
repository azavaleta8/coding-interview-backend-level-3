// Define the interface for the Item document
import { Document } from 'mongoose';

export interface Item extends Document {
    _id: number;
    name: string;
    price: number;
}