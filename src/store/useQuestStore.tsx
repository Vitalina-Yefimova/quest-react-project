import { create } from "zustand"; // это основная функция, которая создаёт состояние в Zustand

export interface Genre {
  genreName: string;
  icon?: React.ReactElement;
}

export interface Quest {
  id: string;
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
  addQuest: (quest: Quest) => void; // Функция для добавления нового квеста
  removeQuest: (questId: string) => void; // Функция для удаления квеста и обновления жанров
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

  // state — это текущее состояние
  addQuest: (newQuest) =>
    set((state) => {
      // обновляет состояние
      // Проверка - есть ли в "genres" новый жанр
      const newGenres = newQuest.genres.filter(
        // filter проверяет, какие жанры еще НЕ добавлены в genres
        (newGenre) =>
          !state.genres.some(
            // some проверяет, есть ли в массиве genres жанр с таким же названием
            (existingGenre) => existingGenre.genreName === newGenre.genreName
          )
      ); // Если жанра нет, то добавляет его в массив genres

      return {
        quests: [...state.quests, newQuest], // добавляет новый квест
        genres: [...state.genres, ...newGenres], // добавляет новый жанр
      };
    }),

  removeQuest: (questID) =>
    set((state) => {
      const updatedQuests = state.quests.filter(
        (quest) => quest.id !== questID
      );

      const updatedGenres = state.genres.filter((genre) =>
        updatedQuests.some((quest) =>
          quest.genres.some(
            (questGenre) => questGenre.genreName === genre.genreName
          )
        )
      );
      // .filter() проходит по каждому жанру и проверяет, есть ли квесты с этим жанром

      return { quests: updatedQuests, genres: updatedGenres };
    }),
}));

export default useQuestStore;
