import "../../index.css";

export default function BookingPopup(): React.ReactElement {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000000] bg-opacity-50 z-50">
      <div className="relative w-[1000px] h-[600px] bg-[#1F1F1F] rounded-lg shadow-2xl m-auto mt-20">
        <div className="flex justify-between items-center p-10">
          <h2 className="text-[#FFF] text-xl font-semibold leading-[144%]">
            Book a Room
          </h2>
          <button className="text-[#FFF] text-sm font-semibold leading-[144%] cursor-pointer">
            X
          </button>
        </div>
        <div className="flex justify-between p-10">
          <div className="w-[50%]">
            <h3 className="text-[#FFF] text-sm font-semibold leading-[144%]">
              Select a Room
            </h3>
            <select className="w-full bg-[#2F2F2F] text-[#FFF] text-sm font-semibold leading-[144%] py-3 px-4 rounded-md mt-2">
              <option value="room1">Room 1</option>
              <option value="room2">Room 2</option>
              <option value="room3">Room 3</option>
            </select>
          </div>
          <div className="w-[50%]">
            <h3 className="text-[#FFF] text-sm font-semibold leading-[144%]">
              Select a Date
            </h3>
            <input
              type="date"
              className="w-full bg-[#2F2F2F] text-[#FFF] text-sm font-semibold leading-[144%] py-3 px-4 rounded-md mt-2"
            />
          </div>
        </div>
        <div className="flex justify-between p-10">
          <div className="w-[50%]">
            <h3 className="text-[#FFF] text-sm font-semibold leading-[144%]">
              Select a Time
            </h3>
            <select className="w-full bg-[#2F2F2F] text-[#FFF] text-sm font-semibold leading-[144%] py-3 px-4 rounded-md mt-2">
              <option value="time1">Time 1</option>
              <option value="time2">Time 2</option>
              <option value="time3">Time 3</option>
            </select>
          </div>
          <div className="w-[50%]">
            <h3 className="text-[#FFF] text-sm font-semibold leading-[144%]">
              Number of Guests
            </h3>
            <input
              type="number"
              className="w-full bg-[#2F2F2F] text-[#FFF] text-sm font-semibold leading-[144%] py-3 px-4 rounded-md mt-2"
            />
          </div>
        </div>
        <div className="flex justify-center p-10">
          <button className="bg-[#F2890F] text-white text-sm font-semibold leading-[144%] py-3 px-6 rounded-md cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
