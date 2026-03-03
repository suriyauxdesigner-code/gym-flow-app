import { cn } from "@/lib/utils";
import { type Message, formatMsgTime } from "@/lib/messages-data";

interface MessageBubbleProps {
  message: Message;
  isLastTrainerMsg: boolean;
}

export default function MessageBubble({
  message,
  isLastTrainerMsg,
}: MessageBubbleProps) {
  const isTrainer = message.sender === "trainer";

  return (
    <div className={cn("flex", isTrainer ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[72%] flex-col", isTrainer && "items-end")}>
        {/* Bubble */}
        <div
          className={cn(
            "px-4 py-2.5 text-sm leading-relaxed shadow-sm",
            isTrainer
              ? "rounded-xl rounded-br-sm bg-indigo-600 text-white"
              : "rounded-xl rounded-bl-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          )}
        >
          {message.content}
        </div>

        {/* Timestamp + status */}
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500",
            isTrainer ? "flex-row-reverse" : "flex-row"
          )}
        >
          <span>{formatMsgTime(message.timestamp)}</span>
          {isTrainer && (
            <span
              className={cn(
                "font-medium",
                isLastTrainerMsg ? "text-indigo-400" : "text-slate-300"
              )}
            >
              {isLastTrainerMsg ? "✓✓ Read" : "✓ Sent"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
