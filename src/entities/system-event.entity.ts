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

@Entity('system_events')
@Index(['entityType', 'entityId', 'createdAt'])
export class SystemEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'actor_user_id', nullable: true })
  actorUserId?: string | null;

  @ManyToOne(() => User, (u) => u.events, { nullable: true })
  @JoinColumn({ name: 'actor_user_id' })
  actorUser?: User | null;

  @Column({ type: 'text' })
  action!: string;

  @Column({ type: 'text', name: 'entity_type' })
  entityType!: string;

  @Column({ type: 'uuid', name: 'entity_id' })
  entityId!: string;

  @Column({ type: 'jsonb' })
  meta!: unknown;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}


