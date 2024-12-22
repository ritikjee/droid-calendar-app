import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const initialState = {
  events: [],
  categories: [],
};

const DataProviderContext = createContext(initialState);

export const DataProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const [currentDateEvents, setCurrentDateEvents] = useState([]);

  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories ? JSON.parse(storedCategories) : [];
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const filteredEvents = events.filter((event) => {
      return (
        new Date(event.date).toDateString() === selectedDate.toDateString()
      );
    });
    setCurrentDateEvents(filteredEvents);
  }, [events, selectedDate]);

  useEffect(() => {
    const upcomingEvents = events
      .slice(0, 2)
      .filter((event) => new Date(event.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setUpcomingEvents(upcomingEvents);
  }, [events]);

  const addEvent = (event) => {
    const hasConflict = events.some((existingEvent) => {
      return (
        existingEvent.date === event.date &&
        ((event.startTime >= existingEvent.startTime &&
          event.startTime < existingEvent.endTime) ||
          (event.endTime > existingEvent.startTime &&
            event.endTime <= existingEvent.endTime) ||
          (event.startTime <= existingEvent.startTime &&
            event.endTime >= existingEvent.endTime))
      );
    });

    if (hasConflict) {
      alert("An event already exists in the selected time range.");
      return;
    }

    const updatedEvents = [
      ...events,
      {
        id: uuid(),
        ...event,
      },
    ];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const addCategory = (category) => {
    const updatedCategories = [
      ...categories,
      {
        id: uuid(),
        ...category,
      },
    ];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const updatedCategory = (id, category) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === id) {
        return {
          ...cat,
          ...category,
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const value = {
    events,
    addEvent,
    categories,
    addCategory,
    deleteCategory,
    updatedCategory,
    selectedDate,
    setSelectedDate,
    upcomingEvents,
    currentDateEvents,
  };

  return (
    <DataProviderContext.Provider value={value}>
      {children}
    </DataProviderContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => {
  const context = useContext(DataProviderContext);

  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");

  return context;
};
