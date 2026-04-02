export interface Song {
  id: string;
  title: string;
  artist: string;
  file: string;
  dedicatedBy: 'gabi' | 'kevin' | 'ambos';
  note: string;
}

export const songs: Song[] = [
  // canciones deGabi
  {
    id: 'boa-duvet',
    title: 'Duvet',
    artist: 'Boa',
    file: '/music/gabi/01. Boa - Duvet.flac',
    dedicatedBy: 'ambos',
    note: 'La cantamos juntos en karaoke siempre <3 — nuestra canción',
  },
  {
    id: 'deftones-sextape',
    title: 'Sextape',
    artist: 'Deftones',
    file: '/music/gabi/08 - Sextape.flac',
    dedicatedBy: 'gabi',
    note: '',
  },
  {
    id: 'bjork-come-to-me',
    title: 'Come to Me',
    artist: 'Bjork',
    file: '/music/gabi/09 - Come To Me .mp3',
    dedicatedBy: 'gabi',
    note: 'Cada vez que la escucho pienso en ti',
  },
  {
    id: 'air-playground',
    title: 'Playground Love',
    artist: 'AIR (feat. Gordon Tracks)',
    file: '/music/gabi/AIR - Playground Love (feat. Gordon Tracks) (from The Virgin Suicides OST - Official Audio).mp3',
    dedicatedBy: 'gabi',
    note: 'La primera cancion que me dedicastes, te amo :3',
  },
  {
    id: 'deftones-entombed',
    title: 'Entombed',
    artist: 'Deftones',
    file: '/music/gabi/Deftones - Entombed [67oBykAKUuk].mp3',
    dedicatedBy: 'gabi',
    note: 'On more time',
  },
  {
    id: 'luvcat-man',
    title: "He's My Man",
    artist: 'Luvcat',
    file: '/music/gabi/Luvcat - He\'s My Man.mp3',
    dedicatedBy: 'gabi',
    note: 'Dulce y directa, como tú cuando eres honesta',
  },
  {
    id: 'yumi-arai',
    title: 'Nanimo Kikanaide',
    artist: 'Yumi Arai',
    file: '/music/gabi/Yumi Arai - Nanimo Kikanaide (Don\'t ask me anythingもきかないで ) [Sub english] [Sub español] [eIMIprG2nWc].mp3',
    dedicatedBy: 'gabi',
    note: '',
  },
  // canciones de Kevin
  {
    id: 'fontaines-love',
    title: 'Love You',
    artist: 'Fontaines D.C.',
    file: '/music/kevin/Fontains DC - Love You.mp3',
    dedicatedBy: 'kevin',
    note: 'Simple y real — así te quiero',
  },
  {
    id: 'owl-city-enchanted',
    title: 'Enchanted',
    artist: 'Owl City',
    file: '/music/kevin/Owl City - Enchanted.mp3',
    dedicatedBy: 'kevin',
    note: 'Así me sentí la primera vez que te vi :3',
  },
  {
    id: 'righteous-unchained',
    title: 'Unchained Melody',
    artist: 'The Righteous Brothers',
    file: '/music/kevin/The Rigthteous Brother - Unchained Melody.mp3',
    dedicatedBy: 'kevin',
    note: 'Clásica y sin tiempo, como lo que siento',
  },
  {
    id: 'pillows-patricia',
    title: 'Patricia',
    artist: 'The Pillows',
    file: '/music/kevin/The pillows - Patricia.flac',
    dedicatedBy: 'kevin',
    note: 'Las ALMOHADAS plasmaron lo que siento por ti en una cancion',
  },
  {
    id: 'vansire-nice',
    title: 'Nice to See You',
    artist: 'Vansire (ft. Floor Cry)',
    file: '/music/kevin/Vansire - Nice to See You (ft. Floor Cry).mp3',
    dedicatedBy: 'kevin',
    note: 'Cada vez que te veo es como la primera vez',
  },
  {
    id: 'chevy-sweet',
    title: 'Sweet Boi',
    artist: 'Chevy',
    file: '/music/kevin/chevy - sweet boi.mp3',
    dedicatedBy: 'kevin',
    note: 'Eres la cosa más dulce de mi vida',
  },
];
