import { Resource } from "../types";
import {
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

interface ResourceListProps {
  resources: Resource[];
}

export const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  const getIcon = (type: Resource["type"]) => {
    switch (type) {
      case "pdf":
        return <DocumentIcon className="w-5 h-5" />;
      case "video":
        return <VideoCameraIcon className="w-5 h-5" />;
      case "audio":
        return <MusicalNoteIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Materiały dodatkowe
      </h2>
      <div className="space-y-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-gray-400">{getIcon(resource.type)}</div>
            <span className="text-gray-700">{resource.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
