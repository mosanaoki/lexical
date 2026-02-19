import { useEffect, useRef } from 'react'
import type { Message } from '../App'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'
import styles from './ChatWindow.module.css'

interface Props {
  messages: Message[]
  onSend: (text: string) => void
  onSendImage: (imageUrl: string) => void
}

export default function ChatWindow({ messages, onSend, onSendImage }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatar}>L</div>
        <div className={styles.headerInfo}>
          <span className={styles.name}>Lexical Chat</span>
          <span className={styles.status}>オンライン</span>
        </div>
      </header>

      <main className={styles.messageList}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </main>

      <footer className={styles.footer}>
        <ChatInput onSend={onSend} onSendImage={onSendImage} />
      </footer>
    </div>
  )
}
