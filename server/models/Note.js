const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'image', 'text'],
      required: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    extractedText: {
      type: String,
      default: '',
    },
    pageCount: {
      type: Number,
      default: 0,
    },
    isScanned: {
      type: Boolean,
      default: false,
    },
    summary: {
      short: String,
      medium: String,
      detailed: String,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    subject: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['uploading', 'processing', 'ready', 'error'],
      default: 'uploading',
    },
    pineconeIds: [{
      type: String,
    }],
    vectorizationStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
noteSchema.index({ userId: 1, title: 'text', extractedText: 'text', tags: 'text' });

// Virtual for summary completion
noteSchema.virtual('hasSummary').get(function () {
  return !!(this.summary?.short || this.summary?.medium || this.summary?.detailed);
});

// Virtual for processing status
noteSchema.virtual('isReady').get(function () {
  return this.status === 'ready';
});

module.exports = mongoose.model('Note', noteSchema);
