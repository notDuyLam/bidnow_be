import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId!: string;

  @OneToOne(() => User, (u) => u.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'text', name: 'display_name', nullable: true })
  displayName?: string | null;

  @Column({ type: 'text', name: 'avatar_url', nullable: true })
  avatarUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  bio?: string | null;

  @Column({ type: 'text', nullable: true, unique: true })
  phone?: string | null;
}


