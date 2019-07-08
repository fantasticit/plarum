import * as Koa from 'koa'
import { getRepository, Repository } from 'typeorm'
import { ErrorStatusCodes } from '../../ErrorStatusCodes'
import * as moment from 'moment'
import { findTagById } from '../tag/tag.service'
import { ArticleEntity } from './article.entity'
import { marked } from './article.service'
import { isAdmin } from '../user/user.service'

const getRepo = (): Repository<ArticleEntity> => {
  const repo: Repository<ArticleEntity> = getRepository(ArticleEntity)
  return repo
}

class ArticleController {
  async findArticles(ctx: Koa.Context) {
    const repo = getRepo()
    const articles = await repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.author', 'author')
      .getMany()
    ctx.body = { status: 'ok', data: articles }
  }

  async findArticleById(ctx: Koa.Context) {
    const id = ctx.params.id
    const repo = getRepo()
    const article = await repo.findOne(id)
    if (!article) {
      ctx.throw(404)
    }
    ctx.body = { status: 'ok', data: article }
  }

  async addArticle(ctx: Koa.Context) {
    const repo = getRepo()
    let currentUser = ctx.request.body.currentUser
    const { html, toc } = marked(ctx.request.body.content)
    const { html: summary } = marked(ctx.request.body.summary)
    let tags = ctx.request.body.tags
    try {
      tags = tags.replace(/\[|\]/g, '').split(',')
    } catch (e) {}
    tags = await Promise.all(tags.map(findTagById))
    delete ctx.request.body.tags
    const article = repo.create({
      ...ctx.request.body,
      html,
      tags,
      summary,
      toc,
      author: currentUser.id,
    })
    await repo.save(article)
    ctx.body = { data: article }
  }

  async updateArticleById(ctx: Koa.Context) {
    const repo = getRepo()
    const article = await repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .where('article.id=:id')
      .setParameter('id', ctx.params.id)
      .getOne()

    const author = article.author
    const currentUser = ctx.request.body.currentUser

    if (author.id !== currentUser.id) {
      ctx.throw(403, ErrorStatusCodes.AUTHENTICATION_FAILED)
    }

    if (!article) {
      ctx.throw(404)
    }

    let tags = ctx.request.body.tags
    try {
      tags = tags.replace(/\[|\]/g, '').split(',')
    } catch (e) {}
    tags = await Promise.all(tags.map(findTagById))

    const { html, toc } = marked(ctx.request.body.content)
    const { html: summary } = marked(ctx.request.body.summary)

    delete ctx.request.body.tags

    const updatedArticle = await repo.merge(article, {
      ...ctx.request.body,
      tags,
      summary,
      html,
      toc,
      updateAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    })
    repo.save(updatedArticle)
    ctx.body = { data: updatedArticle }
  }

  async deleteArticleById(ctx: Koa.Context) {
    const repo = getRepo()
    const article = await repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .where('article.id=:id')
      .setParameter('id', ctx.params.id)
      .getOne()

    if (!article) {
      ctx.throw(404)
    }

    const currentUser = ctx.request.body.currentUser
    const can = await isAdmin(currentUser)

    if (!can && article.author.id !== currentUser.id) {
      ctx.throw(403, ErrorStatusCodes.AUTHENTICATION_FAILED)
    }

    await repo.remove(article) // 注意与 delete 的区别
    ctx.status = 204
    ctx.body = { status: 'ok' }
  }
}

export default new ArticleController()
