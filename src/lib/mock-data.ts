export type WorkflowStep = { id: number; title: string; description: string };

export const initialWorkflow: WorkflowStep[] = [
  { id: 1, title: "Greet customer", description: "Send welcome message and introduce CarePlus Diagnostics." },
  { id: 2, title: "Ask which test they want", description: "Offer service menu (CBC, Thyroid, Diabetes, Vitamin D)." },
  { id: 3, title: "Collect name and phone number", description: "Capture basic patient identity." },
  { id: 4, title: "Collect address", description: "Get the home-collection address." },
  { id: 5, title: "Ask preferred time slot", description: "Suggest available slots for sample pickup." },
  { id: 6, title: "Confirm booking", description: "Send confirmation message with all booking details." },
  { id: 7, title: "Mark payment status", description: "Track if booking is paid, COD or pending." },
  { id: 8, title: "Assign technician", description: "Auto-assign based on area and availability." },
  { id: 9, title: "Update sample collection status", description: "Notify customer when sample is collected." },
  { id: 10, title: "Send report link", description: "Share secure link to the digital lab report." },
  { id: 11, title: "Ask for feedback", description: "Collect rating and qualitative feedback." },
];

export const memoryAwareWorkflow: WorkflowStep[] = [
  { id: 1, title: "Greet customer", description: "Send welcome message." },
  { id: 2, title: "Ask which test they want", description: "Offer lab service menu." },
  { id: 3, title: "Collect name and phone", description: "Capture identity." },
  { id: 4, title: "Collect patient age", description: "Hindsight rule: always ask age before booking." },
  { id: 5, title: "Ask fasting status", description: "Hindsight rule: required before confirmation." },
  { id: 6, title: "Collect address", description: "Home-collection address." },
  { id: 7, title: "Ask preferred time slot", description: "Slot preference." },
  { id: 8, title: "Confirm booking", description: "Send confirmation." },
  { id: 9, title: "Assign technician", description: "Prefer female tech for female customers (Hindsight)." },
  { id: 10, title: "Update sample collection status", description: "Notify customer." },
  { id: 11, title: "Send report link", description: "Share digital report." },
  { id: 12, title: "Ask for feedback", description: "Collect feedback." },
];

export type Booking = {
  id: string;
  customer: string;
  service: string;
  age: number;
  fasting: "Yes" | "No";
  slot: string;
  status: "Booking Confirmed" | "Technician Assigned" | "Sample Collected" | "Report Sent" | "Completed";
  staff: string;
  memoryApplied: boolean;
};

export const bookings: Booking[] = [
  { id: "B-1042", customer: "Sneha", service: "Thyroid Profile", age: 24, fasting: "Yes", slot: "Tomorrow 10 AM", status: "Booking Confirmed", staff: "Anjali", memoryApplied: true },
  { id: "B-1041", customer: "Arjun", service: "CBC Test", age: 31, fasting: "No", slot: "Today 5 PM", status: "Technician Assigned", staff: "Rahul", memoryApplied: true },
  { id: "B-1040", customer: "Meera", service: "Diabetes Package", age: 45, fasting: "Yes", slot: "Tomorrow 8 AM", status: "Sample Collected", staff: "Anjali", memoryApplied: true },
];

export type AuditRow = {
  task: string;
  model: string;
  modelTier: "cheap" | "strong" | "memory";
  reason: string;
  cost: string;
  latency: string;
  escalated: boolean;
  status: "Success" | "Failure";
};

export const auditLogs: AuditRow[] = [
  { task: "Customer greeting", model: "Cheap / Fast Model", modelTier: "cheap", reason: "Simple response", cost: "₹0.001", latency: "280ms", escalated: false, status: "Success" },
  { task: "Workflow generation", model: "Strong Model", modelTier: "strong", reason: "Complex workflow reasoning", cost: "₹0.040", latency: "2.1s", escalated: true, status: "Success" },
  { task: "Owner feedback processing", model: "Strong Model", modelTier: "strong", reason: "Needs workflow modification", cost: "₹0.025", latency: "1.7s", escalated: true, status: "Success" },
  { task: "Status update message", model: "Cheap / Fast Model", modelTier: "cheap", reason: "Template response", cost: "₹0.001", latency: "230ms", escalated: false, status: "Success" },
  { task: "Memory retrieval", model: "Memory Layer", modelTier: "memory", reason: "Hindsight recall", cost: "₹0.000", latency: "120ms", escalated: false, status: "Success" },
];

export type Memory = {
  id: string;
  type: "Business Preference" | "Staff Rule" | "Service Catalog" | "Business Profile";
  content: string;
  source: string;
  usedIn: string;
};

export const memories: Memory[] = [
  { id: "m1", type: "Business Preference", content: "Always ask patient age before confirming blood tests.", source: "Owner Feedback", usedIn: "Thyroid Profile booking" },
  { id: "m2", type: "Business Preference", content: "Ask fasting status before confirming blood tests.", source: "Owner Feedback", usedIn: "CBC and Thyroid bookings" },
  { id: "m3", type: "Staff Rule", content: "Prefer female technicians for female customers.", source: "Owner Feedback", usedIn: "Sneha booking" },
  { id: "m4", type: "Business Profile", content: "Business type: Diagnostic Lab — CarePlus Diagnostics", source: "Setup", usedIn: "All conversations" },
  { id: "m5", type: "Service Catalog", content: "Services: CBC, Thyroid Profile, Diabetes Package, Vitamin D Test", source: "Setup", usedIn: "Service selection" },
];
