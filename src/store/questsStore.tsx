import { create } from "zustand";
import HorrorIcon from "../components/icons/HorrorIcon";
import MysteryIcon from "../components/icons/MysteryIcon";
import DetectiveIcon from "../components/icons/DetectiveIcon";
import AdventureIcon from "../components/icons/AdventureIcon";
import SciFiIcon from "../components/icons/SciFiIcon";

interface Genre {
  name: string;
  icon?: React.ReactElement;
}

interface Quest {
  id: string;
  title: string;
  genres: Genre[];
  players: string;
  difficulty: "easy" | "medium" | "hard";
  duration: "60 min" | "90 min" | "120 min";
  description: string;
  image: string;
}

interface QuestsStore {
  quests: Quest[];
  genres: Genre[];
  addQuest: (quest: Quest) => void;
}

// set (обновляет состояние) — это функция, которая изменяет данные в store
// get (получает текущее состояние) — это функция, которая даёт доступ к текущим данным из store

export const useQuestStore = create<QuestsStore>((set, get) => ({
  genres: [
    { name: "Horror", icon: <HorrorIcon /> },
    { name: "Mystery", icon: <MysteryIcon /> },
    { name: "Detective", icon: <DetectiveIcon /> },
    { name: "Adventure", icon: <AdventureIcon /> },
    { name: "Sci-fi", icon: <SciFiIcon /> },
  ],

  quests: [
    {
      id: "1",
      title: "CRYPT",
      genres: [{ name: "Horror" }],
      players: "2-5 players",
      difficulty: "hard",
      duration: "90 min",
      description:
        "You find yourself trapped in an ancient crypt, the heavy stone door sealed behind you. The air is thick with dust, and faint whispers seem to echo from the walls. Candles flicker, casting eerie shadows over faded engravings and long-forgotten tombs. A hidden mechanism has been triggered—you have 90 minutes before the crypt is sealed forever. Can you decipher the cryptic symbols, unlock the secrets of the past, and escape before you become just another lost soul buried within these walls?",
      image: "src/images/scrypt.png",
    },
    {
      id: "2",
      title: "MANIAC",
      genres: [{ name: "Horror" }],
      players: "3-4 players",
      difficulty: "medium",
      duration: "90 min",
      description:
        "In a dimly lit room, several strangers regain consciousness. No one remembers what happened the night before. Their hands and feet are bound, but one of them has managed to break free. A terrifying timer hangs on the wall, counting down—90 minutes remain.Can you keep your cool under pressure, help the others, uncover the truth, and escape the room in time?",
      image: "src/images/maniac.png",
    },
    {
      id: "3",
      title: "RITUAL",
      genres: [{ name: "Mystery" }],
      players: "3-5 players",
      difficulty: "hard",
      duration: "120 min",
      description:
        "The heavy air weighs down on you as you find yourself locked in a damp chamber with other confused victims in the dead of night. Through a crack in the door, you see a hooded figure preparing what looks like a ritual site. Will you escape in time, or become the next sacrifice?",
      image: "src/images/ritual.png",
    },
    {
      id: "4",
      title: "MARS-2056",
      genres: [{ name: "Sci-fi" }, { name: "Adventure" }],
      players: "2-4 players",
      difficulty: "easy",
      duration: "90 min",
      description:
        "The year is 2056, and Mars is no longer an uninhabited wasteland. A state-of-the-art research station was built to sustain human life, but something has gone terribly wrong. The last transmission from the crew was a distress signal—then, complete silence. You are part of an emergency response team sent to investigate. As you enter the station, the doors lock behind you. The power flickers, strange symbols appear on the monitors, and oxygen levels begin to drop. You have 90 minutes to uncover the truth, restore power, and escape before Mars becomes your final resting place.",
      image: "src/images/mars-2056.png",
    },
    {
      id: "5",
      title: "SECRETS OF THE OLD MANSION",
      genres: [{ name: "Detective" }, { name: "Mystery" }],
      players: "2-5 players",
      difficulty: "easy",
      duration: "60 min",
      description:
        "Immerse yourself in the atmosphere of backstage service rooms, filled with secrets and mysteries. You will find yourself in an old mansion and uncover everything hidden within its winding corridors.",
      image: "src/images/secrets-of-the-old-mansion.png",
    },
    {
      id: "6",
      title: "CABIN IN THE WOODS",
      genres: [{ name: "Horror" }],
      players: "4-7 players",
      difficulty: "medium",
      duration: "60 min",
      description:
        "A weekend getaway deep in the woods was supposed to be a peaceful escape. But as night falls, something feels off. The old cabin creaks with every gust of wind, shadows shift in the corners, and the radio picks up eerie whispers. Then, the door locks itself.You and your friends are trapped. Strange symbols appear on the walls, and the feeling of being watched grows stronger. You have 60 minutes to uncover the dark secrets of the cabin and escape before whatever lurks in the woods finds you.",
      image: "src/images/cabin-in-the-woods.png",
    },
    {
      id: "7",
      title: "FATAL EXPERIMENT",
      genres: [{ name: "Adventure" }],
      players: "5-8 players",
      difficulty: "hard",
      duration: "120 min",
      description:
        "You stand on the brink of a groundbreaking scientific discovery that could change the fate of humanity. But something goes wrong — the nuclear reactor, running at full capacity, signals an imminent failure. Will you be able to repair it in time and prevent the loss of lives in this fatal experiment?",
      image: "src/images/fatal-experiment.png",
    },
    {
      id: "8",
      title: "METRO-2033",
      genres: [{ name: "Horror" }, { name: "Mystery" }, { name: "Sci-fi" }],
      players: "6-8 players",
      difficulty: "hard",
      duration: "120 min",
      description:
        "The world as you knew it is gone. After a devastating nuclear war, the last remnants of humanity struggle to survive in the dark underground tunnels. Mutants lurk in the shadows, supplies are running low, and tensions between factions threaten to erupt into chaos. You are part of a small group of survivors sent on a dangerous mission to restore power to an abandoned station. But as you descend deeper into the tunnels, you realize something is watching you. You have 120 minutes to complete your mission and escape before the underground claims you forever.",
      image: "src/images/metro-2033.png",
    },
    {
      id: "9",
      title: "OLD ATTIC",
      genres: [{ name: "Mystery" }],
      players: "2-3 players",
      difficulty: "easy",
      duration: "60 min",
      description:
        "An old, forgotten attic filled with dust-covered relics and eerie silence. As you step inside, the door creaks and shuts behind you. Strange whispers echo through the wooden beams, and the air feels heavier with every passing second. Legends speak of a secret hidden within these walls, a mystery that was never meant to be uncovered. You have 60 minutes to unravel the attic’s secrets and escape before you become part of its forgotten history.",
      image: "src/images/old-attic.png",
    },
  ],

  // state — это текущее состояние
  addQuest: (newQuest) =>
    set((state) => {
      // обновляет состояние
      // Проверка - есть ли в "genres" новый жанр
      const newGenres = newQuest.genres.filter(
        // filter проверяет, какие жанры еще НЕ добавлены в genres
        (newGenre) =>
          !state.genres.some(
            (existingGenre) => existingGenre.name === newGenre.name
          )
      );

      return {
        quests: [...state.quests, newQuest], // добавляет новый квест
        genres: [...state.genres, ...newGenres], // добавляет новый жанр
      };
    }),
}));

export default useQuestStore;
