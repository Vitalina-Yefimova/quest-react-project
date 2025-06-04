import { create } from "zustand"; // это основная функция, которая создаёт состояние в Zustand

export interface Genre {
  genreName: string;
  icon?: React.ReactElement;
}

export interface Quest {
  _id: string;
  title: string;
  genres: { genreName: string }[];
  players: string;
  difficulty: "easy" | "medium" | "hard";
  duration: "60 min" | "90 min" | "120 min";
  description?: string;
  image?: string;
  imageBg?: string;
}

interface QuestsStore {
  quests: Quest[]; // Массив всех квестов
  genres: Genre[]; // Массив всех жанров
  setQuests: (quests: Quest[]) => void; // Функция, которая обновляет состояние квестов
  setGenres: (genres: Genre[]) => void; // Функция, которая обновляет состояние жанров
  getAvailableGenres: () => Genre[]; // Функция, которая возвращает только те жанры, которые используются хотя бы в одном квесте.
  getFilteredQuests: (genreParam?: string) => Quest[]; // Функция, которая фильтрует квесты по жанру
  getQuestById: (id: string) => Quest | undefined; // Функция, которая возвращает квест по его ID
}

// set (обновляет состояние) — это функция, которая изменяет данные в store; она принимает новые данные и обновляет состояние
// get (получает текущее состояние) — это функция, которая даёт доступ к текущим данным из store

export const useQuestStore = create<QuestsStore>((set, get) => ({
  quests: [],
  genres: [],

  // Установка квестов и жанров в состояние
  setGenres: (genres: Genre[]) => set({ genres }),
  setQuests: (quests: Quest[]) => set({ quests }),

  // Функция, которая возвращает только те жанры, у которых есть квесты
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
  // .filter() проходит по каждому жанру и проверяет, есть ли квесты с этим жанром
  // .some() – метод массива, который возвращает true, если хотя бы один элемент подходит

  // Функция, которая фильтрует квесты по жанру
  getFilteredQuests: (genreParam?: string) => {
    const { quests } = get();

    if (!genreParam) return quests; // Если жанр не выбран - возвращает все квесты

    return quests.filter(
      (quest) =>
        quest.genres.some((questGenre) => questGenre.genreName === genreParam) // Если жанр выбран - возвращает квесты с этим жанром
    );
  },
  // genreParam – это название жанра, по которому нужно отфильтровать квесты
  // .filter() проходит по каждому квесту и проверяет, есть ли у него жанр, который совпадает с genreParam
  // .some() – метод массива, который возвращает true, если хотя бы один элемент подходит

  getQuestById: (id: string) => {
    return get().quests.find((quest) => quest._id === id);
  },
}));

export default useQuestStore;
