import KanbanBoard from '@/components/kanban-board';
import { getSession } from '@/lib/auth/auth';
import connectDB from '@/lib/db';
import { Board } from '@/lib/models';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await getSession();
  if (!session?.user) {
    redirect('/sign-in');
  }

  await connectDB();
  const boardDoc = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  const board = boardDoc ? JSON.parse(JSON.stringify(boardDoc)) : null;

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className='container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10'>
        <div className='mb-8'>
          <KanbanBoard board={board} userId={session?.user.id} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;