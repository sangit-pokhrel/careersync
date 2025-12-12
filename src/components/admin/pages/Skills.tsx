'use client';

export default function Skills() {
  const skills = Array(15).fill({
    name: 'React',
    endorsements: 45,
    level: 'expert',
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Skills</h1>
        <svg width="150" height="12" className="mt-2">
          <path
            d="M 0 6 Q 20 2, 40 6 T 80 6 T 120 6 T 150 6"
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-500">Your Skills</h2>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
            <span>➕</span>
            Add new Skills
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-blue-100 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.endorsements} Endorsements</p>
              </div>
              <span className="bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}