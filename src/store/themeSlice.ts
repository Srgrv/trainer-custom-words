// import { useSession } from "next-auth/react";
// import { create } from "zustand";

// type ThemeState = {
//   theme: string;
//   setTheme: (newTheme: string) => void;

//   isLoadingTheme: boolean;
//   loadTheme: () => void;
// };

// export const useThemeStore = create<ThemeState>((set) => ({
//   theme: "light",
//   isLoadingTheme: true,

//   setTheme: (newTheme) => {
//     localStorage.setItem("theme", newTheme);
//     set({ theme: newTheme });

//     const { data: session } = useSession();

//     if (session) {
//       fetch("/api/theme", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ theme: newTheme }),
//       }).catch((error) => console.error("Ошибка при обновлении темы:", error));
//     }
//   },
//   loadTheme: () => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setTheme(savedTheme);
//     } else {
//       setTheme("light");
//     }
//     isLoadingTheme = false;
//   },
//   updateTheme: async (newTheme: string) => {
//     localStorage.setItem("theme", newTheme);
//     setTheme(newTheme);
//     if (session) {
//       try {
//         const response = await fetch("/api/theme", {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ theme: newTheme }),
//         });
//         if (!response.ok) {
//           console.error("Ошибка при обновлении темы на сервере");
//         }
//       } catch (error) {
//         console.error("Ошибка при запросе обновления темы на сервере:", error);
//       }
//     }
//   },
// }));
