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
    category: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
    authorId: v.string(),
  }).searchIndex('search_content', { searchField: 'content', filterFields: ['category', 'published'] }),
})
