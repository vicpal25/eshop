import mongoose from 'mongoose';

export const articleSchema = new mongoose.Schema({
  _id: Number,
  type: { type: String, index: true },
});

export const imageSchema = new mongoose.Schema({
  _id: Number,
  imageId: Number,
  slug: String,
  type: { type: String, index: true },
  isLead: Boolean,
  tags: [
    {
      _id: Number,
      type: String,
    },
  ],
});

export const externalLinkSchema = new mongoose.Schema({
  url: String,
  headline: String,
  dek: String,
  thumbnailUrl: String,
});

export const roleSchema = new mongoose.Schema({
  title: String,
  actions: [String],
});

export const userSchema = new mongoose.Schema(
  {
    email: { type: String, index: true, lowercase: true, trim: true },
    access: [
      {
        brand: String,
        roles: [String],
      },
    ],
    hashedPassword: String,
  },
  { timestamps: true }
);

export const moduleSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    creator: String,
    description: String,
    brand: String,
    moduleType: String,
    lockedBy: String,
    options: {
      type: {},
      default: {},
    },
    versionId: Number,
  },
  { timestamps: true, minimize: false }
);

export const curationSchema = new mongoose.Schema(
  {
    creator: String,
    taxonomyPath: String,
    brand: String,
    device: String,
    deleted: Boolean,
    name: String,
    title: String,
    description: String,
    keywords: Array,
    route: String,
    publishedDate: String,
    publishedBy: String,
    versionId: Number,
    isPublished: Boolean,
    lockedBy: String,
    packages: [
      {
        taxonomyPath: String,
        _id: String,
        name: String,
        packageType: String,
        options: Object,
        modules: {
          type: [
            {
              name: String,
              title: String,
              moduleType: String,
              zone: String,
            },
          ],
          default: [],
        },
        items: [
          {
            id: String,
            contentType: String,
            curatedValues: Object,
            externalValues: Object,
          },
        ],
        relatedContentTitle: String,
        relatedContentTaxonomyPath: String,
        relatedContentLimit: Number,
      },
    ],
  },
  { timestamps: true, minimize: false }
);
