module.exports = (sequelize, Sequelize) => {
  const CitasHCSchema = sequelize.define(
    'CitasHC',
    {
      Paciente: {
        type: Sequelize.STRING,
      },
      IdOdontologo: {
        type: Sequelize.STRING,
      },
      Fecha: {
        type: Sequelize.STRING,
      },
      odontologoId: {
        type: Sequelize.INTEGER,
      },
      HorarioIni: {
        type: Sequelize.DATE,
      },
      HorarioFin: {
        type: Sequelize.DATE,
      },
      Actividad: {
        type: Sequelize.STRING,
      },
      Horario: {
        type: Sequelize.STRING,
      },
      Unidad: {
        type: Sequelize.STRING,
      },
      Confirmado: {
        type: Sequelize.STRING,
      },
      ConfirmadoPor: {
        type: Sequelize.STRING,
      },
      ConfirmadoHora: {
        type: Sequelize.DATE,
      },
      Asistida: {
        type: Sequelize.STRING,
      },
      HoraLlegada: {
        type: Sequelize.STRING,
      },
      ActividadReal: {
        type: Sequelize.STRING,
      },
      IdOdontologoReal: {
        type: Sequelize.STRING,
      },
      FechaReal: {
        type: Sequelize.DATE,
      },
      AtencionReal: {
        type: Sequelize.DATE,
      },
      Retraso: {
        type: Sequelize.INTEGER,
      },
      IdUsuario: {
        type: Sequelize.STRING,
      },
      Cedula: {
        type: Sequelize.STRING,
      },
      Control: {
        type: Sequelize.STRING,
      },
      ObservacionLab: {
        type: Sequelize.STRING,
      },
      Proveedor: {
        type: Sequelize.STRING,
      },
      Laboratorio: {
        type: Sequelize.STRING,
      },
      Valor: {
        type: Sequelize.INTEGER,
      },
      FechaEntrega: {
        type: Sequelize.DATE,
      },
      Fijar: {
        type: Sequelize.STRING,
      },
      ConfirmadoFecha: {
        type: Sequelize.DATE,
      },
      AsignadoHora: {
        type: Sequelize.DATE,
      },
      Diagnostico: {
        type: Sequelize.STRING,
      },
      CodDiagnostico: {
        type: Sequelize.INTEGER,
      },
      Tratamiento: {
        type: Sequelize.STRING,
      },
      CodTratamiento: {
        type: Sequelize.STRING,
      },
      CodActividadReal: {
        type: Sequelize.STRING,
      },
      Consecutivo: {
        type: Sequelize.INTEGER,
      },
      Cia: {
        type: Sequelize.STRING,
      },
      Observacion: {
        type: Sequelize.STRING,
      },
      Nuevo: {
        type: Sequelize.STRING,
      },
      AnunciadoPor: {
        type: Sequelize.STRING,
      },
      IdEspecialista: {
        type: Sequelize.STRING,
      },
      TextoRemision: {
        type: Sequelize.STRING,
      },
      AsignadoFecha: {
        type: Sequelize.DATE,
      },
      Observacion2: {
        type: Sequelize.STRING,
      },
      ObservacionCita: {
        type: Sequelize.STRING,
      },
      Reprogramar: {
        type: Sequelize.STRING,
      },
      Estado: {
        type: Sequelize.STRING,
      },
      Desevolucionar: {
        type: Sequelize.INTEGER,
      },
      DatosDesevolucion: {
        type: Sequelize.STRING,
      },
      UsuarioDesevolucion: {
        type: Sequelize.STRING,
      },
      Duracion: {
        type: Sequelize.STRING,
      },
      FechaSalida: {
        type: Sequelize.STRING,
      },
      HoraSalida: {
        type: Sequelize.DATE,
      },
      Nombres: {
        type: Sequelize.STRING,
      },
      Apellidos: {
        type: Sequelize.STRING,
      },
      Campo1: {
        type: Sequelize.STRING,
      },
      Campo2: {
        type: Sequelize.STRING,
      },
      Campo3: {
        type: Sequelize.STRING,
      },
      Campo4: {
        type: Sequelize.STRING,
      },
      Campo5: {
        type: Sequelize.STRING,
      },
      Campo6: {
        type: Sequelize.STRING,
      },
      Campo7: {
        type: Sequelize.STRING,
      },
      Campo8: {
        type: Sequelize.STRING,
      },
      Campo9: {
        type: Sequelize.STRING,
      },
      Campo10: {
        type: Sequelize.STRING,
      },
      ConfirmadoAuditoria: {
        type: Sequelize.STRING,
      },
      FechaPte: {
        type: Sequelize.DATE,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return CitasHCSchema;
};
