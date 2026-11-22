export const detectNearestStore = (userAlamat = "", storesList = []) => {
  const addr = userAlamat.toLowerCase();

  let matchedId = "1"; // Default Jakarta Pusat
  if (addr.includes("jakarta selatan")) matchedId = "2";
  else if (addr.includes("jakarta timur")) matchedId = "3";
  else if (addr.includes("jakarta barat")) matchedId = "4";
  else if (addr.includes("jakarta pusat")) matchedId = "1";

  const foundStore = storesList.find((s) => String(s.id_toko) === matchedId);
  if (foundStore) return foundStore;

  const fallbackStores = {
    1: {
      id_toko: "1",
      nama_toko: "MEUW Petshop - Jakarta Pusat",
      alamat: "Jl. Cikini Raya, Menteng, Jakarta Pusat",
    },
    2: {
      id_toko: "2",
      nama_toko: "MEUW Petshop - Jakarta Selatan",
      alamat: "Jl. Fatmawati Raya, Cilandak, Jakarta Selatan",
    },
    3: {
      id_toko: "3",
      nama_toko: "MEUW Petshop - Jakarta Timur",
      alamat: "Jl. Pemuda, Rawamangun, Jakarta Timur",
    },
    4: {
      id_toko: "4",
      nama_toko: "MEUW Petshop - Jakarta Barat",
      alamat: "Jl. Tanjung Duren Raya, Jakarta Barat",
    },
  };

  return fallbackStores[matchedId];
};
