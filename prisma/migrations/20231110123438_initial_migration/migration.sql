-- CreateTable
CREATE TABLE "user|user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "user|user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game|game" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "game|game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game|player" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "game|player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game|figure" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "game|figure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game|action" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "info" JSONB NOT NULL,

    CONSTRAINT "game|action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "game|player" ADD CONSTRAINT "game|player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user|user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game|player" ADD CONSTRAINT "game|player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game|game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game|figure" ADD CONSTRAINT "game|figure_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "game|player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game|action" ADD CONSTRAINT "game|action_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game|game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
