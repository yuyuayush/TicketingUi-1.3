export function StatCard({ icon: Icon, label, value, change, trend }) {
  const isPositive = trend === "up";

  return (
    <div
      className="
        group
        relative overflow-hidden
        rounded-2xl 
        bg-white/80 backdrop-blur-lg
        border border-gray-200
        shadow-sm transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        p-5 sm:p-6
      "
    >
      {/* Soft gradient highlight on hover */}
      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300
        bg-gradient-to-br from-indigo-50/60 via-transparent to-blue-50/60
      " />

      <div className="relative z-10 flex items-start justify-between gap-5">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          <p className="text-gray-600 text-xs sm:text-sm font-medium tracking-wide">
            {label}
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {value}
          </p>

          {change && (
            <p
              className={`
                text-xs sm:text-sm font-semibold mt-2
                flex items-center gap-1
                ${isPositive ? "text-green-600" : "text-red-600"}
              `}
            >
              <span className="text-lg">{isPositive ? "↑" : "↓"}</span>
              {change}
            </p>
          )}
        </div>

        {/* ICON CONTAINER WITH DEPTH */}
        <div
          className="
            bg-white shadow-md
            border border-gray-100
            rounded-xl
            p-3 sm:p-4
            flex items-center justify-center
            transition-all duration-300
            group-hover:shadow-lg group-hover:scale-105
          "
        >
          {Icon && (
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
          )}
        </div>
      </div>
    </div>
  );
}
