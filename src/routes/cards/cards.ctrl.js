import { CardsService } from '../../services/cards/cards.service.js';

const cardsCtrl = {};

cardsCtrl.getCardInfo = (req, res) => {
  const { params } = req;
  const { id } = params;

  const cardsService = new CardsService();
  const cardInfo = cardsService.getCardInfo(id);

  return res.status(200).json(cardInfo);
};

export default cardsCtrl;
