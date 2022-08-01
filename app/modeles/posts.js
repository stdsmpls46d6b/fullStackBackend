import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title:      { type: String, required: true },
    text:       { type: String, required: true },
    tags:       { type: Array,  default: [] },
    viewsCount: { type: Number, default: 0 },
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    imageUrl:   { type: String },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('posts', postSchema)
