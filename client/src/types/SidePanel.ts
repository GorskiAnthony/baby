export type SidePanelProps = {
	text: string;
	side: "left" | "right";
	selectedSide: "left" | "right" | null;
	onSelect: (side: "left" | "right" | null) => void;
	image: string;
};
