import jsPDF from "jspdf"

export function generarRecibo(trabajo) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text("RECIBO DE REPARACIÓN", 20, 20)

  doc.setFontSize(12)
  doc.text(`Cliente: ${trabajo.cliente}`, 20, 40)
  doc.text(`Teléfono: ${trabajo.telefono}`, 20, 50)
  doc.text(`Equipo: ${trabajo.equipo}`, 20, 60)
  doc.text(`Ingreso: ${trabajo.ingreso}`, 20, 70)
  doc.text(`Entrega: ${trabajo.entrega}`, 20, 80)
  doc.text(`Estado: ${trabajo.estado}`, 20, 90)

  doc.text("Firma del técnico: ____________________", 20, 120)

  doc.save(`recibo-${trabajo.cliente}.pdf`)
}
