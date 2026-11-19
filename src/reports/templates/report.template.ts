
import { CreateReportDto } from '../dtos/create-report.dto';

export function generateReportTemplate(
  dto: CreateReportDto,
  photoUrl: string,
): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Nuevo reporte de AguaFix</title>
      </head>
      <body>
        <h2>Nuevo reporte de fuga de agua</h2>

        <p><strong>Dirección:</strong> ${dto.address}</p>
        <p><strong>Descripción:</strong> ${dto.description}</p>
        <p><strong>Severidad:</strong> ${dto.severity}</p>
        <p><strong>Teléfono:</strong> ${dto.reporterPhone}</p>

        <h3>Fotografía de la fuga</h3>
        <img
          src="${photoUrl}"
          alt="Fotografía de la fuga reportada"
          style="max-width: 600px; width: 100%; height: auto;"
        />
      </body>
    </html>
  `;
}
