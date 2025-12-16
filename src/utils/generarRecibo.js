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

  if (trabajo.nota) {
    // Ajustamos para que la nota pueda ocupar varias líneas
    const notaLines = doc.splitTextToSize(`Nota: ${trabajo.nota}`, 170)
    doc.text(notaLines, 20, 100)
  }

  doc.text("Firma del técnico: ____________________", 20, 140)

  doc.save(`recibo-${trabajo.cliente}.pdf`)
}
