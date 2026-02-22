import { useState } from 'react'
import './App.css'

interface Review {
  source: string
  rating?: number
  comment: string
}

interface Spot {
  id: string
  name: string
  nameEn: string
  category: string
  description: string
  photos: { url: string; caption: string }[]
  mapUrl: string
  websiteUrl?: string
  address: string
  tags: string[]
  reviews: Review[]
  openHours: string
  area: string
}

const spots: Spot[] = [
  {
    id: 'king-castle',
    name: 'キングキャッスル',
    nameEn: 'King Castle',
    category: 'ゴーゴーバー',
    description:
      'パッポン通りに位置する老舗ゴーゴーバー。1970年代から続く歴史ある店で、バンコクのナイトライフを象徴するスポット。キングキャッスル1・2・3が並んでいる。周辺にはナイトマーケットも広がり、観光のついでに立ち寄れる。',
    photos: [
      {
        url: 'https://picsum.photos/seed/patpong-night-1/900/560',
        caption: 'パッポン通り夜景',
      },
      {
        url: 'https://picsum.photos/seed/kingcastle-bar-2/900/560',
        caption: 'バー内部の雰囲気',
      },
      {
        url: 'https://picsum.photos/seed/patpong-market-3/900/560',
        caption: '周辺のナイトマーケット',
      },
    ],
    mapUrl: 'https://maps.google.com/?q=King+Castle+Go+Go+Bar+Patpong+Bangkok',
    address: 'Patpong 1 Rd, Silom, Bang Rak, Bangkok 10500',
    tags: ['ゴーゴーバー', 'パッポン', 'ナイトライフ', '老舗'],
    openHours: '21:00 〜 02:00',
    area: 'パッポン / シーロム',
    reviews: [
      {
        source: 'TripAdvisor',
        rating: 4,
        comment:
          '観光名所として有名。パッポンの中でも特に歴史のある老舗バー。初めてでも入りやすい雰囲気で、観光客にも親切。',
      },
      {
        source: 'Google Maps',
        rating: 4,
        comment:
          'パッポンで一番有名な店の一つ。周辺のナイトマーケットと合わせて楽しめる。入場は無料で、ドリンクは200〜300バーツ程度。',
      },
      {
        source: '旅行ブログ「バンコク夜遊び案内」',
        comment:
          'パッポン散策の際には必ず立ち寄りたいスポット。歴史ある雰囲気と活気あるショーが楽しめる。カバーチャージなし。',
      },
    ],
  },
  {
    id: 'nana-plaza',
    name: 'ナナプラザ',
    nameEn: 'Nana Entertainment Plaza (NEP)',
    category: 'エンターテイメント複合施設',
    description:
      'スクンビット通りソイ4に位置する3階建てのエンターテイメント複合施設。バンコク最大のゴーゴーバー集積地で、約30軒以上の店舗が入居。世界中からバックパッカーや旅行者が訪れる有名スポット。周辺にはホテルや飲食店も多く便利。',
    photos: [
      {
        url: 'https://picsum.photos/seed/nana-plaza-exterior-1/900/560',
        caption: 'ナナプラザ外観（夜）',
      },
      {
        url: 'https://picsum.photos/seed/nana-entertainment-2/900/560',
        caption: '中庭の様子',
      },
      {
        url: 'https://picsum.photos/seed/sukhumvit-soi4-3/900/560',
        caption: 'スクンビット ソイ4 入口',
      },
      {
        url: 'https://picsum.photos/seed/nana-bars-4/900/560',
        caption: '各フロアのバー',
      },
    ],
    mapUrl: 'https://maps.google.com/?q=Nana+Entertainment+Plaza+Sukhumvit+Bangkok',
    websiteUrl: 'https://www.nanaentertainmentplaza.com/',
    address: '3 Sukhumvit Soi 4, Khlong Toei, Bangkok 10110',
    tags: ['ゴーゴーバー', 'スクンビット', 'ナイトライフ', '複合施設', '観光名所'],
    openHours: '18:00 〜 02:00',
    area: 'スクンビット / ナナ',
    reviews: [
      {
        source: 'Lonely Planet',
        rating: 5,
        comment:
          'バンコクのナイトライフを代表する場所。3階建ての施設に多数のバーが集まり、世界中から旅行者が訪れる。活気があり、雰囲気は圧倒的。',
      },
      {
        source: 'Bangkok Nightlife Guide',
        rating: 4,
        comment:
          '清潔で安全な雰囲気。初めてバンコクのナイトライフを体験する人にもおすすめ。入場料無料で各バーのドリンク代のみ。',
      },
      {
        source: 'TripAdvisor',
        rating: 4,
        comment:
          'スクンビット駅（BTS）から徒歩数分で非常にアクセスが良い。周辺のフードスタンドも充実しており、食事も楽しめる。',
      },
      {
        source: '口コミ（個人ブログ）',
        comment:
          "毎晩多くの人で賑わう。G スポット、Spanky's など有名店が揃っている。初訪問はナナプラザから始めるのがバンコクナイトライフの定番ルート。",
      },
    ],
  },
  {
    id: 'bradbury',
    name: 'BRADBURY（うるさいマッサージ）',
    nameEn: 'BRADBURY - Immersive Entertainment Massage',
    category: 'エンタメマッサージ',
    description:
      '「世界一うるさいマッサージ店！」がキャッチフレーズ。映像・ショー・音楽を組み合わせた没入型エンターテイメントマッサージ。マッサージを受けながら別世界を体験できる唯一無二のスポット。来店プレゼント（オリジナルフォト・ソフトクリーム・サンダル）も嬉しい。',
    photos: [
      {
        url: 'https://picsum.photos/seed/bradbury-massage-1/900/560',
        caption: 'BRADBURY 店内の雰囲気',
      },
      {
        url: 'https://picsum.photos/seed/bradbury-show-2/900/560',
        caption: 'エンターテイメントショー',
      },
      {
        url: 'https://picsum.photos/seed/bradbury-ekkamai-3/900/560',
        caption: 'エカマイ店舗外観',
      },
    ],
    mapUrl: 'https://maps.google.com/?q=BRADBURY+Sukhumvit+61+Bangkok',
    websiteUrl: 'https://brad-bury.com/',
    address: '6 Sukhumvit 61, Khlong Tan Nuea, Watthana, Bangkok 10110',
    tags: ['マッサージ', 'エンタメ', 'エカマイ', '没入体験', 'フォトスポット'],
    openHours: '12:00 〜 24:00（23:00 ラストコール）',
    area: 'エカマイ / スクンビット',
    reviews: [
      {
        source: '公式サイト',
        rating: 5,
        comment:
          '世界一うるさいマッサージ店！映像と音楽の中でマッサージを受ける新感覚体験。フット＆ショルダー60分 1,500バーツ、4ハンドマッサージ 1,800バーツ。',
      },
      {
        source: '口コミ',
        rating: 5,
        comment:
          '来店プレゼントが豪華（オリジナルフォト、ソフトクリームまたはアイシー、サンダルのお土産付き）。40席あり、予約はLINE・Instagram・公式サイトから可能。',
      },
      {
        source: 'SNS',
        rating: 4,
        comment:
          'BTS エカマイ駅からアクセス可能。カード（VISA/Master）、QR決済、現金OK。駐車場はメジャーエカマイを利用。',
      },
    ],
  },
  {
    id: 'ayutthaya',
    name: 'アユタヤ遺跡',
    nameEn: 'Ayutthaya Historical Park',
    category: '世界遺産',
    description:
      '1991年にユネスコ世界遺産に登録されたタイの古都アユタヤの遺跡群。1351年から1767年まで約400年間アユタヤ王朝の首都として栄えた歴史ある街。巨大な仏塔や寺院遺跡が点在し、木の根に取り込まれた仏頭で有名なワット・マハタートなど見どころ満載。バンコクから北へ約80km、日帰りツアーが定番。',
    photos: [
      {
        url: 'https://picsum.photos/seed/ayutthaya-temple-1/900/560',
        caption: 'ワット・マハタート（木の根の仏頭）',
      },
      {
        url: 'https://picsum.photos/seed/ayutthaya-ruins-2/900/560',
        caption: 'ワット・プラシーサンペット',
      },
      {
        url: 'https://picsum.photos/seed/ayutthaya-pagoda-3/900/560',
        caption: '巨大仏塔群',
      },
      {
        url: 'https://picsum.photos/seed/ayutthaya-sunset-4/900/560',
        caption: '夕暮れの遺跡',
      },
    ],
    mapUrl: 'https://maps.google.com/?q=Ayutthaya+Historical+Park+Thailand',
    address: 'Phra Nakhon Si Ayutthaya, Thailand 13000',
    tags: ['世界遺産', 'UNESCO', '遺跡', '寺院', '日帰り旅行'],
    openHours: '08:00 〜 18:00',
    area: 'アユタヤ（バンコクから北80km）',
    reviews: [
      {
        source: 'TripAdvisor',
        rating: 5,
        comment:
          'タイ旅行で必ず訪れるべき世界遺産。バンコクから電車で約1.5時間、ツアーバスで約1時間。遺跡をレンタサイクルで回るのがおすすめ。',
      },
      {
        source: 'Lonely Planet',
        rating: 5,
        comment:
          '圧倒的なスケールの遺跡群。特にワット・マハタートの木の根に埋もれた仏頭は必見。入場料は各寺院50バーツ程度と手頃。',
      },
      {
        source: 'Google Maps',
        rating: 4,
        comment:
          '半日あれば主要な遺跡は回れる。暑いので日焼け止めと水は必須。象に乗って遺跡巡りもできる。',
      },
    ],
  },
  {
    id: 'marinchuru',
    name: 'まりんちゅーる',
    nameEn: 'Marinchuru',
    category: 'ガールズバー',
    description:
      '大阪にあるガールズバー「まりんちゅーる」。タイではないが、旅の前後に立ち寄りたい一軒。明るくアットホームな雰囲気で、スタッフとの会話が楽しい。海をテーマにした内装が特徴的。',
    photos: [
      {
        url: 'https://picsum.photos/seed/marinchuru-bar-1/900/560',
        caption: 'まりんちゅーる 店内',
      },
      {
        url: 'https://picsum.photos/seed/marinchuru-osaka-2/900/560',
        caption: '大阪の夜',
      },
    ],
    mapUrl: 'https://maps.google.com/?q=まりんちゅーる+大阪',
    address: '大阪府大阪市',
    tags: ['ガールズバー', '大阪', 'バー', 'アットホーム'],
    openHours: '要確認',
    area: '大阪（番外編）',
    reviews: [
      {
        source: '口コミ',
        rating: 5,
        comment: 'スタッフが明るくてフレンドリー。海をテーマにした内装がかわいい。タイ旅行の前後に寄りたいお気に入りの一軒。',
      },
    ],
  },
  {
    id: 'thermae-cafe',
    name: 'テーメーカフェ',
    nameEn: 'Thermae Cafe',
    category: 'カフェ / バー',
    description:
      'スクンビット通りソイ13近くにある伝説的なカフェバー。1970年代から続く老舗で、バンコクのディープな夜文化を象徴するスポット。深夜まで営業しており、地元の人から旅行者まで幅広い客層が集まる。バンコクのナイトライフの歴史を語る上で欠かせない場所。',
    photos: [
      {
        url: 'https://picsum.photos/seed/thermae-cafe-1/900/560',
        caption: 'テーメーカフェ外観',
      },
      {
        url: 'https://picsum.photos/seed/thermae-night-2/900/560',
        caption: '夜の雰囲気',
      },
      {
        url: 'https://picsum.photos/seed/sukhumvit-13-3/900/560',
        caption: 'スクンビット周辺',
      },
    ],
    mapUrl: 'https://maps.google.com/?q=Thermae+Cafe+Sukhumvit+Bangkok',
    address: 'Sukhumvit Rd, Khlong Toei Nuea, Watthana, Bangkok 10110',
    tags: ['カフェ', 'バー', 'スクンビット', 'ナイトライフ', '老舗'],
    openHours: '18:00 〜 深夜',
    area: 'スクンビット / ナナ',
    reviews: [
      {
        source: 'TripAdvisor',
        rating: 4,
        comment:
          'バンコクで最も歴史のあるナイトスポットの一つ。1970年代から変わらない独特の雰囲気。ドリンクは手頃な価格。',
      },
      {
        source: '旅行ブログ',
        rating: 3,
        comment:
          'ディープなバンコクを体験したい人向け。ナナ駅（BTS）から徒歩圏内でアクセス良好。好みは分かれるが、一度は訪れる価値あり。',
      },
      {
        source: '口コミ',
        comment:
          '他では味わえないローカルな雰囲気。ビールは100バーツ前後でリーズナブル。深夜以降が本番。',
      },
    ],
  },
]

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="star-rating" aria-label={`${rating}/${max}点`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </span>
  )
}

