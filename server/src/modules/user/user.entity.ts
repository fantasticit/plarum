import { ArticleEntity } from '../article/article.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
} from 'typeorm'
import { IArticle } from '../article/article.interface'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column()
  password: string

  @Column('simple-enum', { enum: ['admin', 'normal'], default: 'normal' })
  role: string

  @OneToMany(type => ArticleEntity, (article: IArticle) => article.author, {
    nullable: true,
  })
  @JoinTable()
  articles: IArticle[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginAt: string
}
