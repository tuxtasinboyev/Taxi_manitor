import { BotUpdate } from './bot.update';

const FULL_REAL_ORDER_SAMPLES = [
  'Камсамолдан гулистонга такси керак',
  "Assalomu alaykum 5 mavzedan lelinga toy ortish kerak",
  'Гулистондан камсамолга срочна почта бор',
  'Камсамолдан гулистонга битта одам бор',
  'Kamsamoldan Gulistonga 1kishi bor',
  'Ассалому алайкум Гулистонга 2 киши бор',
  'Shaxoda slayd qilish:\nKamsamoldan gulistonga 1kishi bor',
  'Gulistondan toshkenga zakazga moshina kk',
  'Toshkentdan kamsamolga taksi kk',
  '🍃:\nGulistondan kamsamolga 1 kiwi bor',
  'Гулистонга 1киши бор',
  "Assalomu alaykum 3 mavzega dastavka bor yo'lkira 15 ming",
  'Gulistonga 1 ta odam bor',
  'Elyor Bekmuradov:\nGulistonga 10 ta odam bor \n2 ta moshin bolishi kerak 880241208',
  'Kamsamolda. Gulistonga bir kishi bor',
  'Assalomu aleykum,kamsamoldan toshkentga 2 kishi soat 7:30 ga',
  'Гулистонга 1 кши срочна',
  'Шахарга бир киши',
  'Toshkentdan Kamsamolga taksi bormi hozrga?',
  'Kamsamoldan ped instutgacha taksi bormi',
  'Kamsamoldan 4 mavzedaga 2 kishi bor 15 m dan beramiz 94 588 78 26',
  'Гулистондан камсамолга 1киши бор',
  'тошкендан камсамолга такси борми',
  'Гулистонга Бир киши',
  'Gulistondan kamsamolga taxi bormi srochna zakazga 40 ming beraman',
  'Kamsamo‘ldan gulistonga 2kishimiz',
  'Gulistonga taksi kerak',
  'Gulistondan kamsamolga 1 kishi',
  'Oktyabrdan 2 kishi bor',
  'Kamsamoldan gulistonga 1 kishi',
  '3микрайондан камсамолга 1киши',
  'Эртага эрталабга тошкенга битта одам бор',
  'Gulistondan Kamsamolga 1 kiwi',
  'Шахарга икки киши',
  'Gulistondan kamsamolga bosh moshin kerak zakaz',
  'Kamsamoldan oktyabrga moshina kerak',
  'Taki kerk ertlabga toshkenga',
  'Kamsamolga taksi kerak 1 kishi bor',
  'Assalomu alekum va rahmatulloh jilgaradokda 1 kishi bor kamsamolga',
  'Gulistondan kamsamolga 2 kishi',
  'Ertaga Toshkentga Mashina kerak',
  'Kamsamoldan gulistonga bosh moshin kerak zakaz',
  '🌸bonucha🌸:\nToshkentdan kamsamolga 1 kishi bor',
  'Gulistondan kamsamolga 1ta odam\n906890308',
  "Gulistondan kamsamolga bo'sh moshina kerak",
  '2317:\n3дан камсамолга заказ машина кк',
  'Kamsomoldan Guliston 1 odam bor',
  'Ассалому алейкум хозирга кетаётган такси борми Юлдузга почта бор 88 172 82 83',
  'Guliston saxovatni oldi tomondida kamsamolga 1kishi bor\n50 187 86 27',
  'Gulistondan kamsamolga taxi kerak 331038233',
  'Kamsamoldan Toshkentga taksi kk 1kishi 2yarmlarga',
  'Kechqurun 22:00. 23:00 larda kelesdan gulistonga 1 kishi bor',
  'Тошкентга кетадиган мошин борми',
  'Kamsamolga taksi kk 2 ta odam bor 4 mavzedan olish kk',
  'Islom Nusratullayev:\nКамсамолдан Гулистонга 2 киши бор вокзалгача 94 4734535',
  'Эрталаб 5:00 га тошкентга 1 кищи бор',
  'Kamsamoldan toshkentga 1kishi bor',
  'Gulistonga bir kishi  bor',
  'Dilorom:\nToshkentdan kelayotgan taksi kerak\n\n99 462 93 19Dilorom:\nToshkentdan kelayotgan taksi kerak\n\n99 462 93 19',
  'Тошкетндан гулистонга 1 киши',
  '12 ларда тошкентга 1 кищи бор',
  'Эртага 10 ларга тошкентга 1 кищи бор',
  'Камсамолдан гулистонг даставка бор',
  "Kamsamo'ldan gulistonga 2 kishi",
  'Kamsamoldan oktyabrga 1 kishi bor',
  'Тошкентга буш машина керак',
  'Gulstondan kamsamolga 2 kiwi bor',
  'Gulistondan kamsamolga 2 kishi',
  'гулистондан камсамолга 1киши бор',
  'Ассалому алайкум соат 2 га гулистондан тошкентга 1 та одамга такси кк',
  'Эртага эрталаб соат 6 га гулистондан тошкентга 1 кишига такси кк',
  'Towkendan gulistonga pochta bor',
  'Kamsamoldan gulistonga universitetga bir odam bor',
  'Камсамолда гулистонга 1 киш бор',
  'Toshkendan kamsamolga taksi bormi pochta bor',
  'Shaxarga 1ta odam bor',
  "Kamsamoldan Gulistonga boʻsh taksi kerak ustida bagaji bor boʻlsa yaxshi",
  'Samarqanddan gulistonga 1kiwi',
  '16 00 ga sergilidan baxtga 1 kishi bor 60 000 beradi\n\n+998775247779',
  "Assalom aleykum akalar fargʻonaga linyada qatnedigonla boʻlsa yozvorila 2 ta odam bor edi fargʻonaga bugungalikka",
  'Shaharga 1 kishi bor kamsamolda',
  'Тошкентдан камсамолга бир киши бор',
  'Гулистонга Бир киши бор',
  '2 kishi bor gulistonga',
  'Ассалому алайкум Соат 11 га Тошкентга такси борми',
  'Камсамолдан унивеоситетга 1 та одам бор',
  'Kamsamoldan toshkentga 1 kishi bor',
  'Гулистонга 2 киши',
];

const FULL_REAL_NON_ORDER_SAMPLES = [
  "Omadbek hammasini qo'shing",
  'Towkenga ketadiganlar nomr tawela',
  'Асалому алайкум акалар тошкентга канча буляпди йул кира',
  'Kamsamolda kim bor',
  'Pochta bor ekan',
];

describe('BotUpdate isTaxiOrder', () => {
  const bot = new BotUpdate({} as any, {} as any);
  const isTaxiOrder = (text: string) => (bot as any).isTaxiOrder(text);

  it('accepts the full real-world order list from the user', () => {
    for (const text of FULL_REAL_ORDER_SAMPLES) {
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

  it('rejects chatty messages from the same dump that are not actual orders', () => {
    for (const text of FULL_REAL_NON_ORDER_SAMPLES) {
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
