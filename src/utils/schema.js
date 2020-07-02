import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, index: true },
});

export const categorySchema = new mongoose.Schema({
  _id: Number,
  categoryId: Number,
  name: { type: String, index: true },
});
