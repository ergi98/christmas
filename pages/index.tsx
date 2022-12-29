import Head from "next/head";
import Image from "next/image";

import { useEffect, useState } from "react";

import { flushSync } from "react-dom";

import Snowfall from "react-snowfall";

export default function Home() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const currentMode = document.documentElement.classList.contains("dark");
		const storedMode = Boolean(
			JSON.parse(localStorage.getItem("isDarkMode") ?? '""')
		);
		storedMode === true
			? document.documentElement.classList.add("dark")
			: document.documentElement.classList.remove("dark");
		flushSync(() => setIsDarkMode(currentMode || storedMode));
		setIsLoading(false);
	}, []);

	const handleImageClick = () => {
		document.documentElement.classList.toggle("dark");
		const currentMode = document.documentElement.classList.contains("dark");
		localStorage.setItem("isDarkMode", JSON.stringify(currentMode));
		setIsDarkMode(currentMode);
	};

	return (
		<>
			<Head>
				<title>Merry Christmas</title>
				<meta name="description" content="Merry christmas and happy new year" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isLoading ? (
				<></>
			) : (
				<main className="bg-red-400 dark:bg-slate-600 w-screen h-screen transition-all duration-300 overflow-hidden flex items-center justify-center flex-col gap-4">
					<Snowfall />
					<div className="relative flex items-center justify-center z-50">
						<Image
							priority
							alt="image"
							width={1080}
							height={1080}
							src="/light.jpg"
							onClick={handleImageClick}
							className="w-11/12 max-w-md shadow-2xl cursor-pointer dark:hidden"
						/>
						<Image
							priority
							alt="image"
							width={1080}
							height={1080}
							src="/dark.jpg"
							onClick={handleImageClick}
							className="w-11/12 max-w-md shadow-2xl cursor-pointer hidden dark:block"
						/>
						<div className="text-base text-neutral-300 absolute top-5 left-1/2 -translate-x-1/2 leading-4">
							MVA SQUAD
						</div>
					</div>
				</main>
			)}
		</>
	);
}
