import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photoUrl: {
    type: String, // Fotoğraf dosyasının URL'sini saklayacağız
    default: '',  // Başlangıçta boş olabilir
  }
});

export const Project = models.Project || model('Project', ProjectSchema);
