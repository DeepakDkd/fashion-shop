import mongoose, { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
  {
    name_hi: { type: String, required: true },
    name_en: { type: String, required: true },
    desc_hi: { type: String, default: '' },
    desc_en: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    price_label: { type: String, default: '' },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ['saree', 'suit', 'blouse', 'footwear', 'other'],
    },
    slug: { type: String, unique: true, required: true },
    featured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

ProductSchema.index({ category: 1, createdAt: -1 })
ProductSchema.index({ featured: 1 })
ProductSchema.index({ isNewArrival: 1 })
ProductSchema.index({ name_hi: 'text', name_en: 'text' })

export const Product = models.Product || model('Product', ProductSchema)