function PhotoCarousel({ photos }: { photos: Spot['photos'] }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length)
  const next = () => setCurrent((c) => (c + 1) % photos.length)

  return (
    <div className="carousel">
      <div className="carousel-image-wrapper">
        <img
          src={photos[current].url}
          alt={photos[current].caption}
          className="carousel-image"
        />
        <div className="carousel-caption">{photos[current].caption}</div>
        {photos.length > 1 && (
          <>
            <button className="carousel-btn prev" onClick={prev} aria-label="前の写真">
              ‹
            </button>
            <button className="carousel-btn next" onClick={next} aria-label="次の写真">
              ›
            </button>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="carousel-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`写真 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="spot-card">
      <PhotoCarousel photos={spot.photos} />

      <div className="spot-info">
        <div className="spot-header">
          <div>
            <span className="spot-category">{spot.category}</span>
            <h2 className="spot-name">{spot.name}</h2>
            <p className="spot-name-en">{spot.nameEn}</p>
          </div>
          <div className="spot-area-badge">{spot.area}</div>
        </div>

        <div className="spot-tags">
          {spot.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <p className="spot-description">{spot.description}</p>

        <div className="spot-meta">
          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span>{spot.address}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🕐</span>
            <span>{spot.openHours}</span>
          </div>
        </div>

        <div className="spot-links">
          <a href={spot.mapUrl} target="_blank" rel="noopener noreferrer" className="link-btn map-btn">
            📍 Google Maps で開く
          </a>
          {spot.websiteUrl && (
            <a href={spot.websiteUrl} target="_blank" rel="noopener noreferrer" className="link-btn web-btn">
              🌐 公式サイト
            </a>
          )}
        </div>

        <section className="reviews-section">
          <h3 className="reviews-title">評判・口コミ</h3>
          <div className="reviews-list">
            {spot.reviews.map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <span className="review-source">{review.source}</span>
                  {review.rating !== undefined && (
                    <StarRating rating={review.rating} />
                  )}
                </div>
                <p className="review-comment">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-flag">🇹🇭</div>
          <div>
            <h1 className="header-title">タイ旅行</h1>
            <p className="header-subtitle">Bangkok Travel Itinerary</p>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="spots-container">
          {spots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <p>タイ旅行 🇹🇭 バンコク旅行しおり</p>
      </footer>
    </div>
  )
}
