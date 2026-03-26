import { Injectable } from '@nestjs/common';
import { RedirectGroup } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RedirectService {
    constructor(private prisma: PrismaService) { }

    private readonly singleRedirectChatId = process.env.SINGLE_REDIRECT_CHAT_ID?.trim() || '';

    private shouldUseSingleRedirect(): boolean {
        return !!this.singleRedirectChatId;
    }

    private buildSingleRedirect(): RedirectGroup {
        return {
            id: 0,
            chatId: this.singleRedirectChatId,
            title: this.singleRedirectChatId,
            isActive: true,
            deleteOriginal: false,
            addedById: BigInt(0),
            addedAt: new Date(0),
            removedAt: null,
        };
    }

    getActiveGroups() {
        if (this.shouldUseSingleRedirect()) {
            return Promise.resolve([this.buildSingleRedirect()]);
        }

        return this.prisma.redirectGroup.findMany({
            where: { isActive: true },
        });
    }

    async addGroup(data: {
        chatId: string;
        title: string;
        addedById: number;
    }) {
        if (this.shouldUseSingleRedirect()) {
            return this.buildSingleRedirect();
        }

        return this.prisma.redirectGroup.upsert({
            where: { chatId: data.chatId },
            update: {
                title: data.title,
                isActive: true,
                removedAt: null,
            },
            create: data,
        });
    }

    async removeGroup(chatId: string) {
        if (this.shouldUseSingleRedirect()) {
            return { count: 1 };
        }

        return this.prisma.redirectGroup.updateMany({
            where: { chatId },
            data: {
                isActive: false,
                removedAt: new Date(),
            },
        });
    }


    // MUHIM: update emas, updateMany
    async setDeleteFlag(chatId: string, value: boolean) {
        if (this.shouldUseSingleRedirect()) {
            return { count: 1 };
        }

        return this.prisma.redirectGroup.updateMany({
            where: { chatId },
            data: { deleteOriginal: value },
        });
    }
}
