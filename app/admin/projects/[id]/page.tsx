import { connectDB } from '@/app/lib/mongodb';
import { Project } from '@/app/models/Project';
import EditProjectForm from './components/EditProjectForm';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditPageProps) {
  await connectDB();
  const project = await Project.findById(params.id).lean();

  const serializedProject = JSON.parse(JSON.stringify(project));

  if (!project) {
    return <div className="text-red-600">Proje bulunamadı!</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Proje Düzenle</h1>
      <EditProjectForm project={serializedProject} />
    </div>
  );
}
