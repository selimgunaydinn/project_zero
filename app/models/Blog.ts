import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, 
});

const Blog = models.Blog || model('Blog', BlogSchema);

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String }, 
}, { timestamps: true });

const Category = models.Category || model('Category', CategorySchema);

export { Blog, Category };
