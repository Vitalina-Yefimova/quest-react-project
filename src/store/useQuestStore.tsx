import { create } from "zustand";

export interface Genre {
  genreName: string;
  icon?: React.ReactElement;
}

export interface Quest {
  id: string;
  title: string;
  genres: { genreName: string }[];
  players: {
    min: number;
    max: number;
  };
  difficulty: "easy" | "medium" | "hard";
  duration: "60 min" | "90 min" | "120 min";
  description?: string;
  image?: string;
  imageBg?: string;
  price: string;
}

interface QuestsStore {
  quests: Quest[];
  genres: Genre[];
  setQuests: (quests: Quest[]) => void;
  setGenres: (genres: Genre[]) => void;
  getAvailableGenres: () => Genre[];
  getFilteredQuests: (genreParam?: string) => Quest[];
  getQuestById: (id: string) => Quest | undefined;
}

export const useQuestStore = create<QuestsStore>((set, get) => ({
  quests: [],
  genres: [],

  setGenres: (genres: Genre[]) => set({ genres }),
  setQuests: (quests: Quest[]) => set({ quests }),

  getAvailableGenres: () => {
    const { genres, quests } = get();
    return genres.filter((genre) =>
      quests.some((quest) =>
        quest.genres.some(
          (questGenre) => questGenre.genreName === genre.genreName
        )
      )
    );
  },

  getFilteredQuests: (genreParam?: string) => {
    const { quests } = get();

    if (!genreParam) return quests;

    return quests.filter((quest) =>
      quest.genres.some((questGenre) => questGenre.genreName === genreParam)
    );
  },

  getQuestById: (id: string) => {
    return get().quests.find((quest) => quest.id === id);
  },
}));

export default useQuestStore;
