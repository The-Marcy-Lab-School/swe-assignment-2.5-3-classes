const { MediaItem, Song, Podcast, Audiobook } = require('../src/1-media');

describe('Problem 1: Inheritance and Polymorphism - Media Player', () => {

  describe('Part 1: MediaItem class', () => {
    test('MediaItem constructor sets title and duration', () => {
      const media = new MediaItem("Unknown Media", 180);
      expect(media.title).toBe("Unknown Media");
      expect(media.duration).toBe(180);
    });

    test('MediaItem play() returns correct string', () => {
      const media = new MediaItem("Unknown Media", 180);
      expect(media.play()).toBe("Playing: Unknown Media");
    });

    test('MediaItem getFormattedDuration() formats duration as MM:SS', () => {
      const media1 = new MediaItem("Test", 180);
      expect(media1.getFormattedDuration()).toBe("3:00");

      const media2 = new MediaItem("Test", 354);
      expect(media2.getFormattedDuration()).toBe("5:54");

      const media3 = new MediaItem("Test", 65);
      expect(media3.getFormattedDuration()).toBe("1:05");

      const media4 = new MediaItem("Test", 3600);
      expect(media4.getFormattedDuration()).toBe("60:00");
    });
  });

  describe('Part 2: Song class', () => {
    test('Song extends MediaItem', () => {
      const song = new Song("Bohemian Rhapsody", 354, "Queen");
      expect(song instanceof MediaItem).toBe(true);
    });

    test('Song constructor sets title, duration, and artist', () => {
      const song = new Song("Bohemian Rhapsody", 354, "Queen");
      expect(song.title).toBe("Bohemian Rhapsody");
      expect(song.duration).toBe(354);
      expect(song.artist).toBe("Queen");
    });

    test('Song play() returns overridden string with artist', () => {
      const song = new Song("Bohemian Rhapsody", 354, "Queen");
      expect(song.play()).toBe("Playing: Bohemian Rhapsody by Queen");
    });

    test('Song inherits getFormattedDuration() from MediaItem', () => {
      const song = new Song("Bohemian Rhapsody", 354, "Queen");
      expect(song.getFormattedDuration()).toBe("5:54");
    });
  });

  describe('Part 3: Podcast class', () => {
    test('Podcast extends MediaItem', () => {
      const podcast = new Podcast("Tech Talk", 2400, "Jane Smith", 42);
      expect(podcast instanceof MediaItem).toBe(true);
    });

    test('Podcast constructor sets title, duration, host, and episodeNumber', () => {
      const podcast = new Podcast("Tech Talk", 2400, "Jane Smith", 42);
      expect(podcast.title).toBe("Tech Talk");
      expect(podcast.duration).toBe(2400);
      expect(podcast.host).toBe("Jane Smith");
      expect(podcast.episodeNumber).toBe(42);
    });

    test('Podcast play() returns overridden string with host and episode', () => {
      const podcast = new Podcast("Tech Talk", 2400, "Jane Smith", 42);
      expect(podcast.play()).toBe("Playing: Tech Talk with host Jane Smith, Episode 42");
    });

    test('Podcast inherits getFormattedDuration() from MediaItem', () => {
      const podcast = new Podcast("Tech Talk", 2400, "Jane Smith", 42);
      expect(podcast.getFormattedDuration()).toBe("40:00");
    });
  });

  describe('Part 4: Audiobook class', () => {
    test('Audiobook extends MediaItem', () => {
      const audiobook = new Audiobook("The Great Gatsby", 32400, "F. Scott Fitzgerald", "Jake Gyllenhaal");
      expect(audiobook instanceof MediaItem).toBe(true);
    });

    test('Audiobook constructor sets title, duration, author, and narrator', () => {
      const audiobook = new Audiobook("The Great Gatsby", 32400, "F. Scott Fitzgerald", "Jake Gyllenhaal");
      expect(audiobook.title).toBe("The Great Gatsby");
      expect(audiobook.duration).toBe(32400);
      expect(audiobook.author).toBe("F. Scott Fitzgerald");
      expect(audiobook.narrator).toBe("Jake Gyllenhaal");
    });

    test('Audiobook play() returns overridden string with author and narrator', () => {
      const audiobook = new Audiobook("The Great Gatsby", 32400, "F. Scott Fitzgerald", "Jake Gyllenhaal");
      expect(audiobook.play()).toBe("Playing: The Great Gatsby by F. Scott Fitzgerald, narrated by Jake Gyllenhaal");
    });

    test('Audiobook inherits getFormattedDuration() from MediaItem', () => {
      const audiobook = new Audiobook("The Great Gatsby", 32400, "F. Scott Fitzgerald", "Jake Gyllenhaal");
      expect(audiobook.getFormattedDuration()).toBe("540:00");
    });
  });

  describe('Polymorphism', () => {
    test('Different media types return different play() messages', () => {
      const song = new Song("Bohemian Rhapsody", 354, "Queen");
      const podcast = new Podcast("Tech Talk", 2400, "Jane Smith", 42);
      const audiobook = new Audiobook("The Great Gatsby", 32400, "F. Scott Fitzgerald", "Jake Gyllenhaal");

      const mediaLibrary = [song, podcast, audiobook];
      const playMessages = mediaLibrary.map(media => media.play());

      expect(playMessages).toEqual([
        "Playing: Bohemian Rhapsody by Queen",
        "Playing: Tech Talk with host Jane Smith, Episode 42",
        "Playing: The Great Gatsby by F. Scott Fitzgerald, narrated by Jake Gyllenhaal"
      ]);
    });

    test('All media types are instances of MediaItem', () => {
      const song = new Song("Test", 100, "Artist");
      const podcast = new Podcast("Test", 100, "Host", 1);
      const audiobook = new Audiobook("Test", 100, "Author", "Narrator");

      expect(song instanceof MediaItem).toBe(true);
      expect(podcast instanceof MediaItem).toBe(true);
      expect(audiobook instanceof MediaItem).toBe(true);
    });
  });
});

