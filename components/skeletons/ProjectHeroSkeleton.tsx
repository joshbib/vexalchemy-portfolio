export default function ProjectHeroSkeleton() {
  return (
    <section
      className="
        w-full
        flex
        flex-col
        items-center
        justify-center
        pt-16
        pb-16
        md:pt-20
        md:pb-20
      "
    >
      <div
        className="
          w-full
          px-6
          md:px-16
          max-w-[800px]
          flex
          justify-center
          items-center
        "
      >
        <div className="w-full aspect-video rounded-md bg-neutral-800/10 animate-pulse" />
      </div>

      <div className="mt-16 md:mt-20 w-20 h-[1.5px] bg-neutral-800/10" />
    </section>
  );
}
