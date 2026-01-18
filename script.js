const API_KEY = "3cee3d889ae0cf5bd6d191e081c44cc5";

async function getAirQuality() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("result");
  const body = document.body;

  if (!city) return;

  result.classList.add("hidden");

  try {
    const geo = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},IN&limit=1&appid=${API_KEY}`
    ).then(res => res.json());

    const { lat, lon } = geo[0];

    const air = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    ).then(res => res.json());

    const aqi = air.list[0].main.aqi;
    const p = air.list[0].components;

    const levels = [
      { cls: "good", text: "Good 😊 Breathe easy!" },
      { cls: "fair", text: "Fair 🙂 Acceptable air" },
      { cls: "moderate", text: "Moderate 😐 Sensitive groups beware" },
      { cls: "poor", text: "Poor 😷 Avoid outdoor activity" },
      { cls: "very-poor", text: "Very Poor ☠️ Health risk!" }
    ];

    body.className = levels[aqi - 1].cls;

    result.innerHTML = `
      <h2>${city.toUpperCase()}</h2>
      <h3>${levels[aqi - 1].text}</h3>
      <p>PM2.5: ${p.pm2_5}</p>
      <p>PM10: ${p.pm10}</p>
      <p>CO: ${p.co}</p>
      <p>NO₂: ${p.no2}</p>
      <p>SO₂: ${p.so2}</p>
    `;

    result.classList.remove("hidden");

  } catch {
    result.innerHTML = "⚠️ Unable to fetch data";
    result.classList.remove("hidden");
  }
}
