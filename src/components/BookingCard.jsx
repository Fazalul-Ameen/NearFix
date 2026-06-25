import { Clock, CheckCircle2, AlertCircle, XCircle, MapPin, User, Phone } from "lucide-react";

function BookingCard({ booking, isWorkerMode = false, onStatusChange }) {
  const { id, serviceType, date, time, description, address, status, workerName, customerName, customerPhone, price } = booking;

  // Status mapping
  const statusConfig = {
    pending: {
      text: "Pending Approval",
      colorClass: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
      icon: Clock,
    },
    accepted: {
      text: "In Progress",
      colorClass: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      icon: Clock,
    },
    confirmed: { // Confirmed is treated same as accepted
      text: "Confirmed",
      colorClass: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      icon: Clock,
    },
    completed: {
      text: "Completed",
      colorClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      icon: CheckCircle2,
    },
    cancelled: {
      text: "Cancelled",
      colorClass: "bg-red-500/10 border-red-500/20 text-red-400",
      icon: XCircle,
    },
    rejected: {
      text: "Rejected",
      colorClass: "bg-red-500/10 border-red-500/20 text-red-400",
      icon: XCircle,
    },
  };

  const currentStatus = statusConfig[status.toLowerCase()] || {
    text: status,
    colorClass: "bg-slate-800 border-slate-700 text-slate-300",
    icon: AlertCircle,
  };

  const StatusIcon = currentStatus.icon;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-black/20">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold text-white tracking-wide">
              {serviceType} Service
            </h4>
            <span className="text-xs text-slate-500 uppercase tracking-wider block mt-1">
              Order ID: #{id?.substring(0, 8) || id}
            </span>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1 text-xs font-semibold ${currentStatus.colorClass}`}>
            <StatusIcon size={12} />
            {currentStatus.text}
          </span>
        </div>

        {/* Info grid */}
        <div className="space-y-2 text-sm text-slate-300 border-y border-slate-900 py-4">
          <p className="flex items-center gap-2">
            <Clock size={15} className="text-blue-400" />
            <span>Scheduled: <strong className="text-slate-100">{date} at {time}</strong></span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
            <span>Address: <span className="text-slate-100">{address}</span></span>
          </p>
          <p className="flex items-start gap-2">
            <AlertCircle size={15} className="text-blue-400 mt-0.5 shrink-0" />
            <span>Problem: <span className="text-slate-100 italic">"{description}"</span></span>
          </p>

          {isWorkerMode ? (
            <>
              <p className="flex items-center gap-2">
                <User size={15} className="text-blue-400" />
                <span>Customer: <strong className="text-slate-100">{customerName}</strong></span>
              </p>
              {customerPhone && (
                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-blue-400" />
                  <span>Phone: <strong className="text-slate-100">{customerPhone}</strong></span>
                </p>
              )}
            </>
          ) : (
            <p className="flex items-center gap-2">
              <User size={15} className="text-blue-400" />
              <span>Assigned Expert: <strong className="text-slate-100">{workerName || "Matching..."}</strong></span>
            </p>
          )}
        </div>

        {/* Footer/Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-sm font-semibold text-slate-400">
            Estimated Fee: <strong className="text-white text-base">{price || "$30"}</strong>
          </span>

          {/* Action buttons based on status and mode */}
          <div className="flex gap-2">
            {isWorkerMode ? (
              <>
                {status.toLowerCase() === "pending" && (
                  <>
                    <button
                      onClick={() => onStatusChange(id, "rejected")}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onStatusChange(id, "accepted")}
                      className="rounded-xl bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-blue-400"
                    >
                      Accept Job
                    </button>
                  </>
                )}
                {(status.toLowerCase() === "accepted" || status.toLowerCase() === "confirmed") && (
                  <button
                    onClick={() => onStatusChange(id, "completed")}
                    className="rounded-xl bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Complete Job
                  </button>
                )}
              </>
            ) : (
              <>
                {status.toLowerCase() === "pending" && (
                  <button
                    onClick={() => onStatusChange(id, "cancelled")}
                    className="rounded-xl border border-slate-700 hover:border-red-500/50 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-red-400 transition"
                  >
                    Cancel Request
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
