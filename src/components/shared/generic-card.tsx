import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@radix-ui/react-tooltip";
import { MessageSquareText } from "lucide-react";
import { GeneralCardProps } from "@/types";
import useChatStore from "@/stores/setChatStore";

export default function GeneralCard({
  name,
  imageUrl,
  description,
  tags,
  linkText,
  linkUrl,
  additionalInfo,
  userId
}: GeneralCardProps) {
  const addConversation = useChatStore((state) => state.addConversation);

  const navigate = useNavigate();
  const userClick = async () => {
    await addConversation(userId);
    localStorage.setItem("selectedUserId", userId);
    navigate("/chat");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center mb-4">
          <img
            src={imageUrl}
            alt={name}
            width={80}
            height={80}
            className="rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-xl">{name}</h3>
            {linkText && linkUrl && (
              <a
                href={linkUrl}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </a>
            )}
            {additionalInfo && (
              <p className="text-gray-600">{additionalInfo}</p>
            )}
          </div>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="mb-2">
          <strong className="text-gray-700">
            {tags.length > 0
              ? tags[0].type.includes("focus-area")
                ? "Focus Areas:"
                : "Skills:"
              : ""}
          </strong>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className={`${tag.bgColor} ${tag.textColor} text-xs font-semibold px-2.5 py-0.5 rounded`}
            >
              {tag.text.name}
            </span>
          ))}
        </div>
      </div>
      <div className="self-end mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={async () => await userClick()}
                className="bg-black text-white font-bold py-2 px-4 rounded hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 "
              >
                <MessageSquareText></MessageSquareText>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Go to chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
