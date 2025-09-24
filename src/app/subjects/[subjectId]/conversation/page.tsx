import { subjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import VirtualTeacher from '@/components/virtual-teacher';

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default function ConversationPage({ params }: { params: { subjectId: string } }) {
  const subject = subjects.find((s) => s.id === params.subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <div>
      <VirtualTeacher subject={{ id: subject.id, name: subject.name }} />
    </div>
  );
}
