function filterLightByDate(lightData, targetDate) {
  const filteredLight = {};

  // Loop melalui setiap jenis cahaya (misal: red, green, blue, yellow)
  for (const [color, colorData] of Object.entries(lightData)) {
    // Filter data cahaya berdasarkan tanggal
    const filteredColorData = colorData.filter(
      (item) => new Date(item.date) >= targetDate
    );

    // Simpan data yang sudah difilter
    if (filteredColorData.length > 0) {
      filteredLight[color] = filteredColorData;
    }
  }

  return filteredLight;
}
module.exports = {
  filterLightByDate,
};
