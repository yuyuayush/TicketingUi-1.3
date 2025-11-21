"use client";

import Loading from "@/app/loading";
import { useInitiateStripePayment } from "@/hooks/usePayment";
import { useAuthStore } from "@/store/useAuth";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import { useState } from "react";

export default function SeatViewer({ concertData }) {
    const concertId = concertData._id;
    const theaterData = concertData.theaterId;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    const { currentUser } = useAuthStore();

    const calculateTotal = seats => {
        return seats.reduce((acc, seat) => acc + seat.price, 0).toFixed(2);
    };

    const { mutateAsync: stripePayment, isLoading } = useInitiateStripePayment();

    const handleSeatSelection = object => {
        const newSeat = {
            id: object.id,
            label: object.label,
            price: object.category.pricing.price
        };

        setSelectedSeats(prev => {
            const updated = [...prev, newSeat];
            setTotalPrice(calculateTotal(updated));
            return updated;
        });
    };

    const handleSeatDeselection = object => {
        const seatLabel = object.label;
        setSelectedSeats(prev => {
            const updated = prev.filter(s => s.label !== seatLabel);
            setTotalPrice(calculateTotal(updated));
            return updated;
        });
    };

    const handleConfirmPayment = () => {
        if (!selectedSeats.length) return;

        const payload = {
            amount: Number(totalPrice),
            currency: "usd",
            seatLabels: selectedSeats.map(s => ({ label: s.label, seatId: s.id })),
            concertId,
            eventKey: theaterData.eventKey,
            userId: currentUser?.id,
            productName: `Tickets: ${selectedSeats.map(s => s.label).join(", ")}`
        };

        stripePayment(payload);
    };

    const pricing = {
        priceFormatter: price => "$" + price,
        prices: theaterData.pricing
    };


    if (!theaterData?.eventKey) {
        return <p>Loading seating map...</p>;
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] h-screen">

            {/* LEFT SIDEBAR (Your Selection Panel) */}


            {/* RIGHT SIDE — Seats.io Map */}
            <div className="w-full h-[80vh]">
                {theaterData?.eventKey && (
                    <SeatsioSeatingChart
                        workspaceKey="f416f09a-4b62-47c3-986b-ed6248f5a62c"
                        event={theaterData.eventKey}
                        region="eu"
                        pricing={pricing}
                        session="continue"
                        onObjectSelected={handleSeatSelection}
                        onObjectDeselected={handleSeatDeselection}
                        maxSelectedObjects={6}
                        showLegend={true}
                    />
                )}
            </div>

            <div className="border-r  p-6 flex flex-col gap-4 h-[80vh] shadow-md ">

                <div className="flex justify-between items-center">
                    <label className="font-medium">Tickets</label>
                    <select className="border rounded p-1">
                        <option>1 Ticket</option>
                        <option>2 Tickets</option>
                        <option>3 Tickets</option>
                        <option>4 Tickets</option>
                        <option>5 Tickets</option>
                        <option>6 Tickets</option>
                    </select>
                </div>

                {/* ---------- NEW Price Slider (Added) ---------- */}
                <div className="mt-4">
                    <label className="font-medium">Price Range</label>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        className="w-full mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>$50</span>
                        <span>$500</span>
                    </div>
                </div>

                <hr className="my-4" />

                {/* Title */}
                <h2 className="text-xl font-bold">Your Selection</h2>

                {/* Selected seats list */}
                <div className="space-y-2">
                    {selectedSeats.length === 0 ? (
                        <p className="text-gray-500">No seats selected</p>
                    ) : (
                        selectedSeats.map((s, i) => (
                            <div
                                key={i}
                                className="flex justify-between bg-gray-100 p-2 rounded"
                            >
                                <span>{s.label}</span>
                                <span>${s.price}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Total */}
                <div className=" border-t ">
                    <h3 className="text-lg font-semibold">
                        Total: <span className="text-blue-600">${totalPrice}</span>
                    </h3>
                </div>

                {/* Checkout */}
                <button
                    onClick={handleConfirmPayment}
                    disabled={selectedSeats.length === 0 || isLoading}
                    className="mt-auto w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:bg-gray-300"
                >
                    Checkout · {selectedSeats.length} Ticket(s)
                </button>
            </div>
        </div>
    );
}
