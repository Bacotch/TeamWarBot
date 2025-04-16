// routes/player.routes.ts
import { Bot } from '../Bot.ts';

export function setupPlayerRoutes(bot: Bot) {
  bot.get('/player/:id', async (req, res) => {
    const playerId = req.params.id;
    // bot オブジェクトを通じて database にアクセス
    const playerInfo = await bot.database.getPlayerInfo(playerId);
    if (playerInfo) {
      return playerInfo;
    } else {
      return res.status(404).send({ message: 'Player not found' });
    }
  });

  bot.post('/player/update', async (req, res) => {
    // 同様に database にアクセス可能
    const updateResult = await bot.database.updatePlayerInfo(req.body);
    return { message: 'Player updated', result: updateResult };
  });
}