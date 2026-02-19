import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import './App.css'

export interface Message {
  id: number
  sender: 'me' | 'other'
  timestamp: Date
  // テキストか画像のどちらか
  text?: string
  imageUrl?: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: 'こんにちは！Lexicalエディタのデモです。',
    sender: 'other',
    timestamp: new Date(Date.now() - 60000 * 5),
  },
  {
    id: 2,
    text: 'メッセージを入力してEnterまたは送信ボタンを押してみてください。\nCtrl+V で画像を貼り付けることもできます。',
    sender: 'other',
    timestamp: new Date(Date.now() - 60000 * 2),
  },
]

export default function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)

  const addMyMessage = (msg: Omit<Message, 'id' | 'sender' | 'timestamp'>) => {
    const newMsg: Message = {
      id: Date.now(),
      sender: 'me',
      timestamp: new Date(),
      ...msg,
    }
    setMessages((prev) => [...prev, newMsg])

    // 自動返信（デモ用）
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: msg.imageUrl ? '画像を受け取りました！' : `「${msg.text}」を受け取りました！`,
          sender: 'other',
          timestamp: new Date(),
        },
      ])
    }, 800)
  }

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    addMyMessage({ text: trimmed })
  }

  const handleSendImage = (imageUrl: string) => {
    addMyMessage({ imageUrl })
  }

  return (
    <ChatWindow
      messages={messages}
      onSend={handleSend}
      onSendImage={handleSendImage}
    />
  )
}
