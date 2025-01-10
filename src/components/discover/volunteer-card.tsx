import { Volunteer } from "@/types";
import { randomAvatarUrl } from "@/utils/functions";

export default function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  const fullName = `${volunteer.firstName} ${volunteer.lastName}`;
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={volunteer.imageUrl ?? randomAvatarUrl()}
          alt={fullName}
          width={80}
          height={80}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-xl">{fullName}</h3>
          <p className="text-gray-600">{volunteer.city}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{volunteer.about}</p>
      <div className="mb-2">
        <strong className="text-gray-700">Skills:</strong>
      </div>
      <div className="flex flex-wrap gap-2">
        {volunteer.skills.map((skill) => (
          <span
            key={skill.id}
            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
