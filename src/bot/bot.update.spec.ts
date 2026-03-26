import { BotUpdate } from './bot.update';

describe('BotUpdate isTaxiOrder', () => {
  const bot = new BotUpdate({} as any, {} as any);
  const isTaxiOrder = (text: string) => (bot as any).isTaxiOrder(text);

  it('accepts extended client phrases from real chats', () => {
    const samples = [
      'лелндан камсамулга почта бор 902424545',
      'Kamsamoldan gulistonga 1kishi bor',
      'Gulistondan toshkenga zakazga moshina kk',
      'Toshkentdan kamsamolga taksi kk',
      'Gulistondan kamsamolga 1 kiwi bor',
      'Гулистонга 1киши бор',
      "Assalomu alaykum 3 mavzega dastavka bor yo'lkira 15 ming",
      'Gulistonga 1 ta odam bor',
      'Kamsamolda. Gulistonga bir kishi bor',
      'Assalomu aleykum,kamsamoldan toshkentga 2 kishi soat 7:30 ga',
      'Гулистонга 1 кши срочна',
      'Шахарга бир киши',
      'Toshkentdan Kamsamolga taksi bormi hozrga?',
      'Гулистондан камсамолга 1киши бор',
      'тошкендан камсамолга такси борми',
      'Гулистонга Бир киши',
      'Gulistondan kamsamolga taxi bormi srochna zakazga 40 ming beraman',
      'Kamsamo‘ldan gulistonga 2kishimiz',
      'Waxarga dastavka bor',
      'Gulistondan kamsamolga 1 kishi',
      'kamsamoldan gulistonga bormi',
      'kamsamoldan gulistonga boraman',
    ];

    for (const text of samples) {
      expect(isTaxiOrder(text)).toBe(true);
    }
  });

  it('rejects clear driver-side offers', () => {
    const samples = [
      'taxi bor',
      'odam olamiz',
      'olib ketaman',
      'obketamiz',
      'bosh taksi bor',
      'kim ketadi',
      'kamsamoldan gulistonga',
    ];

    for (const text of samples) {
      expect(isTaxiOrder(text)).toBe(false);
    }
  });

  it('does not forward non-orders in private chat', async () => {
    const redirectService = { getActiveGroups: jest.fn().mockResolvedValue([]) };
    const adminService = { isAdmin: jest.fn().mockResolvedValue(false) };
    const localBot = new BotUpdate(redirectService as any, adminService as any);

    const ctx = {
      chat: { id: 1001, type: 'private' as const },
      from: { id: 9001, first_name: 'User' },
      message: { text: 'taxi bor', message_id: 77 },
      telegram: {},
      reply: jest.fn(),
    } as any;

    jest.spyOn(localBot as any, 'handlePendingPhoneReply').mockResolvedValue(false);

    const forwardSpy = jest.spyOn(localBot as any, 'forwardAll').mockResolvedValue(undefined);
    const withoutPhoneSpy = jest
      .spyOn(localBot as any, 'forwardOrderWithoutPhone')
      .mockResolvedValue(undefined);
    const askPhoneSpy = jest.spyOn(localBot as any, 'askPhoneAndStore').mockResolvedValue(undefined);

    await localBot.onText(ctx);

    expect(forwardSpy).not.toHaveBeenCalled();
    expect(withoutPhoneSpy).not.toHaveBeenCalled();
    expect(askPhoneSpy).not.toHaveBeenCalled();
  });

  it('allows admin users to submit orders in private chat', async () => {
    const redirectService = { getActiveGroups: jest.fn().mockResolvedValue([]) };
    const adminService = { isAdmin: jest.fn().mockResolvedValue(true) };
    const localBot = new BotUpdate(redirectService as any, adminService as any);

    const ctx = {
      chat: { id: 1001, type: 'private' as const },
      from: { id: 9001, first_name: 'Admin' },
      message: {
        text: 'Gulistondan kamsamolga taxi bormi 901234567',
        message_id: 77,
      },
      telegram: {},
      reply: jest.fn(),
    } as any;

    jest.spyOn(localBot as any, 'handlePendingPhoneReply').mockResolvedValue(false);

    const forwardSpy = jest.spyOn(localBot as any, 'forwardAll').mockResolvedValue(undefined);

    await localBot.onText(ctx);

    expect(forwardSpy).toHaveBeenCalledWith(ctx, '901234567');
  });

  it('asks for phone before forwarding orders without a phone number', async () => {
    const redirectService = { getActiveGroups: jest.fn().mockResolvedValue([]) };
    const adminService = { isAdmin: jest.fn().mockResolvedValue(false) };
    const localBot = new BotUpdate(redirectService as any, adminService as any);

    const ctx = {
      chat: { id: 1001, type: 'private' as const },
      from: { id: 9001, first_name: 'User' },
      message: { text: 'Gulistondan kamsamolga taxi bormi', message_id: 77 },
      telegram: {},
      reply: jest.fn(),
    } as any;

    jest.spyOn(localBot as any, 'handlePendingPhoneReply').mockResolvedValue(false);

    const forwardSpy = jest.spyOn(localBot as any, 'forwardAll').mockResolvedValue(undefined);
    const withoutPhoneSpy = jest
      .spyOn(localBot as any, 'forwardOrderWithoutPhone')
      .mockResolvedValue(undefined);
    const askPhoneSpy = jest.spyOn(localBot as any, 'askPhoneAndStore').mockResolvedValue(undefined);

    await localBot.onText(ctx);

    expect(forwardSpy).not.toHaveBeenCalled();
    expect(withoutPhoneSpy).not.toHaveBeenCalled();
    expect(askPhoneSpy).toHaveBeenCalledWith(ctx, ctx.message.text);
  });

  it('deletes the original order before asking for a phone number', async () => {
    const localBot = new BotUpdate({} as any, {} as any);
    const ctx = {
      chat: { id: 1001, type: 'private' as const },
      from: { id: 9001, first_name: 'User', last_name: 'Test' },
      message: { text: 'Gulistondan kamsamolga taxi bormi', message_id: 77 },
      telegram: {},
    } as any;

    const deleteSpy = jest.spyOn(localBot as any, 'safeDeleteSilently').mockResolvedValue(undefined);
    const promptSpy = jest
      .spyOn(localBot as any, 'sendAutoDeleteMessage')
      .mockResolvedValue({ message_id: 88 });

    await (localBot as any).askPhoneAndStore(ctx, ctx.message.text);

    expect(deleteSpy).toHaveBeenCalledWith(ctx, ctx.chat.id, ctx.message.message_id);
    expect(promptSpy).toHaveBeenCalledWith(
      ctx,
      ctx.chat.id,
      expect.stringContaining('nomerizni yuboring'),
      { parse_mode: 'HTML' },
    );
    expect((localBot as any).pendingPhoneOrders.get('1001:9001')).toEqual(
      expect.objectContaining({
        chatId: 1001,
        userId: 9001,
        text: ctx.message.text,
        sourceMessageId: 77,
        promptMessageId: 88,
      }),
    );
  });

  it('accepts a shared contact as the pending phone reply', async () => {
    const localBot = new BotUpdate({} as any, {} as any);
    (localBot as any).pendingPhoneOrders.set('1001:9001', {
      chatId: 1001,
      userId: 9001,
      fullName: 'User Test',
      text: 'Gulistondan kamsamolga taxi bormi',
      sourceMessageId: 77,
      promptMessageId: 88,
    });

    const ctx = {
      chat: { id: 1001, type: 'private' as const },
      from: { id: 9001, first_name: 'User' },
      message: {
        message_id: 79,
        contact: { phone_number: '998901234567' },
      },
      telegram: {},
    } as any;

    const forwardSpy = jest.spyOn(localBot as any, 'forwardAll').mockResolvedValue(undefined);

    await localBot.onContact(ctx);

    expect(forwardSpy).toHaveBeenCalledWith(
      ctx,
      '+998901234567',
      expect.objectContaining({
        chatId: 1001,
        text: 'Gulistondan kamsamolga taxi bormi',
        sourceMessageId: 77,
        phoneMessageId: 79,
        promptMessageId: 88,
      }),
    );
    expect((localBot as any).pendingPhoneOrders.has('1001:9001')).toBe(false);
  });
});
