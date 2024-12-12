"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
    const [abstracts, setAbstracts] = useState(["", ""]);
    const [heatmap, setHeatmap] = useState(null);
    const [similarPairs, setSimilarPairs] = useState([]);
    const [hasCompared, setHasCompared] = useState(false);

    const handleAbstractChange = (index, value) => {
        const newAbstracts = [...abstracts];
        newAbstracts[index] = value;
        setAbstracts(newAbstracts);
    };

    const addAbstract = () => {
        setAbstracts([...abstracts, ""]);
    };

    const removeAbstract = (index) => {
        const newAbstracts = abstracts.filter((_, i) => i !== index);
        setAbstracts(newAbstracts);
    };

    const compareAbstracts = async () => {
        try {
            const response = await axios.post("https://check-kesamaan-abstract-production.up.railway.app/api/compare/", { abstracts });
            setHeatmap(response.data.heatmap);
            setSimilarPairs(response.data.similar_pairs);
            setHasCompared(true);
        } catch (error) {
            console.error("Error comparing abstracts:", error);
        }
    };

    const getBackgroundClass = (similarity) => {
        if (similarity >= 80) return "bg-red-100 border-red-500";
        if (similarity >= 60) return "bg-orange-100 border-orange-500";
        if (similarity >= 40) return "bg-yellow-100 border-yellow-500";
        return "bg-green-100 border-green-500";
    };

    return (
        <div className="min-h-screen bg-[#f9f9f9f9] p-6">
            <h1 className="text-4xl font-bold font-Fira_Code text-center bg-white shadow-md border border-gray-300 py-2 text-black mb-6">
                Komparasi Abstrak <br />
                <span className="text-violet-600 font-Funnel_Sans font-medium text-lg">BY WIBI LAKSONO WIJAYA</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                {abstracts.map((abstract, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-md shadow-md border border-gray-300"
                    >
                        <p className="font-Fira_Code text-xl text-black font-semibold mb-2 bg-violet-300 rounded-md px-2 py-2 flex justify-between items-center">
                            Abstrak {index + 1}
                            <button
                                onClick={() => removeAbstract(index)}
                                className="bg-red-500 px-2 py-2 rounded-md font-bold text-sm hover:underline"
                            >
                                <svg className="h-5 w-5 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                            </button>
                        </p>
                        <textarea
                            value={abstract}
                            onChange={(e) => handleAbstractChange(index, e.target.value)}
                            placeholder={`Silakan isi abstrak ${index + 1}`}
                            className="w-full h-[20rem] p-3 border border-gray-300 bg-violet-50 rounded-md text-black font-Funnel_Sans focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={addAbstract}
                    className="px-4 py-2 bg-green-500 text-white font-semibold font-Funnel_Sans rounded-md shadow-md hover:bg-green-600"
                >
                    + Tambah Abstrak
                </button>
                <button
                    onClick={compareAbstracts}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold font-Funnel_Sans rounded-md shadow-md hover:bg-blue-600"
                >
                    Komparasi
                </button>
            </div>

            {heatmap && (
                <div className="mt-8 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    <h2 className="text-xl font-Fira_Code font-semibold text-black mb-4 bg-violet-300 py-2 rounded-md text-center">
                        Heatmap
                    </h2>
                    <img
                        src={`data:image/png;base64,${heatmap}`}
                        alt="Heatmap"
                        className="mx-auto border border-gray-300"
                    />
                </div>
            )}

            {hasCompared && (
                <div className="mt-8 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    <h2 className="text-xl font-Fira_Code bg-violet-300 text-center py-2 rounded-md font-semibold text-black mb-4">
                        Kesimpulan
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {similarPairs.map(([i, j, similarity], idx) => (
                            <li
                                key={idx}
                                className={`p-6 rounded-md shadow border ${getBackgroundClass(
                                    similarity
                                )}`}
                            >
                                <div className="text-black font-bold text-xl">
                                    Abstrak {i + 1}
                                </div>
                                <div className="text-black font-inter">
                                    Memiliki Kesamaan Sebesar{" "}
                                    <strong>{similarity.toFixed(2)}%</strong> dengan{" "}
                                    <strong>Abstrak {j + 1}</strong>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
