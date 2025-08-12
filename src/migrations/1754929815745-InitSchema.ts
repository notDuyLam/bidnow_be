import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1754929815745 implements MigrationInterface {
    name = 'InitSchema1754929815745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profiles" ("user_id" uuid NOT NULL, "display_name" text, "avatar_url" text, "bio" text, "phone" text, CONSTRAINT "UQ_dceea64a755bbbc3b64f0ec018d" UNIQUE ("phone"), CONSTRAINT "PK_6ca9503d77ae39b4b5a6cc3ba88" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "refresh_token_hash" text, "user_agent" text, "ip" inet, "expires_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a98be8e57a5749c1d8e41edced" ON "sessions" ("user_id", "expires_at") `);
        await queryRunner.query(`CREATE TABLE "bids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "auction_id" uuid NOT NULL, "user_id" uuid NOT NULL, "amount_cents" bigint NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_proxy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7950d066d322aab3a488ac39fe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_bids_user_created_at" ON "bids" ("user_id", "created_at") `);
        await queryRunner.query(`CREATE INDEX "idx_bids_auction_created_at" ON "bids" ("auction_id", "created_at") `);
        await queryRunner.query(`CREATE INDEX "idx_bids_auction_amount" ON "bids" ("auction_id", "amount_cents") `);
        await queryRunner.query(`CREATE TABLE "watchlists" ("user_id" uuid NOT NULL, "auction_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1b7653e729fe5d8da420bdb406c" PRIMARY KEY ("user_id", "auction_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1b7653e729fe5d8da420bdb406" ON "watchlists" ("auction_id", "user_id") `);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "item_id" uuid NOT NULL, "currency" character(3) NOT NULL DEFAULT 'VND', "start_price_cents" bigint NOT NULL, "current_price_cents" bigint NOT NULL, "min_increment_cents" bigint NOT NULL, "reserve_price_cents" bigint, "buy_now_price_cents" bigint, "starts_at" TIMESTAMP WITH TIME ZONE NOT NULL, "ends_at" TIMESTAMP WITH TIME ZONE NOT NULL, "status" text NOT NULL, "auto_extend_seconds" integer NOT NULL DEFAULT '0', "max_extensions" integer NOT NULL DEFAULT '0', "extensions_used" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_261cd2fbd597ff315b91ca434e8" UNIQUE ("item_id"), CONSTRAINT "REL_261cd2fbd597ff315b91ca434e" UNIQUE ("item_id"), CONSTRAINT "CHK_77115ecef26fbe60ecfb3c3af1" CHECK ("ends_at" > "starts_at"), CONSTRAINT "CHK_33652b04c6abd5b09b5d8cbfae" CHECK ("min_increment_cents" > 0), CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_261cd2fbd597ff315b91ca434e" ON "auctions" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_875e45f181471e4367a0941b0c" ON "auctions" ("status", "ends_at") `);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seller_id" uuid NOT NULL, "title" text NOT NULL, "description" text, "images" jsonb NOT NULL DEFAULT '[]', "category_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_items_seller_created_at_desc" ON "items" ("seller_id", "created_at") `);
        await queryRunner.query(`CREATE TABLE "system_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "actor_user_id" uuid, "action" text NOT NULL, "entity_type" text NOT NULL, "entity_id" uuid NOT NULL, "meta" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f28cae54c57b2887d94a4aa745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8bc735e7dbb8f98228ee1f73d4" ON "system_events" ("entity_type", "entity_id", "created_at") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password_hash" text NOT NULL, "role" text NOT NULL, "is_email_verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "type" text NOT NULL, "payload" jsonb NOT NULL, "read_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5323ccd23482802bd9759e88ee" ON "notifications" ("user_id", "read_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_310667f935698fcd8cb319113a" ON "notifications" ("user_id", "created_at") `);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_7d24f04e55838b694acc9d35bfe" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_cd7b0cdcb890ad457b676c0dfe8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watchlists" ADD CONSTRAINT "FK_3e8bccad3dcd75fa977892c54bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watchlists" ADD CONSTRAINT "FK_5dda1097094861329f62fdac209" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_261cd2fbd597ff315b91ca434e8" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_20719f5611327abb661f3cccb9a" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "system_events" ADD CONSTRAINT "FK_dcdfbd73cd2da0d5da185d13687" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`ALTER TABLE "system_events" DROP CONSTRAINT "FK_dcdfbd73cd2da0d5da185d13687"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_20719f5611327abb661f3cccb9a"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_261cd2fbd597ff315b91ca434e8"`);
        await queryRunner.query(`ALTER TABLE "watchlists" DROP CONSTRAINT "FK_5dda1097094861329f62fdac209"`);
        await queryRunner.query(`ALTER TABLE "watchlists" DROP CONSTRAINT "FK_3e8bccad3dcd75fa977892c54bb"`);
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_cd7b0cdcb890ad457b676c0dfe8"`);
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_7d24f04e55838b694acc9d35bfe"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_310667f935698fcd8cb319113a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5323ccd23482802bd9759e88ee"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bc735e7dbb8f98228ee1f73d4"`);
        await queryRunner.query(`DROP TABLE "system_events"`);
        await queryRunner.query(`DROP INDEX "public"."idx_items_seller_created_at_desc"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_875e45f181471e4367a0941b0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_261cd2fbd597ff315b91ca434e"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b7653e729fe5d8da420bdb406"`);
        await queryRunner.query(`DROP TABLE "watchlists"`);
        await queryRunner.query(`DROP INDEX "public"."idx_bids_auction_amount"`);
        await queryRunner.query(`DROP INDEX "public"."idx_bids_auction_created_at"`);
        await queryRunner.query(`DROP INDEX "public"."idx_bids_user_created_at"`);
        await queryRunner.query(`DROP TABLE "bids"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a98be8e57a5749c1d8e41edced"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
    }

}
