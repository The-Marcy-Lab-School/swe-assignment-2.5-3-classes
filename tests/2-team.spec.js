const { Player, Team } = require('../src/2-team');

describe('Problem 2: Composition - Team and Player', () => {

  describe('Player class', () => {
    test('Player constructor sets name, position, and jerseyNumber', () => {
      const player = new Player("LeBron James", "Forward", 23);
      expect(player.name).toBe("LeBron James");
      expect(player.position).toBe("Forward");
      expect(player.jerseyNumber).toBe(23);
    });

    test('Player properties are publicly accessible', () => {
      const player = new Player("Stephen Curry", "Guard", 30);
      expect(player.name).toBe("Stephen Curry");
      expect(player.position).toBe("Guard");
      expect(player.jerseyNumber).toBe(30);
    });
  });

  describe('Team class', () => {
    let team;
    let player1, player2, player3, player4;

    beforeEach(() => {
      team = new Team("All Stars");
      player1 = new Player("LeBron James", "Forward", 23);
      player2 = new Player("Stephen Curry", "Guard", 30);
      player3 = new Player("Kevin Durant", "Forward", 35);
      player4 = new Player("Anthony Davis", "Center", 3);
    });

    test('Team constructor sets name', () => {
      expect(team.name).toBe("All Stars");
    });

    test('Team starts with empty starters and bench arrays', () => {
      const starters = team.getStarters ? team.getStarters() : team.starters;
      const bench = team.getBench ? team.getBench() : team.bench;
      expect(starters).toEqual([]);
      expect(bench).toEqual([]);
    });

    describe('addBenchPlayer()', () => {
      test('addBenchPlayer() adds a player to the bench', () => {
        team.addBenchPlayer(player1);
        const bench = team.getBench ? team.getBench() : team.bench;
        expect(bench).toContain(player1);
        expect(bench.length).toBe(1);
      });

      test('addBenchPlayer() can add multiple players', () => {
        team.addBenchPlayer(player1);
        team.addBenchPlayer(player2);
        team.addBenchPlayer(player3);
        const bench = team.getBench ? team.getBench() : team.bench;
        expect(bench.length).toBe(3);
        expect(bench).toContain(player1);
        expect(bench).toContain(player2);
        expect(bench).toContain(player3);
      });
    });

    describe('getPlayerCount()', () => {
      test('getPlayerCount() returns 0 for empty team', () => {
        expect(team.getPlayerCount()).toBe(0);
      });

      test('getPlayerCount() returns total players on bench', () => {
        team.addBenchPlayer(player1);
        team.addBenchPlayer(player2);
        expect(team.getPlayerCount()).toBe(2);
      });

      test('getPlayerCount() returns total of starters + bench', () => {
        team.addBenchPlayer(player1);
        team.addBenchPlayer(player2);
        team.addBenchPlayer(player3);
        team.moveToStarters("LeBron James");
        expect(team.getPlayerCount()).toBe(3);
      });
    });

    describe('moveToStarters()', () => {
      beforeEach(() => {
        team.addBenchPlayer(player1);
        team.addBenchPlayer(player2);
        team.addBenchPlayer(player3);
      });

      test('moveToStarters() moves player from bench to starters', () => {
        const result = team.moveToStarters("LeBron James");
        expect(result).toBe(true);

        const starters = team.getStarters ? team.getStarters() : team.starters;
        const bench = team.getBench ? team.getBench() : team.bench;

        expect(starters).toContain(player1);
        expect(bench).not.toContain(player1);
      });

      test('moveToStarters() returns false if player not on bench', () => {
        const result = team.moveToStarters("Michael Jordan");
        expect(result).toBe(false);
      });

      test('moveToStarters() returns false if player is already in starters', () => {
        team.moveToStarters("LeBron James");
        const result = team.moveToStarters("LeBron James");
        expect(result).toBe(false);
      });

      test('moveToStarters() can move multiple players', () => {
        team.moveToStarters("LeBron James");
        team.moveToStarters("Stephen Curry");

        const starters = team.getStarters ? team.getStarters() : team.starters;
        expect(starters.length).toBe(2);
        expect(starters).toContain(player1);
        expect(starters).toContain(player2);
      });
    });

    describe('moveToBench()', () => {
      beforeEach(() => {
        team.addBenchPlayer(player1);
        team.addBenchPlayer(player2);
        team.moveToStarters("LeBron James");
        team.moveToStarters("Stephen Curry");
      });

      test('moveToBench() moves player from starters to bench', () => {
        const result = team.moveToBench("Stephen Curry");
        expect(result).toBe(true);

        const starters = team.getStarters ? team.getStarters() : team.starters;
        const bench = team.getBench ? team.getBench() : team.bench;

        expect(bench).toContain(player2);
        expect(starters).not.toContain(player2);
      });

      test('moveToBench() returns false if player not in starters', () => {
        const result = team.moveToBench("Michael Jordan");
        expect(result).toBe(false);
      });

      test('moveToBench() returns false if player is on bench', () => {
        team.moveToBench("Stephen Curry");
        const result = team.moveToBench("Stephen Curry");
        expect(result).toBe(false);
      });
    });

    describe('getStarters() and getBench()', () => {
      test('getStarters() returns the starters array', () => {
        team.addBenchPlayer(player1);
        team.moveToStarters("LeBron James");

        const starters = team.getStarters ? team.getStarters() : team.starters;
        expect(starters).toContain(player1);
      });

      test('getBench() returns the bench array', () => {
        team.addBenchPlayer(player1);

        const bench = team.getBench ? team.getBench() : team.bench;
        expect(bench).toContain(player1);
      });
    });

    describe('Integration: Full roster management', () => {
      test('Complete workflow: add players, move to starters, move back to bench', () => {
        // Add all players to bench
        team.addBenchPlayer(player1);
        team.addBenchPlayer(player2);
        team.addBenchPlayer(player3);
        team.addBenchPlayer(player4);
        expect(team.getPlayerCount()).toBe(4);

        // Move some to starters
        team.moveToStarters("LeBron James");
        team.moveToStarters("Stephen Curry");

        let starters = team.getStarters ? team.getStarters() : team.starters;
        let bench = team.getBench ? team.getBench() : team.bench;
        expect(starters.length).toBe(2);
        expect(bench.length).toBe(2);

        // Move one back to bench
        team.moveToBench("Stephen Curry");

        starters = team.getStarters ? team.getStarters() : team.starters;
        bench = team.getBench ? team.getBench() : team.bench;
        expect(starters.length).toBe(1);
        expect(bench.length).toBe(3);

        // Total count remains the same
        expect(team.getPlayerCount()).toBe(4);
      });
    });
  });
});

