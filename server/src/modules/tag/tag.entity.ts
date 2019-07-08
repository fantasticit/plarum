import { ArticleEntity } from '../article/article.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  label: string

  @Column()
  value: string

  @ManyToMany(type => ArticleEntity, article => article.tags)
  articles: any[]
}
