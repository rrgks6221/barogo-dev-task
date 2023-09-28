import { Beverage } from '../entities/beverage.entity';
import { BeverageRepository } from './beverage.repository';

describe('BeverageRepository', () => {
  describe('findAll', () => {
    it('모든 음료 조회', () => {
      BeverageRepository.findAll().every((beverage) => {
        expect(beverage).toBeInstanceOf(Beverage);
      });
    });
  });

  describe('findOne', () => {
    it('존재하는 음료 조회', () => {
      expect(BeverageRepository.findOneById(1)).toBeInstanceOf(Beverage);
    });

    it('존재하지 않는 음료 조회', () => {
      expect(BeverageRepository.findOneById(-1)).toBeNull();
    });
  });
});
