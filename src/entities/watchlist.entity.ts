import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Auction } from './auction.entity';

@Entity('watchlists')
@Index(['auctionId', 'userId'])
export class Watchlist {
  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'auction_id' })
  auctionId!: string;

  @ManyToOne(() => User, (u) => u.watchlists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Auction, (a) => a.watchlists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'auction_id' })
  auction!: Auction;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}


