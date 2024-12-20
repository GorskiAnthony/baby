import { useEffect, useState } from "react";
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
	const [receivedVote, setReceivedVote] = useState({ nb: 0, total: 0 });
	const [hasVoted, setHasVoted] = useState(false);

	const handleVote = async (vote: string) => {
		try {
			if (hasVoted) return;

			await fetch(`${import.meta.env.VITE_API_URL}/api/vote`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ vote }),
			});

			setHasVoted(true);
			await getVote(text);
		} catch (error) {
			console.error("Erreur lors de l'envoi du vote :", error);
		}
	};

	const getVote = async (sexe: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/vote?sexe=${sexe}`
			);
			const data = await response.json();
			setReceivedVote({ nb: data[0].nb, total: data[0].total });
		} catch (error) {
			console.error("Erreur lors de la récupération des votes :", error);
		}
	};

	useEffect(() => {
		getVote(text);
	}, [text]);

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
			onClick={() => {
				if (!hasVoted) {
					onSelect(side);
					handleVote(text);
				}
			}}
		>
			<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
				<span className="text-2xl font-bold text-white uppercase">
					{isSelected
						? `Il y a ${receivedVote.nb} votes pour ${text} (sur ${receivedVote.total})`
						: isOtherSideSelected
						? ""
						: text}
				</span>
				{isSelected && (
					<div className="absolute inset-0 flex items-center justify-center top-24">
						<p className="text-xl font-bold text-white text-center">
							Il y a un pourcentage de{" "}
							<span className="text-green-500">
								{Math.round(
									(receivedVote.nb / receivedVote.total) * 100
								)}
								%
							</span>{" "}
							de votes pour{" "}
							<span
								className={`${
									text === "Fille"
										? "text-pink-200"
										: "text-blue-200"
								}`}
							>
								{text}
							</span>{" "}
							contre{" "}
							<span className="text-green-500">
								{100 -
									Math.round(
										(receivedVote.nb / receivedVote.total) *
											100
									)}
								%
							</span>{" "}
							pour l'autre sexe !
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SidePanel;
