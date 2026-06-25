import API from "../utils/api";

const LOCAL_WORKERS_KEY = "nearfix_workers";

const DEFAULT_WORKERS = [
  {
    id: "worker-plumber-1",
    fullName: "John Smith",
    profession: "Plumber",
    experience: "5",
    phoneNumber: "1234567890",
    location: "New York",
    rating: 4.8,
    price: "$35",
    email: "john.smith@example.com",
    bio: "Certified master plumber with over 5 years of experience in leak repair, pipe replacements, and drain cleanings.",
  },
  {
    id: "worker-electrician-2",
    fullName: "Mike Johnson",
    profession: "Electrician",
    experience: "8",
    phoneNumber: "9876543210",
    location: "Chicago",
    rating: 4.9,
    price: "$45",
    email: "mike.johnson@example.com",
    bio: "Licenced industrial and residential electrician. Expert in smart home wiring, fixture installs, and panels.",
  },
  {
    id: "worker-tutor-3",
    fullName: "Sarah Davis",
    profession: "Tutor",
    experience: "3",
    phoneNumber: "5551234567",
    location: "San Francisco",
    rating: 4.7,
    price: "$25",
    email: "sarah.davis@example.com",
    bio: "Passionate educator providing personalized academic coaching for K-12 students in Mathematics and Science.",
  },
  {
    id: "worker-ac-4",
    fullName: "Emma Wilson",
    profession: "AC Technician",
    experience: "6",
    phoneNumber: "4448889999",
    location: "Austin",
    rating: 4.9,
    price: "$50",
    email: "emma.wilson@example.com",
    bio: "HVAC expert offering installation, service, and maintenance of all major air conditioning brands.",
  },
];

// Seed default workers if local storage is empty
const getStoredWorkers = () => {
  const stored = localStorage.getItem(LOCAL_WORKERS_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_WORKERS_KEY, JSON.stringify(DEFAULT_WORKERS));
    return DEFAULT_WORKERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_WORKERS;
  }
};

export const getWorkers = async () => {
  try {
    const response = await API.get("/workers");
    return response.data;
  } catch (err) {
    console.warn("Backend getWorkers failed, returning local storage workers...", err);
    return getStoredWorkers();
  }
};

export const getWorkerById = async (id) => {
  try {
    const response = await API.get(`/workers/${id}`);
    return response.data;
  } catch (err) {
    console.warn(`Backend getWorkerById failed for ID ${id}, searching local storage...`, err);
    const workers = getStoredWorkers();
    const worker = workers.find((w) => w.id === id);
    if (!worker) {
      throw new Error("Worker not found");
    }
    return worker;
  }
};

export const registerWorker = async (workerData) => {
  try {
    const response = await API.post("/workers/register", workerData);
    return response.data;
  } catch (err) {
    console.warn("Backend worker registration failed, using local storage fallback...", err);
    
    // Read and update worker list
    const workers = getStoredWorkers();
    
    // Check if worker already exists with the same phone or email
    const email = workerData.email || "";
    const phone = workerData.phoneNumber || "";
    
    const exists = workers.some(
      (w) => w.email === email || w.phoneNumber === phone
    );
    if (exists) {
      throw new Error("You are already registered as a worker with this email or phone number.");
    }

    const newWorker = {
      ...workerData,
      id: `worker-${Date.now()}`,
      rating: 5.0, // New workers start with 5.0
      price: workerData.price || "$30",
    };

    localStorage.setItem(LOCAL_WORKERS_KEY, JSON.stringify([...workers, newWorker]));
    
    // Update logged in user role to "worker"
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (currentUser && (currentUser.email === email || currentUser.phoneNumber === phone || currentUser.id)) {
      currentUser.role = "worker";
      localStorage.setItem("user", JSON.stringify(currentUser));
      
      // Update in nearfix_users registry
      const localUsers = JSON.parse(localStorage.getItem("nearfix_users") || "[]");
      const updatedUsers = localUsers.map((u) => {
        if (u.email === currentUser.email || u.phoneNumber === currentUser.phoneNumber) {
          return { ...u, role: "worker" };
        }
        return u;
      });
      localStorage.setItem("nearfix_users", JSON.stringify(updatedUsers));
    }

    return {
      success: true,
      worker: newWorker,
    };
  }
};
