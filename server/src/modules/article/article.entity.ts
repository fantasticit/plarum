import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { IUser } from '../user/user.interface'
import { TagEntity } from '../tag/tag.entity'
import { ITag } from '../tag/tag.interface'

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  summary: string

  @Column('text')
  content: string

  @Column({ nullable: true })
  cover: string

  @Column('text')
  html: string

  @Column('simple-array')
  toc: [string]

  @ManyToOne(type => UserEntity, (user: IUser) => user.articles, {
    cascade: true,
  })
  @JoinTable()
  author: IUser

  @ManyToMany(type => TagEntity, (tag: ITag) => tag.articles, { cascade: true })
  @JoinTable()
  tags: ITag[]

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string

  @Column({ type: 'int', default: 0 })
  views: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishAt: string
}
