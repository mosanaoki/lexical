import type { Message } from '../App'
import styles from './MessageBubble.module.css'

interface Props {
  message: Message
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBubble({ message }: Props) {
  const isMe = message.sender === 'me'

  return (
    <div className={`${styles.wrapper} ${isMe ? styles.wrapperMe : styles.wrapperOther}`}>
      {!isMe && <div className={styles.avatar}>L</div>}
      <div className={styles.content}>
        <div className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleOther} ${message.imageUrl ? styles.bubbleImage : ''}`}>
          {message.imageUrl ? (
            <img
              src={message.imageUrl}
              alt="送信画像"
              className={styles.messageImage}
            />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{message.text}</span>
          )}
        </div>
        <span className={`${styles.time} ${isMe ? styles.timeMe : ''}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
