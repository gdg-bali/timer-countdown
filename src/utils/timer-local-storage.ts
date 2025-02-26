// src/utils/timertemp.ts

const STORAGE_KEY = "timer_temp";

/**
 * Get timers from localStorage
 * @returns {number[]} An array of timer values
 */
export const getTimers = (): number[] => {
  const storedTimers = localStorage.getItem(STORAGE_KEY);
  return storedTimers ? JSON.parse(storedTimers) : [];
};

// Save timers to localStorage
export const setTimers = (timers: number[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new Event("storageUpdated"));
};

/**
 * Save timers to localStorage
 * @param {number[]} timers The array of timers to save
 */
export const saveTimers = (timers: number[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
};

// /**
//  * Add a new timer
//  * @param {number} newTimer The new timer value
//  */
// export const addTimer = (newTimer: number): number[] => {
//   const timers = getTimers();
//   const updatedTimers = [...timers, newTimer];
//   saveTimers(updatedTimers);
//   return updatedTimers;
// };

// Add a new timer
export const addTimer = (timer: number) => {
  const timers = getTimers();
  timers.push(timer);
  setTimers(timers);
};

// /**
//  * Update a timer at a specific index
//  * @param {number} index The index of the timer to update
//  * @param {number} newValue The new value of the timer
//  */
// export const updateTimer = (index: number, newValue: number): number[] => {
//   const timers = getTimers();
//   if (index >= 0 && index < timers.length) {
//     timers[index] = newValue;
//     saveTimers(timers);
//   }
//   return timers;
// };

// Update a timer
export const updateTimer = (index: number, newValue: number) => {
  const timers = getTimers();
  if (index >= 0 && index < timers.length) {
    timers[index] = newValue;
    setTimers(timers);
  }
};


// /**
//  * Delete a timer from the list
//  * @param {number} index The index of the timer to remove
//  */
// export const deleteTimer = (index: number): number[] => {
//   const timers = getTimers().filter((_, i) => i !== index);
//   saveTimers(timers);
//   return timers;
// };

// Delete a timer
export const deleteTimer = (index: number) => {
  const timers = getTimers().filter((_, i) => i !== index);
  setTimers(timers);
};