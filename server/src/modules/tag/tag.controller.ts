import * as Koa from 'koa'
import { ErrorStatusCodes } from '../../ErrorStatusCodes'
import {
  addTag,
  findTags,
  findTagsWithArticles,
  findTagById,
  findTagByIdWithArticles,
  updateTagById,
  deleteTagById,
} from './tag.service'

class TagController {
  async addTag(ctx: Koa.Context) {
    const tag = await addTag(ctx.request.body)
    ctx.body = { status: 'ok', data: tag }
  }

  async findTags(ctx: Koa.Context) {
    const tags = await findTags()
    ctx.body = { status: 'ok', data: tags }
  }

  async findTagById(ctx: Koa.Context) {
    const id = ctx.params.id
    const tag = await findTagById(id)

    if (!tag) {
      ctx.throw(404)
    }
    ctx.body = { status: 'ok', data: tag }
  }

  async updateTagById(ctx: Koa.Context) {
    const id = ctx.params.id
    const tag = await findTagById(id)

    if (!tag) {
      ctx.throw(404)
    }

    const updatedTag = await updateTagById(id, ctx.request.body)
    ctx.body = { status: 'ok', data: updatedTag }
  }

  async deleteTagById(ctx: Koa.Context) {
    const tag = await findTagByIdWithArticles(ctx.params.id)

    if (!tag) {
      ctx.throw(404)
    }

    if (tag.articles && tag.articles.length) {
      ctx.throw(400, ErrorStatusCodes.TAG_IS_USED)
    }

    await deleteTagById(ctx.params.id)

    ctx.status = 204
    ctx.body = { status: 'ok' }
  }
}

export default new TagController()
