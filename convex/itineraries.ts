import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const save = mutation({
  args: {
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
  },
  handler: async (ctx, { sessionId, days }) => {
    const existing = await ctx.db
      .query('itineraries')
      .filter(q => q.eq(q.field('sessionId'), sessionId))
      .first()
    if (existing) {
      return await ctx.db.patch(existing._id, { days, updatedAt: Date.now() })
    }
    return await ctx.db.insert('itineraries', { sessionId, days, createdAt: Date.now(), updatedAt: Date.now() })
  },
})

export const load = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    return await ctx.db
      .query('itineraries')
      .filter(q => q.eq(q.field('sessionId'), sessionId))
      .first()
  },
})
