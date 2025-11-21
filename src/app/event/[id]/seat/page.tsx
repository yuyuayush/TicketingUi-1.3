"use client";

import Loading from "@/app/loading";
import SeatViewer from "@/components/seat/SeatMap";
import { useGetConcertById } from "@/hooks/useConcert";
import { useGetTheaterById } from "@/hooks/useTheater";
import { use } from "react";

export default function SeatSelectionPage({ params }) {
  const { id: concertId } = use(params);
  const { data: concertData,isLoading } = useGetConcertById(concertId);
  console.log(concertData)

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT — Seat Map */}
      <div className="flex-1 bg-white shadow-inner p-4 overflow-hidden">
        <SeatViewer  concertData={concertData} />
      </div>



    </div>
  );
}
