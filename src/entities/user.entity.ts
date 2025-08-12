import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Session } from './session.entity';
import { Item } from './item.entity';
import { Bid } from './bid.entity';
import { Watchlist } from './watchlist.entity';
import { SystemEvent } from './system-event.entity';

export type UserRole = 'USER' | 'SELLER' | 'ADMIN';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text', name: 'password_hash' })
  passwordHash!: string;

  @Column({ type: 'text' })
  role!: UserRole;

  @Column({ type: 'boolean', name: 'is_email_verified', default: false })
  isEmailVerified!: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile?: UserProfile;

  @OneToMany(() => Session, (s) => s.user)
  sessions?: Session[];

  @OneToMany(() => Item, (i) => i.seller)
  items?: Item[];

  @OneToMany(() => Bid, (b) => b.user)
  bids?: Bid[];

  @OneToMany(() => Watchlist, (w) => w.user)
  watchlists?: Watchlist[];

  @OneToMany(() => SystemEvent, (e) => e.actorUser)
  events?: SystemEvent[];
}


