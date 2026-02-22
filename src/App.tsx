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
            <h1 className="header-title">バンコク旅行しおり</h1>
            <p className="header-subtitle">Bangkok Travel Itinerary 2025</p>
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
        <p>バンコク旅行 🇹🇭 楽しい旅を！</p>
      </footer>
    </div>
  )
}
