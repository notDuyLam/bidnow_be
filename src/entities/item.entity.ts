import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Auction } from './auction.entity';

@Entity('items')
@Index('idx_items_seller_created_at_desc', ['sellerId', 'createdAt'])
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'seller_id' })
  sellerId!: string;

  @ManyToOne(() => User, (u) => u.items, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'seller_id' })
  seller!: User;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  images!: unknown[];

  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  categoryId?: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt?: Date | null;

  @OneToOne(() => Auction, (a) => a.item)
  auction?: Auction;
}


