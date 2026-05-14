const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  icon: { type: String, default: '' },
  image: { type: String, default: '' },
  color: { type: String, default: '' },
  pricing: {
    basePrice: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    unit: { type: String, default: 'session' },
  },
  features: [{ type: String }],
  benefits: [{ type: String }],
  duration: { type: String, default: '' },
  faqs: [{
    question: String,
    answer: String,
  }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
