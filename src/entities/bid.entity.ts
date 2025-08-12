import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auction } from './auction.entity';
import { User } from './user.entity';

@Entity('bids')
@Index('idx_bids_auction_amount', ['auctionId', 'amountCents'])
@Index('idx_bids_auction_created_at', ['auctionId', 'createdAt'])
@Index('idx_bids_user_created_at', ['userId', 'createdAt'])
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'auction_id' })
  auctionId!: string;

  @ManyToOne(() => Auction, (a) => a.bids, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'auction_id' })
  auction!: Auction;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, (u) => u.bids, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'bigint', name: 'amount_cents' })
  amountCents!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @Column({ type: 'boolean', name: 'is_proxy', default: false })
  isProxy!: boolean;
}


