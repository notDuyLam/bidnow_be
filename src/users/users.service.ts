import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { UserProfile } from '../entities/user-profile.entity';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { ListUsersQueryDto } from './dtos/list-users.dto.js';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';

type SafeUser = Omit<User, 'passwordHash'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserProfile) private readonly profileRepo: Repository<UserProfile>,
  ) {}

  async createUser(payload: CreateUserDto): Promise<SafeUser> {
    const existing = await this.userRepo.findOne({ where: { email: payload.email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const passwordHash = hashPassword(payload.password);
    const user: Partial<User> = {
      email: payload.email,
      passwordHash,
      role: (payload.role ?? 'USER') as UserRole,
      isEmailVerified: false,
    };
    const saved = await this.userRepo.save(this.userRepo.create(user));
    const profile = this.profileRepo.create({ userId: saved.id, displayName: payload.displayName ?? null });
    await this.profileRepo.save(profile);
    return sanitizeUser(saved);
  }

  async listUsers(query: ListUsersQueryDto): Promise<{ data: SafeUser[]; total: number }> {
    const take = Math.min(Math.max(query.limit ?? 20, 1), 100);
    const skip = Math.max(query.offset ?? 0, 0);
    const [data, total] = await this.userRepo.findAndCount({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: { profile: true },
    });
    return { data: data.map(sanitizeUser), total };
  }

  async getUserById(userId: string): Promise<SafeUser> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: { profile: true } });
    if (!user) throw new NotFoundException('User not found');
    return sanitizeUser(user);
  }
}

function hashPassword(plain: string): string {
  const salt = randomBytes(16).toString('hex');
  const sha = createHash('sha256');
  sha.update(salt + ':' + plain);
  return `sha256:${salt}:${sha.digest('hex')}`;
}

export function verifyPassword(plain: string, stored: string): boolean {
  const [algo, salt, hash] = stored.split(':');
  if (algo !== 'sha256' || !salt || !hash) return false;
  const sha = createHash('sha256');
  sha.update(salt + ':' + plain);
  const candidate = Buffer.from(sha.digest('hex'));
  const expected = Buffer.from(hash);
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function sanitizeUser(user: User): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _hidden, ...rest } = user as unknown as Record<string, unknown>;
  return rest as unknown as SafeUser;
}


