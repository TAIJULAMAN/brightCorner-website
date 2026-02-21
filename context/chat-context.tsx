'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type ChatType = 'channel' | 'dm'

export interface Chat {
    id: number
    name: string
    type: ChatType
    unread: number
    lastMessage: string
    time: string
    active?: boolean
    description?: string
    members?: number
    online?: number
}

interface ChatContextType {
    chats: Chat[]
    activeChatId: number
    setActiveChatId: (id: number) => void
    activeChat: Chat | undefined
}

const chatsData: Chat[] = [
    {
        id: 1,
        name: 'Product Design',
        type: 'channel',
        unread: 0,
        lastMessage: 'Q4 Roadmap...',
        time: '10:42 AM',
        description: 'Design system discussions and handoffs.',
        members: 128,
        online: 14
    },
    {
        id: 2,
        name: 'Engineering Team',
        type: 'channel',
        unread: 3,
        lastMessage: 'Alex: Deployment successful',
        time: '09:15 AM',
        description: 'Technical implementation and architecture.',
        members: 45,
        online: 12
    },
    {
        id: 3,
        name: 'Marketing Squad',
        type: 'channel',
        unread: 0,
        lastMessage: 'Can we review the copy...',
        time: 'Yesterday',
        description: 'Brand and growth strategies.',
        members: 20,
        online: 5
    },
    {
        id: 4,
        name: 'Sarah Connor',
        type: 'dm',
        unread: 0,
        lastMessage: 'Sent an attachment.',
        time: 'Mon',
        description: 'Personal conversation with Sarah Connor.'
    },
    {
        id: 5,
        name: 'Operations',
        type: 'channel',
        unread: 0,
        lastMessage: 'Weekly report is ready.',
        time: 'Sun',
        description: 'Internal operations and logistics.',
        members: 10,
        online: 2
    },
    {
        id: 6,
        name: 'John Doe',
        type: 'dm',
        unread: 0,
        lastMessage: 'Thanks for the update!',
        time: 'Last Week',
        description: 'Personal conversation with John Doe.'
    },
]

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
    const [activeChatId, setActiveChatId] = useState(1)

    const activeChat = chatsData.find(chat => chat.id === activeChatId)

    return (
        <ChatContext.Provider value={{ chats: chatsData, activeChatId, setActiveChatId, activeChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}
