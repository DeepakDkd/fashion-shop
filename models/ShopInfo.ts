import mongoose, { Schema, model, models } from 'mongoose'

const ShopInfoSchema = new Schema(
  {
    name_hi: { type: String, default: 'फैशन स्टोर' },
    name_en: { type: String, default: 'Fashion Store' },
    address: { type: String, default: 'इंदौर, मध्यप्रदेश' },
    phone: { type: String, default: '+91 98765 43210' },
    whatsapp: { type: String, default: '919876543210' },
    hours: { type: String, default: 'सोम-शनि: 10am - 8pm' },
    mapLink: { type: String, default: '' },
  },
  { timestamps: true }
)

export const ShopInfo = models.ShopInfo || model('ShopInfo', ShopInfoSchema)
