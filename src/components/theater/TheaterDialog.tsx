"use client";

import { useState } from "react";
import { GenericDialog } from "@/components/common/GenericDialog";
import { ApiDropdown } from "@/components/ui/ApiDropdown";
import { useGetCities } from "@/hooks/useCity";
import {
  Input,
  Button,
  Badge,
  Switch,
} from "@/components/ui";

export function TheaterDialog({
  open,
  setOpen,
  formData,
  setFormData,
  editTheater,
  handleSave,
  isPending,
}: any) {

  const { data: cities = [], isLoading } = useGetCities();

  const handleFacilityChange = (value: string) => {
    setFormData((prev: any) => {
      const exists = prev.facilities.includes(value);
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((f: string) => f !== value)
          : [...prev.facilities, value],
      };
    });
  };

  // Handle pricing row updates
  const updatePricing = (index: number, key: string, value: string) => {
    const updated = [...formData.pricing];
    updated[index][key] = value;
    setFormData({ ...formData, pricing: updated });
  };

  const removePricingRow = (index: number) => {
    const updated = formData.pricing.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, pricing: updated });
  };

  const addPricingRow = () => {
    setFormData({
      ...formData,
      pricing: [...formData.pricing, { category: "", price: "" }],
    });
  };

  return (
    <GenericDialog
      open={open}
      setOpen={setOpen}
      title={editTheater ? "Edit Theater" : "Add Theater"}
      onSave={handleSave}
      isPending={isPending}
    >

      {/* Theater Name */}
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      {/* City Dropdown */}
      <ApiDropdown
        label="City"
        placeholder="Select City"
        value={formData.city}
        onChange={(val) => setFormData({ ...formData, city: val })}
        data={cities}
        isLoading={isLoading}
        getLabel={(city: any) => `${city.name} — ${city.state}`}
        getValue={(city: any) => city._id}
      />

      {/* Address */}
      <Input
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />

      {/* Event Key */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Seats.io Event Key</label>
        <Input
          placeholder="Enter Seats.io event key"
          value={formData.eventKey}
          onChange={(e) =>
            setFormData({ ...formData, eventKey: e.target.value })
          }
        />
      </div>

      {/* Pricing Section */}
      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium">Pricing Categories</label>

        {formData.pricing.map((row: any, index: number) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              placeholder="Category (VIP, Balcony...)"
              value={row.category}
              onChange={(e) => updatePricing(index, "category", e.target.value)}
            />
            <Input
              placeholder="Price"
              type="number"
              value={row.price}
              onChange={(e) => updatePricing(index, "price", e.target.value)}
            />
            <Button
              variant="destructive"
              onClick={() => removePricingRow(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button variant="secondary" onClick={addPricingRow}>
          + Add Pricing Row
        </Button>
      </div>

      {/* Facilities */}
      <div>
        <label className="text-sm font-medium">Facilities</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Parking", "Snacks", "Wheelchair Accessible", "AC Hall", "Online Booking"].map(
            (facility) => (
              <Badge
                key={facility}
                variant={
                  formData.facilities.includes(facility)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer select-none"
                onClick={() => handleFacilityChange(facility)}
              >
                {facility}
              </Badge>
            )
          )}
        </div>
      </div>

      {/* Coordinates */}
      <div className="flex gap-2">
        <Input
          placeholder="Latitude"
          type="number"
          value={formData.latitude}
          onChange={(e) =>
            setFormData({ ...formData, latitude: e.target.value })
          }
        />
        <Input
          placeholder="Longitude"
          type="number"
          value={formData.longitude}
          onChange={(e) =>
            setFormData({ ...formData, longitude: e.target.value })
          }
        />
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Active</label>
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isActive: checked })
          }
        />
      </div>

    </GenericDialog>
  );
}
