import { useCallback, useEffect, useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical'
import styles from './ChatInput.module.css'

// エディタの内容を送信してクリアする共通フック
function useSendText(onSend: (text: string) => void) {
  const [editor] = useLexicalComposerContext()

  return useCallback(() => {
    editor.getEditorState().read(() => {
      const text = $getRoot().getTextContent().trim()
      if (!text) return

      onSend(text)

      editor.update(() => {
        const root = $getRoot()
        root.clear()
        const paragraph = $createParagraphNode()
        paragraph.append($createTextNode(''))
        root.append(paragraph)
      })
    })
  }, [editor, onSend])
}

// Enter キーで送信するプラグイン（Shift+Enter は改行）
function KeyboardPlugin({ onSend }: { onSend: (text: string) => void }) {
  const [editor] = useLexicalComposerContext()
  const sendText = useSendText(onSend)

  useEffect(() => {
    return editor.registerRootListener((rootElement, prevRootElement) => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
          e.preventDefault()
          sendText()
        }
      }

      if (prevRootElement) {
        prevRootElement.removeEventListener('keydown', handler)
      }
      if (rootElement) {
        rootElement.addEventListener('keydown', handler)
      }
    })
  }, [editor, sendText])

  return null
}

// クリップボードから画像を貼り付けるプラグイン
function ClipboardPastePlugin({
  onPasteImage,
}: {
  onPasteImage: (imageUrl: string) => void
}) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerRootListener((rootElement, prevRootElement) => {
      const handler = (e: ClipboardEvent) => {
        const items = e.clipboardData?.items
        if (!items) return

        for (const item of items) {
          if (item.type.startsWith('image/')) {
            e.preventDefault()
            const file = item.getAsFile()
            if (!file) continue

            const url = URL.createObjectURL(file)
            onPasteImage(url)
            break
          }
        }
      }

      if (prevRootElement) {
        prevRootElement.removeEventListener('paste', handler as EventListener)
      }
      if (rootElement) {
        rootElement.addEventListener('paste', handler as EventListener)
      }
    })
  }, [editor, onPasteImage])

  return null
}

// 送信ボタンプラグイン
function SendButtonPlugin({ onSend }: { onSend: (text: string) => void }) {
  const sendText = useSendText(onSend)

  return (
    <button className={styles.sendButton} onClick={sendText} title="送信 (Enter)">
      <SendIcon />
    </button>
  )
}

interface Props {
  onSend: (text: string) => void
  onSendImage: (imageUrl: string) => void
}

const theme = {
  paragraph: styles.editorParagraph,
}

export default function ChatInput({ onSend, onSendImage }: Props) {
  // 貼り付け中の画像プレビュー（送信前の確認用）
  const [pendingImage, setPendingImage] = useState<string | null>(null)

  const handlePasteImage = useCallback(
    (imageUrl: string) => {
      setPendingImage(imageUrl)
    },
    [],
  )

  const handleSendPendingImage = useCallback(() => {
    if (!pendingImage) return
    onSendImage(pendingImage)
    setPendingImage(null)
  }, [pendingImage, onSendImage])

  const handleCancelPendingImage = useCallback(() => {
    if (pendingImage) {
      URL.revokeObjectURL(pendingImage)
    }
    setPendingImage(null)
  }, [pendingImage])

  const initialConfig = {
    namespace: 'ChatInput',
    theme,
    onError: (error: Error) => console.error(error),
  }

  return (
    <div className={styles.wrapper}>
      {/* 貼り付け画像のプレビュー */}
      {pendingImage && (
        <div className={styles.imagePreview}>
          <img src={pendingImage} alt="貼り付け画像" className={styles.previewImg} />
          <div className={styles.previewActions}>
            <button
              className={styles.previewSendButton}
              onClick={handleSendPendingImage}
              title="画像を送信"
            >
              送信
            </button>
            <button
              className={styles.previewCancelButton}
              onClick={handleCancelPendingImage}
              title="キャンセル"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <LexicalComposer initialConfig={initialConfig}>
        <div className={styles.container}>
          <div className={styles.editorWrapper}>
            <PlainTextPlugin
              contentEditable={
                <ContentEditable
                  className={styles.editorContent}
                  aria-label="メッセージを入力"
                />
              }
              placeholder={
                <div className={styles.placeholder}>
                  メッセージを入力… (Shift+Enter で改行 / Ctrl+V で画像貼り付け)
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <KeyboardPlugin onSend={onSend} />
            <ClipboardPastePlugin onPasteImage={handlePasteImage} />
          </div>
          <SendButtonPlugin onSend={onSend} />
        </div>
      </LexicalComposer>
    </div>
  )
}

function SendIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
