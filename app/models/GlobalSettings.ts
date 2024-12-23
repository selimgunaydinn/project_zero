import mongoose, { Schema, model, models } from 'mongoose';

const GlobalSettingsSchema = new Schema({
  websiteName: {
    type: String,
    required: false,
    default: '', // Varsayılan olarak boş string
  },
  websiteDescription: {
    type: String,
    required: false,
    default: '',
  },
  websiteKeywords: {
    type: String,
    required: false,
    default: '',
  },
  websiteAuthor: {
    type: String,
    required: false,
    default: '',
  },
  websiteUrl: {
    type: String,
    required: false,
    default: '',
  },
  websiteEmail: {
    type: String,
    required: false,
    default: '',
  },
  websitePhone: {
    type: String,
    required: false,
    default: '',
  },
  websiteAddress: {
    type: String,
    required: false,
    default: '',
  },
}, { timestamps: true });


export const GlobalSettings = models.GlobalSettings || model('GlobalSettings', GlobalSettingsSchema);
