import { getRepository, Repository } from 'typeorm'
import { TagEntity } from './tag.entity'
import { ITag } from './tag.interface'

const getRepo = (): Repository<TagEntity> => {
  return getRepository(TagEntity)
}

export const addTag = async (tag: ITag) => {
  const repo = getRepo()
  const savedTag = repo.create(tag)
  await repo.save(savedTag)
  return savedTag
}

export const findTags = async () => {
  const repo = getRepo()
  const ret = await repo.find()
  return ret
}

export const findTagsWithArticles = async (id: string) => {
  const repo = getRepo()
  const ret = await repo
    .createQueryBuilder('tag')
    .leftJoinAndSelect('tag.articles', 'articles')
    .getMany()

  return ret
}

export const findTagById = async (id: string) => {
  const repo = getRepo()
  const ret = await repo.findOne(id)
  return ret
}

export const findTagByIdWithArticles = async (id: string) => {
  const repo = getRepo()
  const ret = await repo
    .createQueryBuilder('tag')
    .leftJoinAndSelect('tag.articles', 'articles')
    .where('tag.id=:id')
    .setParameter('id', id)
    .getOne()
  return ret
}

export const updateTagById = async (id: string, info: ITag) => {
  const repo = getRepo()
  const tag = await repo.findOne(id)

  const updatedTag = await repo.merge(tag, info)
  await repo.save(updatedTag)
  return updatedTag
}

export const deleteTagById = async (id: string) => {
  const repo = getRepo()
  const user = await findTagById(id)
  await repo.remove(user)
}
