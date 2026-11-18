import MomoShowcase from "./MomoShowCaseView";

// Menu page. The hero is the showcase; add the next sections below it.
export default function MenuPage() {
  return (
    <main>
      <MomoShowcase />
      {/* more sections go here */}
      <section className="h-[150vh] bg-white p-10">Next section</section>
    </main>
  );
}