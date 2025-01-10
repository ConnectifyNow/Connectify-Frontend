import { Link } from "react-router-dom";
import { Organization } from "../../data/directory";
import { MessageSquareText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OrganizationCard({ org }: { org: Organization }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={org.logo}
          alt={org.name}
          width={80}
          height={80}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-xl">{org.name}</h3>
          <a
            href={org.website}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{org.description}</p>
      <div className="mb-2">
        <strong className="text-gray-700">Focus Areas:</strong>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {org.focus.map((area) => (
          <span
            key={area}
            className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded"
          >
            {area}
          </span>
        ))}
      </div>
      <Link to={`/chat`} className="self-end mt-4">
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                <MessageSquareText></MessageSquareText>
              </button>
            </TooltipTrigger>
            <TooltipContent>Go to chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </div>
  );
}
