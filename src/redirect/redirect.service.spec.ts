import { RedirectService } from './redirect.service';

describe('RedirectService', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    jest.restoreAllMocks();
  });

  it('uses database redirects by default', async () => {
    delete process.env.SINGLE_REDIRECT_CHAT_ID;

    const findMany = jest.fn().mockResolvedValue([{ chatId: '-1001', title: 'Test', isActive: true }]);
    const service = new RedirectService({
      redirectGroup: {
        findMany,
      },
    } as any);

    const groups = await service.getActiveGroups();

    expect(findMany).toHaveBeenCalledWith({ where: { isActive: true } });
    expect(groups).toEqual([{ chatId: '-1001', title: 'Test', isActive: true }]);
  });

  it('uses a single fixed redirect when chat id is provided', async () => {
    process.env.SINGLE_REDIRECT_CHAT_ID = '-1003872057304';

    const findMany = jest.fn();
    const service = new RedirectService({
      redirectGroup: {
        findMany,
      },
    } as any);

    const groups = await service.getActiveGroups();

    expect(findMany).not.toHaveBeenCalled();
    expect(groups).toEqual([
      expect.objectContaining({
        chatId: '-1003872057304',
        title: '-1003872057304',
        isActive: true,
      }),
    ]);
  });
});
