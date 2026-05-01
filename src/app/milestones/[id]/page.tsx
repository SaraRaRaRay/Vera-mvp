type MilestoneDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MilestoneDetailPage({ params }: MilestoneDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Milestone detail coming soon</h1>
      <p className="mt-3 text-muted-foreground">
        We are preparing guidance for <span className="font-medium text-foreground">{id}</span>.
      </p>
    </main>
  );
}
