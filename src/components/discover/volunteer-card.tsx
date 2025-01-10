import { Volunteer } from '../../data/directory'

export default function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={volunteer.avatar}
          alt={volunteer.name}
          width={80}
          height={80}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-xl">{volunteer.name}</h3>
          <p className="text-gray-600">{volunteer.location}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{volunteer.bio}</p>
      <div className="mb-2">
        <strong className="text-gray-700">Skills:</strong>
      </div>
      <div className="flex flex-wrap gap-2">
        {volunteer.skills.map((skill) => (
          <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

