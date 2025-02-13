import React, { useState } from 'react';

const mockClimbs = [
  {
    id: 1,
    grade: 'V4',
    location: 'Red River Gorge',
    date: '2023-10-15',
    status: 'sent',
    notes: [
      'Crimpy start, tricky heel hook.',
      'Fell at the last move twice before sending.',
      'Great beta from Alex on the crux.',
    ],
    image: '/red-river.jpg',
  },
  {
    id: 2,
    grade: 'V5',
    location: 'Local Gym',
    date: '2023-10-10',
    status: 'project',
    notes: [
      'Need to work on the dyno.',
      'Left heel hook feels unstable.',
      'Almost stuck the finish last session.',
    ],
    image: '/red-river.jpg',
  },
];

const ViewClimbsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('date');

  // Filter and sort climbs
  const filteredClimbs = mockClimbs
    .filter((climb) => filter === 'all' || climb.status === filter)
    .sort((a, b) => {
      if (sort === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sort === 'grade') {
        return b.grade.localeCompare(a.grade);
      }
      return 0;
    });

  return (
    <section className='p-6 bg-base-200 h-full max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Your Climbs</h1>
        <p>You’ve logged {mockClimbs.length} climbs – keep crushing it!</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-base-100 p-4 rounded-lg shadow'>
          <p>Total Climbs</p>
          <p className='text-2xl font-bold'>45</p>
        </div>
        <div className='bg-base-100 p-4 rounded-lg shadow'>
          <p>Highest Grade</p>
          <p className='text-2xl font-bold'>V6</p>
        </div>
        <div className='bg-base-100 p-4 rounded-lg shadow'>
          <p>Most Frequent Location</p>
          <p className='text-2xl font-bold'>Local Gym</p>
        </div>
        <div className='bg-base-100 p-4 rounded-lg shadow'>
          <p>Last Climb</p>
          <p className='text-2xl font-bold'>3 days ago</p>
        </div>
      </div>

      <div className='flex gap-4 mb-8 flex-wrap'>
        <select defaultValue='All Climbs' className='select max-md:w-full'>
          <option>All Climbs</option>
          <option>Sent</option>
          <option>Projects</option>
        </select>
        <select defaultValue='Sort by Date' className='select max-md:w-full'>
          <option>Sort by Date</option>
          <option>Sort by Grade</option>
        </select>
      </div>

      <div className='space-y-4'>
        {filteredClimbs.map((climb) => (
          <div className='bg-base-100 p-4 rounded-lg shadow flex flex-col sm:flex-row items-start gap-4'>
            <img
              src={climb.image}
              alt='Climb'
              className='w-full sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0'
            />
            <div className='flex-1 min-w-0 w-full'>
              <div className='flex flex-col sm:flex-row justify-between items-start gap-2'>
                <div className='min-w-0'>
                  <p className='text-xl font-bold'>{climb.grade}</p>
                  <p>{climb.location}</p>
                  <p className='text-sm'>{climb.date}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm whitespace-nowrap flex-shrink-0 ${
                    climb.status === 'sent'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {climb.status === 'sent' ? 'Sent ✅' : 'Project 🚩'}
                </span>
              </div>
              {/* Display Multiple Notes */}
              <div className='mt-2 space-y-2'>
                {climb.notes.map((note, index) => (
                  <p key={index}>• {note}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8'>
        <button className='btn btn-primary'>Log a New Climb</button>
      </div>
    </section>
  );
};

export default ViewClimbsPage;
