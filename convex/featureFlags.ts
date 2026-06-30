import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

const DEFAULTS = {
  chatbot: true,
  whatsapp: true,
  notifications: true,
  donate: true,
  gallery: true,
  blog: true,
  events: true,
  experience: true,
  tripPlanner: true,
  map: true,
}

export const getAll = query({
  handler: async (ctx) => {
    const flags = await ctx.db.query('featureFlags').first()
    return flags || DEFAULTS
  },
})

export const update = mutation({
  args: {
    chatbot: v.optional(v.boolean()),
    whatsapp: v.optional(v.boolean()),
    notifications: v.optional(v.boolean()),
    donate: v.optional(v.boolean()),
    gallery: v.optional(v.boolean()),
    blog: v.optional(v.boolean()),
    events: v.optional(v.boolean()),
    experience: v.optional(v.boolean()),
    tripPlanner: v.optional(v.boolean()),
    map: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('featureFlags').first()
    if (existing) {
      await ctx.db.patch(existing._id, args)
    } else {
      await ctx.db.insert('featureFlags', { ...DEFAULTS, ...args })
    }
  },
})
