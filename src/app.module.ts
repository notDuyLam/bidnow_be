import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { Session } from './entities/session.entity';
import { Item } from './entities/item.entity';
import { Auction } from './entities/auction.entity';
import { Bid } from './entities/bid.entity';
import { Watchlist } from './entities/watchlist.entity';
import { Notification } from './entities/notification.entity';
import { SystemEvent } from './entities/system-event.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const common = {
          type: 'postgres' as const,
          autoLoadEntities: true,
          synchronize: false,
          logging: false,
          ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
        };
        if (process.env.DATABASE_URL) {
          return { ...common, url: process.env.DATABASE_URL };
        }
        return {
          ...common,
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        };
      },
    }),
    TypeOrmModule.forFeature([User, UserProfile, Session, Item, Auction, Bid, Watchlist, Notification, SystemEvent]),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
