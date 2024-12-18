import { SidePanelProps } from "../types/SidePanel";
const SidePanel = ({
	text,
	side,
	selectedSide,
	onSelect,
	image,
}: SidePanelProps) => {
	const isSelected = selectedSide === side;
	const isOtherSideSelected = selectedSide !== null && selectedSide !== side;

	return (
		<div
			className={`
        ${
			isSelected ? "w-full" : isOtherSideSelected ? "w-0" : "w-1/2"
		} bg-cover bg-center relative`}
			style={{
				backgroundImage: `url(${image})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			onClick={() => onSelect(isSelected ? null : side)}
		>
			<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
				<span className="text-2xl font-bold text-white uppercase">
					{isSelected
						? `Tu as séléctionné : ${text}`
						: isOtherSideSelected
						? ""
						: text}
				</span>
			</div>
		</div>
	);
};

export default SidePanel;
