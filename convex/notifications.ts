import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const getActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('notifications')
      .withIndex('by_active', q => q.eq('active', true))
      .order('desc')
      .first()
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('notifications')
      .order('desc')
      .collect()
  },
})

export const publish = mutation({
  args: {
    title: v.string(),
    message: v.string(),
    type: v.union(v.literal('info'), v.literal('warning'), v.literal('success'), v.literal('emergency')),
    link: v.optional(v.string()),
    linkText: v.optional(v.string()),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    if (args.active) {
      const existing = await ctx.db
        .query('notifications')
        .withIndex('by_active', q => q.eq('active', true))
        .collect()
      for (const n of existing) {
        await ctx.db.patch(n._id, { active: false, updatedAt: now })
      }
    }
    return await ctx.db.insert('notifications', { ...args, createdAt: now, updatedAt: now })
  },
})

export const deactivate = mutation({
  args: { id: v.id('notifications') },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { active: false, updatedAt: Date.now() })
  },
})

export const remove = mutation({
  args: { id: v.id('notifications') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
