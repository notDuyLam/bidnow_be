import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('sessions')
@Index(['userId', 'expiresAt'])
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, (u) => u.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'text', name: 'refresh_token_hash', nullable: true })
  refreshTokenHash?: string | null;

  @Column({ type: 'text', name: 'user_agent', nullable: true })
  userAgent?: string | null;

  @Column({ type: 'inet', nullable: true })
  ip?: string | null;

  @Column({ type: 'timestamptz', name: 'expires_at', nullable: true })
  expiresAt?: Date | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}


