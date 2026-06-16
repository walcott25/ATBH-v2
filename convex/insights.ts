import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    if (category) {
      return await ctx.db
        .query('insights')
        .withIndex('by_category', q => q.eq('category', category))
        .filter(q => q.eq(q.field('published'), true))
        .collect()
    }
    return await ctx.db
      .query('insights')
      .filter(q => q.eq(q.field('published'), true))
      .collect()
  },
})

export const getById = query({
  args: { id: v.id('insights') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('insights', args)
  },
})
