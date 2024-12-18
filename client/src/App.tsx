import { useState } from "react";
import SidePanel from "./components/SidePanel";
import CenterSquare from "./components/CenterSquare";
import boy from "./assets/boy.jpg";
import girl from "./assets/girl.jpg";

function App() {
	const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(
		null
	);

	return (
		<section className="flex h-screen relative">
			<SidePanel
				text="Garçon"
				side="left"
				selectedSide={selectedSide}
				onSelect={setSelectedSide}
				image={boy}
			/>
			{selectedSide === null && <CenterSquare />}
			<SidePanel
				text="Fille"
				side="right"
				selectedSide={selectedSide}
				onSelect={setSelectedSide}
				image={girl}
			/>
		</section>
	);
}

export default App;
