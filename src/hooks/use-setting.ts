import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

const defaultSettings = {
  mode: "dark",
  theme: {
    styles: {
      light: {},
      dark: {},
    },
  },
};

export function useSettings() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("app-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
        setTheme(parsed.mode || "dark");
      } else {
        setTheme("dark");
      }
    } catch (err) {
      console.warn("Failed to load settings:", err);
      setTheme("dark");
    } finally {
      setLoaded(true);
    }
  }, [setTheme]);

  const updateSettings = useCallback((newSettings: typeof defaultSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem("app-settings", JSON.stringify(newSettings));
    } catch (err) {
      console.warn("Failed to save settings:", err);
    }
  }, []);

  return { settings, updateSettings, loaded };
}
