import { of } from 'rxjs';

import { Hero } from '../hero';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService: any;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('getHeroes', () => {
    it('should call getHeroes', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));

      component.getHeroes();

      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    });
  });

  describe('add', () => {
    it('should call addHero', () => {
      mockHeroService.addHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.add('BatDude');

      expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: 'BatDude', strength: 11 });
    });
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[1]);

      expect(component.heroes).toEqual([HEROES[0], HEROES[2]]);
    });

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[1]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });
  });
});
