import API from "../utils/api";

const LOCAL_BOOKINGS_KEY = "nearfix_bookings";

const getStoredBookings = () => {
  const stored = localStorage.getItem(LOCAL_BOOKINGS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    // Attempt sending request to backend
    // Since customer ID is derived from backend middleware (req.user.id), we just pass other fields.
    const payload = {
      category: bookingData.workerId, // or category ID if available
      title: `${bookingData.serviceType} Request`,
      description: bookingData.description,
      address: bookingData.address,
      preferredDate: bookingData.date,
    };
    const response = await API.post("/service-requests", payload);
    
    // Also save in local storage for fallback/demo consistency
    const bookings = getStoredBookings();
    const newBooking = {
      ...bookingData,
      id: response.data.request?._id || `booking-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify([newBooking, ...bookings]));
    
    return {
      success: true,
      booking: newBooking,
    };
  } catch (err) {
    console.warn("Backend createBooking failed, saving to local storage...", err);
    
    const bookings = getStoredBookings();
    const newBooking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify([newBooking, ...bookings]));
    return {
      success: true,
      booking: newBooking,
    };
  }
};

export const getBookings = async () => {
  try {
    // Attempt backend fetch
    const response = await API.get("/service-requests");
    return response.data;
  } catch (err) {
    console.warn("Backend getBookings failed, returning local storage bookings...", err);
    
    // Local storage fallback filtering
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const allBookings = getStoredBookings();
    
    if (currentUser.role === "worker") {
      // Return bookings assigned to this worker
      return allBookings.filter(
        (b) => b.workerEmail === currentUser.email || b.workerId === currentUser.id
      );
    } else {
      // Return bookings requested by this customer
      return allBookings.filter(
        (b) => b.customerEmail === currentUser.email || b.customerId === currentUser.id
      );
    }
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await API.put(`/service-requests/${bookingId}`, { status });
    
    // Update local copy too
    const bookings = getStoredBookings();
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status } : b));
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
    
    return response.data;
  } catch (err) {
    console.warn(`Backend updateBookingStatus failed for booking ${bookingId}, using local fallback...`, err);
    
    const bookings = getStoredBookings();
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status } : b));
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
    
    return {
      success: true,
      message: `Booking status updated to ${status} locally.`,
    };
  }
};
