const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name = "Unknown",
    sys = {},
    weather: weatherArray = [{ icon: "01d", description: "clear sky" }],
    main = { temp: 0, humidity: 0, feels_like: 0, pressure: 0 },
    wind = { speed: 0 },
    visibility,
  } = weather;

  const icon = weatherArray[0]?.icon ?? "01d";
  const description = weatherArray[0]?.description ?? "clear sky";
  const temp = Math.round(main?.temp ?? 0);
  const feelsLike = Math.round(main?.feels_like ?? 0);
  const humidity = main?.humidity ?? 0;
  const pressure = main?.pressure ?? 0;
  const windSpeed = wind?.speed ?? 0;
  const visKm = visibility ? (visibility / 1000).toFixed(1) : "N/A";

  const stats = [
    { label: "Humidity", value: `${humidity}%`, icon: "💧" },
    { label: "Wind", value: `${windSpeed} m/s`, icon: "💨" },
    { label: "Pressure", value: `${pressure} hPa`, icon: "🔵" },
    { label: "Feels like", value: `${feelsLike}°C`, icon: "🌡️" },
    { label: "Visibility", value: `${visKm} km`, icon: "👁️" },
  ];

  return (
    <div className="mt-6 animate-fade-in-up">

      <h2 className="text-4xl font-bold text-center tracking-wide">
        {name}
        {sys?.country && (
          <span className="ml-3 text-xl font-normal text-white/60">
            {sys.country}
          </span>
        )}
      </h2>

      <div className="flex justify-center items-center gap-4 mt-6">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-24 h-24 drop-shadow-lg"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <p className="text-8xl font-extrabold tracking-tighter">{temp}°C</p>
      </div>
      <p className="text-center text-white/60 capitalize text-lg mt-2 tracking-wide">
        {description}
      </p>

      <div className="my-8 border-t border-white/10" />
      <div className="grid grid-cols-3 gap-5">
        {stats.map(({ label, value, icon: statIcon }) => (
          <div key={label} className="stat-item text-center p-4">
            <p className="text-2xl mb-2">{statIcon}</p>
            <p className="text-white/50 text-sm">{label}</p>
            <p className="font-semibold text-lg mt-1">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
