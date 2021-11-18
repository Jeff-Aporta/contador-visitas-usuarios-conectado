const fs = require("fs");

let usuarios_conectados = 0;
let visitas;

try {
  visitas = 1 | Number(fs.readFileSync("visitas.txt", "utf8"));
} catch (err) {
  visitas = 1;
  console.error(err);
}

module.exports = function (io, app) {
  io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado " + socket.id);
    usuarios_conectados++;
    visitas++;
    escribirVisitas();
    io.emit("actualizar", usuarios_conectados, visitas);

    socket.on("disconnect", function () {
      console.log("Usuario desconectado " + socket.id);
      usuarios_conectados--;
      io.emit("actualizar", usuarios_conectados, visitas);
    });
  });
};

function escribirVisitas() {
  try {
    fs.writeFileSync("visitas.txt", visitas + "");
  } catch (err) {
    console.error(err);
  }
}
