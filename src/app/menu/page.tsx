import MenuSections from "./MenuSections";
import MomoShowcase from "./MomoShowCaseView";

// Menu page. The hero is the showcase; add the next sections below it.
export default function MenuPage() {
  return (
    <main>
      <MomoShowcase />
      {/* more sections go here */}
      <MenuSections/>
    </main>
  );
}