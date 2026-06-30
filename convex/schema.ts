import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  donations: defineTable({
    reference: v.string(),
    amount: v.number(),
    currency: v.string(),
    channel: v.optional(v.string()),
    donorName: v.string(),
    donorEmail: v.string(),
    purpose: v.optional(v.string()),
    message: v.optional(v.string()),
    status: v.string(),
    paidAt: v.optional(v.string()),
  }).index('by_reference', ['reference']),

  insights: defineTable({
    title: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    image: v.optional(v.string()),
    author: v.optional(v.string()),
    readTime: v.optional(v.string()),
    date: v.optional(v.string()),
    category: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
    authorId: v.string(),
  }).index('by_category', ['category'])
    .searchIndex('search_content', { searchField: 'content', filterFields: ['category', 'published'] }),

  itineraries: defineTable({
    sessionId: v.string(),
    days: v.array(v.object({
      day: v.number(),
      items: v.array(v.object({
        id: v.string(),
        name: v.string(),
        type: v.string(),
        time: v.optional(v.string()),
      })),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_session', ['sessionId']),

  featureFlags: defineTable({
    chatbot: v.boolean(),
    whatsapp: v.boolean(),
    notifications: v.boolean(),
    donate: v.boolean(),
    gallery: v.boolean(),
    blog: v.boolean(),
    events: v.boolean(),
    experience: v.boolean(),
    tripPlanner: v.boolean(),
    map: v.boolean(),
  }),

  notifications: defineTable({
    title: v.string(),
    message: v.string(),
    type: v.union(v.literal('info'), v.literal('warning'), v.literal('success'), v.literal('emergency')),
    link: v.optional(v.string()),
    linkText: v.optional(v.string()),
    active: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_active', ['active']),
})
