import { ChatArea } from "@/components/chat/chat-area"
import { DetailsPanel } from "@/components/chat/details-panel"

export default function ChatPage() {
    return (
        <div className="flex flex-1 h-full overflow-hidden">
            <ChatArea />
            {/* <DetailsPanel /> */}
        </div>
    )
}
