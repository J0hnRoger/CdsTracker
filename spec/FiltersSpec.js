describe('date filters', function() {

  beforeEach(module('app.filters'));

  describe('secondInDecimalDay', function() {

    it('doit retourner un decimal représentant une fraction d\'une journée de 7h',
        inject(function(secondInDecimalDay) {
      expect(secondInDecimalDay(3600)).toBe();
      expect(secondInDecimalDay(false)).toBe('0,1428571428571429');
    }));
  });
});