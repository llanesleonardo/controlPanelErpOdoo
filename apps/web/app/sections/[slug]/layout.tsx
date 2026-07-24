import { notFound } from 'next/navigation';
import { getErpSection } from '@/lib/erp-sections';

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function SectionLayout({ children, params }: Props) {
  const { slug } = await params;
  const section = getErpSection(slug);
  if (!section) notFound();
  return children;
}
