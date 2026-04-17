'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IProduct } from '@/types'
import toast from 'react-hot-toast'

interface ProductFormProps {
  locale: 'hi' | 'en'
  product?: IProduct
}

const CATEGORIES = [
  { value: 'saree', hi: 'साड़ी', en: 'Saree' },
  { value: 'suit', hi: 'सूट / चूड़ीदार', en: 'Suit / Chudidar' },
  { value: 'blouse', hi: 'ब्लाउज़', en: 'Blouse' },
  { value: 'footwear', hi: 'जूते', en: 'Footwear' },
  { value: 'other', hi: 'अन्य', en: 'Other' },
]

export default function ProductForm({ locale, product }: ProductFormProps) {
  const router = useRouter()
  const isEditing = !!product

  const [form, setForm] = useState({
    name_hi: product?.name_hi || '',
    name_en: product?.name_en || '',
    desc_hi: product?.desc_hi || '',
    desc_en: product?.desc_en || '',
    price: product?.price?.toString() || '',
    price_label: product?.price_label || '',
    category: product?.category || 'saree',
    featured: product?.featured || false,
    isNewArrival: product?.isNewArrival || false,
    inStock: product?.inStock ?? true,
  })

  const [images, setImages] = useState<string[]>(product?.images || [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error(locale === 'hi' ? 'सिर्फ तस्वीर अपलोड करें' : 'Only images allowed')
      return
    }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setImages((prev) => [...prev, data.url])
        toast.success(locale === 'hi' ? 'तस्वीर अपलोड हुई!' : 'Image uploaded!')
      } else {
        toast.error(data.error || 'Upload failed')
      }
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    for (const file of files) await uploadFile(file)
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    for (const file of files) await uploadFile(file)
  }, [])

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name_hi || !form.name_en || !form.price) {
      toast.error(locale === 'hi' ? 'सभी जरूरी फील्ड भरें' : 'Fill all required fields')
      return
    }

    setSaving(true)
    try {
      const payload = { ...form, price: parseFloat(form.price), images }
      const url = isEditing ? `/api/products/${product._id}` : '/api/products'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        toast.success(locale === 'hi' ? 'उत्पाद सहेजा गया!' : 'Product saved!')
        router.push(`/${locale}/admin`)
        router.refresh()
      } else {
        toast.error(data.error || 'Save failed')
      }
    } catch {
      toast.error('Error saving product')
    } finally {
      setSaving(false)
    }
  }

  const label = (hi: string, en: string, required = false) => (
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {locale === 'hi' ? hi : en}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
  )

  const inputClass = 'w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4">
          {locale === 'hi' ? '📸 तस्वीरें' : '📸 Images'}
        </h3>

        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
            dragOver ? 'border-rose-400 bg-rose-50' : 'border-rose-200 hover:border-rose-400'
          }`}
        >
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-3xl mb-2">{uploading ? '⏳' : '📤'}</div>
            <p className="text-sm text-gray-500">
              {uploading
                ? (locale === 'hi' ? 'अपलोड हो रहा है...' : 'Uploading...')
                : (locale === 'hi' ? 'यहाँ खींचें या क्लिक करें' : 'Drag & drop or click to upload')}
            </p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP • Max 5MB</p>
          </label>
        </div>

        {/* Uploaded Images */}
        {images.length > 0 && (
          <div className="flex gap-3 mt-4 flex-wrap">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-rose-100">
                  <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" sizes="80px" />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                    {locale === 'hi' ? 'मुख्य' : 'Main'}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">
          {locale === 'hi' ? '📝 बुनियादी जानकारी' : '📝 Basic Information'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {label('नाम (हिंदी)', 'Name (Hindi)', true)}
            <input name="name_hi" value={form.name_hi} onChange={handleInput} className={inputClass} placeholder="जैसे: बनारसी रेशम साड़ी" required />
          </div>
          <div>
            {label('नाम (English)', 'Name (English)', true)}
            <input name="name_en" value={form.name_en} onChange={handleInput} className={inputClass} placeholder="e.g. Banarasi Silk Saree" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {label('विवरण (हिंदी)', 'Description (Hindi)')}
            <textarea name="desc_hi" value={form.desc_hi} onChange={handleInput} className={inputClass} rows={3} placeholder="उत्पाद का विवरण..." />
          </div>
          <div>
            {label('विवरण (English)', 'Description (English)')}
            <textarea name="desc_en" value={form.desc_en} onChange={handleInput} className={inputClass} rows={3} placeholder="Product description..." />
          </div>
        </div>
      </div>

      {/* Price & Category */}
      <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">
          {locale === 'hi' ? '💰 कीमत और श्रेणी' : '💰 Price & Category'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            {label('कीमत (₹)', 'Price (₹)', true)}
            <input name="price" type="number" min="0" value={form.price} onChange={handleInput} className={inputClass} placeholder="799" required />
          </div>
          <div>
            {label('कीमत लेबल', 'Price Label')}
            <input name="price_label" value={form.price_label} onChange={handleInput} className={inputClass} placeholder="से शुरू / onwards" />
          </div>
          <div>
            {label('श्रेणी', 'Category', true)}
            <select name="category" value={form.category} onChange={handleInput} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {locale === 'hi' ? c.hi : c.en}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4">
          {locale === 'hi' ? '⚙️ सेटिंग्स' : '⚙️ Settings'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'inStock', hi: 'उपलब्ध है', en: 'In Stock', icon: '✅' },
            { name: 'featured', hi: 'खास उत्पाद', en: 'Featured Product', icon: '⭐' },
            { name: 'isNewArrival', hi: 'नई आमद', en: 'New Arrival', icon: '✨' },
          ].map((toggle) => (
            <label
              key={toggle.name}
              className="flex items-center gap-3 cursor-pointer bg-rose-50 rounded-xl p-3 hover:bg-rose-100 transition-colors"
            >
              <input
                type="checkbox"
                name={toggle.name}
                checked={form[toggle.name as keyof typeof form] as boolean}
                onChange={handleInput}
                className="w-4 h-4 accent-rose-600"
              />
              <span className="text-sm font-medium text-gray-700">
                {toggle.icon} {locale === 'hi' ? toggle.hi : toggle.en}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 text-base"
        >
          {saving
            ? (locale === 'hi' ? 'सहेज रहे हैं...' : 'Saving...')
            : (locale === 'hi' ? '💾 सहेजें' : '💾 Save Product')}
        </button>
        <a
          href={`/${locale}/admin`}
          className="px-6 py-3 border border-rose-200 text-rose-600 font-semibold rounded-xl hover:bg-rose-50 transition-colors text-center"
        >
          {locale === 'hi' ? 'रद्द करें' : 'Cancel'}
        </a>
      </div>
    </form>
  )
}
