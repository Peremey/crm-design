export interface ChatShort {
    _id?: string
    created_at?: string
    updated_at?: string
    user_id: string
    user_info: _SupportingUser
    status: 'open' | 'closed'
    type: string
    title: string
    last_message?: Message
}

export interface _SupportingUser {
    first_name: string
    last_name: string
    phone: string
    email: string
}

export interface Message {
    _id?: string
    created_at?: string
    updated_at?: string
    sender: 'admin' | 'user'
    text: string
    attachment_links?: string[]
    is_read?: boolean
}

export interface SupportChat extends ChatShort {
    messages: Array<Message>
    is_deleted?: boolean
}

export interface supportChatBody {
    text: string
    attachment_links?: string[]
}


export interface SupportChatListElement {
    chat: SupportChat
    unread_count: number
}