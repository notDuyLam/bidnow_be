import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Bid } from './bid.entity';
import { Watchlist } from './watchlist.entity';

export type AuctionStatus = 'PENDING' | 'LIVE' | 'ENDED' | 'CANCELLED';

@Entity('auctions')
@Index(['status', 'endsAt'])
@Index(['itemId'], { unique: true })
@Check(`"min_increment_cents" > 0`)
@Check(`"ends_at" > "starts_at"`)
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'item_id', unique: true })
  itemId!: string;

  @OneToOne(() => Item, (i) => i.auction, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'item_id' })
  item!: Item;

  @Column({ type: 'char', length: 3, default: 'VND' })
  currency!: string;

  @Column({ type: 'bigint', name: 'start_price_cents' })
  startPriceCents!: string;

  @Column({ type: 'bigint', name: 'current_price_cents' })
  currentPriceCents!: string;

  @Column({ type: 'bigint', name: 'min_increment_cents' })
  minIncrementCents!: string;

  @Column({ type: 'bigint', name: 'reserve_price_cents', nullable: true })
  reservePriceCents?: string | null;

  @Column({ type: 'bigint', name: 'buy_now_price_cents', nullable: true })
  buyNowPriceCents?: string | null;

  @Column({ type: 'timestamptz', name: 'starts_at' })
  startsAt!: Date;

  @Column({ type: 'timestamptz', name: 'ends_at' })
  endsAt!: Date;

  @Column({ type: 'text' })
  status!: AuctionStatus;

  @Column({ type: 'int', name: 'auto_extend_seconds', default: 0 })
  autoExtendSeconds!: number;

  @Column({ type: 'int', name: 'max_extensions', default: 0 })
  maxExtensions!: number;

  @Column({ type: 'int', name: 'extensions_used', default: 0 })
  extensionsUsed!: number;

  @OneToMany(() => Bid, (b) => b.auction)
  bids?: Bid[];

  @OneToMany(() => Watchlist, (w) => w.auction)
  watchlists?: Watchlist[];
}


